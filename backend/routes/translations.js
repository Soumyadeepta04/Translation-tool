import express from 'express';
import Translation from '../models/Translation.js';
import axios from 'axios';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';

const router = express.Router();

// Middleware to ensure DB connection before handling requests
router.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('DB not connected, reconnecting...');
      await connectDB();
    }
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(503).json({ 
      message: 'Database connection unavailable', 
      error: error.message 
    });
  }
});

// Auto-translate function using LibreTranslate API with MyMemory fallback
const autoTranslate = async (text, targetLang) => {
  try {
    console.log(`Translating to ${targetLang}: "${text}"`);
    
    // Try LibreTranslate first
    try {
      const response = await axios.post("https://libretranslate.com/translate", {
        q: text,
        source: "en",
        target: targetLang,
        format: "text",
        api_key: ""
      }, {
        headers: { "Content-Type": "application/json" },
        timeout: 8000 // 8 second timeout
      });

      console.log(`LibreTranslate response for ${targetLang}:`, response.data);
      
      if (response.data && response.data.translatedText) {
        return response.data.translatedText;
      }
    } catch (libreError) {
      console.warn(`LibreTranslate failed for ${targetLang}, trying MyMemory...`);
    }

    // Fallback to MyMemory Translation API (free, no API key needed)
    const langPair = `en|${targetLang}`;
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
    
    const myMemoryResponse = await axios.get(myMemoryUrl, {
      timeout: 8000
    });

    console.log(`MyMemory response for ${targetLang}:`, myMemoryResponse.data);

    if (myMemoryResponse.data && 
        myMemoryResponse.data.responseData && 
        myMemoryResponse.data.responseData.translatedText) {
      return myMemoryResponse.data.responseData.translatedText;
    }
    
    // Final fallback to original text
    console.warn(`All translation services failed for ${targetLang}, using original text`);
    return text;
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error.message);
    // Return original text if all APIs fail
    return text;
  }
};

// @route   POST /api/translations
// @desc    Create a new translation
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { key, english } = req.body;

    console.log('Received POST request:', { key, english });

    if (!key || !english) {
      return res.status(400).json({ message: 'Key and English value are required' });
    }

    // Validate key format
    if (typeof key !== 'string' || key.trim().length === 0) {
      return res.status(400).json({ message: 'Invalid key format' });
    }

    // Check if key already exists
    const existingTranslation = await Translation.findOne({ key: key.trim() });
    if (existingTranslation) {
      return res.status(400).json({ message: 'Translation key already exists' });
    }

    // Auto-generate translations for other languages
    console.log('Translating text:', english);
    
    // Use Promise.allSettled to prevent one translation failure from blocking all
    const translationPromises = await Promise.allSettled([
      autoTranslate(english, 'hi'),
      autoTranslate(english, 'bn'),
      autoTranslate(english, 'es')
    ]);

    const hindiTranslation = translationPromises[0].status === 'fulfilled' 
      ? translationPromises[0].value 
      : english;
    const bengaliTranslation = translationPromises[1].status === 'fulfilled' 
      ? translationPromises[1].value 
      : english;
    const spanishTranslation = translationPromises[2].status === 'fulfilled' 
      ? translationPromises[2].value 
      : english;

    const translations = {
      en: english,
      hi: hindiTranslation,
      bn: bengaliTranslation,
      es: spanishTranslation,
    };

    console.log('Generated translations:', translations);

    const newTranslation = new Translation({
      key,
      translations,
      availableLanguages: ['en', 'hi', 'bn', 'es'],
    });

    const savedTranslation = await newTranslation.save();
    res.status(201).json(savedTranslation);
  } catch (error) {
    console.error('Error creating translation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/translations
// @desc    Get all translations or search by key
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { key: { $regex: search, $options: 'i' } },
          { 'translations.en': { $regex: search, $options: 'i' } },
        ],
      };
    }

    const translations = await Translation.find(query).sort({ createdAt: -1 });
    res.json(translations);
  } catch (error) {
    console.error('Error fetching translations:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/translations/:id
// @desc    Get a single translation by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const translation = await Translation.findById(req.params.id);

    if (!translation) {
      return res.status(404).json({ message: 'Translation not found' });
    }

    res.json(translation);
  } catch (error) {
    console.error('Error fetching translation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/translations/:id
// @desc    Update a translation
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { key, translations } = req.body;

    const translation = await Translation.findById(req.params.id);

    if (!translation) {
      return res.status(404).json({ message: 'Translation not found' });
    }

    if (key) translation.key = key;
    if (translations) translation.translations = translations;

    const updatedTranslation = await translation.save();
    res.json(updatedTranslation);
  } catch (error) {
    console.error('Error updating translation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/translations/:id
// @desc    Delete a translation
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const translation = await Translation.findById(req.params.id);

    if (!translation) {
      return res.status(404).json({ message: 'Translation not found' });
    }

    await Translation.deleteOne({ _id: req.params.id });
    res.json({ message: 'Translation deleted successfully' });
  } catch (error) {
    console.error('Error deleting translation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/translations/:id/languages
// @desc    Add a new language to a translation
// @access  Public
router.post('/:id/languages', async (req, res) => {
  try {
    const { languageCode, value } = req.body;

    if (!languageCode || !value) {
      return res.status(400).json({ message: 'Language code and value are required' });
    }

    const translation = await Translation.findById(req.params.id);

    if (!translation) {
      return res.status(404).json({ message: 'Translation not found' });
    }

    translation.translations[languageCode] = value;
    
    if (!translation.availableLanguages.includes(languageCode)) {
      translation.availableLanguages.push(languageCode);
    }

    const updatedTranslation = await translation.save();
    res.json(updatedTranslation);
  } catch (error) {
    console.error('Error adding language:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

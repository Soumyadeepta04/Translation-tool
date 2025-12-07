import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    translations: {
      en: {
        type: String,
        required: true,
      },
      hi: {
        type: String,
        default: '',
      },
      bn: {
        type: String,
        default: '',
      },
      es: {
        type: String,
        default: '',
      },
      // You can add more languages as needed
    },
    availableLanguages: [{
      type: String,
      default: ['en', 'hi', 'bn', 'es']
    }],
  },
  {
    timestamps: true,
  }
);

// Index for faster searches
translationSchema.index({ key: 'text', 'translations.en': 'text' });

const Translation = mongoose.model('Translation', translationSchema);

export default Translation;

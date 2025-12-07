import React, { useState, useEffect } from 'react';
import { updateTranslation, addLanguage, deleteTranslation } from '../api/api';

const EditTranslation = ({ translation, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    key: '',
    translations: {}
  });
  const [newLang, setNewLang] = useState('');
  const [newLangValue, setNewLangValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddLang, setShowAddLang] = useState(false);

  useEffect(() => {
    if (translation) {
      setFormData({
        key: translation.key,
        translations: { ...translation.translations }
      });
    }
  }, [translation]);

  const handleTranslationChange = (lang, value) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: value
      }
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError('');

    try {
      const updated = await updateTranslation(translation._id, formData);
      onUpdate(updated);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update translation');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLanguage = async () => {
    if (!newLang || !newLangValue) {
      setError('Language code and value are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const updated = await addLanguage(translation._id, newLang, newLangValue);
      onUpdate(updated);
      setNewLang('');
      setNewLangValue('');
      setShowAddLang(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add language');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this translation?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await deleteTranslation(translation._id);
      onUpdate(null, true); // true indicates deletion
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete translation');
    } finally {
      setLoading(false);
    }
  };

  if (!translation) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Translation</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Translation Key</label>
            <input
              type="text"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              disabled={loading}
            />
          </div>

          <h3>Translations</h3>
          {Object.entries(formData.translations).map(([lang, value]) => (
            <div key={lang} className="form-group">
              <label>{lang.toUpperCase()}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleTranslationChange(lang, e.target.value)}
                disabled={loading}
              />
            </div>
          ))}

          {showAddLang && (
            <div className="add-language-section">
              <h4>Add New Language</h4>
              <div className="form-group">
                <label>Language Code (e.g., it, pt, ja)</label>
                <input
                  type="text"
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value.toLowerCase())}
                  placeholder="it"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Translation Value</label>
                <input
                  type="text"
                  value={newLangValue}
                  onChange={(e) => setNewLangValue(e.target.value)}
                  placeholder="Translation in new language"
                  disabled={loading}
                />
              </div>
              <div className="button-group">
                <button 
                  onClick={handleAddLanguage} 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  Add Language
                </button>
                <button 
                  onClick={() => setShowAddLang(false)} 
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!showAddLang && (
            <button 
              onClick={() => setShowAddLang(true)} 
              className="btn btn-secondary"
              style={{ marginTop: '10px' }}
              disabled={loading}
            >
              + Add New Language
            </button>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="modal-footer">
          <button 
            onClick={handleUpdate} 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger"
            disabled={loading}
          >
            Delete
          </button>
          <button 
            onClick={onClose} 
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTranslation;

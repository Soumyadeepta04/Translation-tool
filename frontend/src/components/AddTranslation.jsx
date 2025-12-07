import React, { useState } from 'react';
import { createTranslation } from '../api/api';

const AddTranslation = ({ onTranslationAdded }) => {
  const [key, setKey] = useState('');
  const [english, setEnglish] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!key.trim() || !english.trim()) {
      setError('Both key and English value are required');
      return;
    }

    setLoading(true);

    try {
      const newTranslation = await createTranslation(key, english);
      setSuccess('Translation added successfully!');
      setKey('');
      setEnglish('');
      
      if (onTranslationAdded) {
        onTranslationAdded(newTranslation);
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add translation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add New Translation</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="key">Translation Key *</label>
          <input
            type="text"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g., welcome_message"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="english">English Value *</label>
          <input
            type="text"
            id="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="e.g., Welcome to our application"
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Translation'}
        </button>
      </form>
    </div>
  );
};

export default AddTranslation;

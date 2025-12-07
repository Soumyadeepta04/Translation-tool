import React, { useState, useEffect } from 'react';
import { getTranslations } from '../api/api';

const TranslationList = ({ onEdit, refresh }) => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTranslations = async (search = '') => {
    setLoading(true);
    setError('');

    try {
      const data = await getTranslations(search);
      setTranslations(data);
    } catch (err) {
      setError('Failed to fetch translations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, [refresh]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTranslations(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchTranslations('');
  };

  return (
    <div className="card">
      <h2>Translation List</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by key or English value..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        {searchQuery && (
          <button 
            type="button" 
            onClick={handleClearSearch} 
            className="btn btn-secondary"
          >
            Clear
          </button>
        )}
      </form>

      {loading && <div className="loading">Loading translations...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && translations.length === 0 && (
        <div className="no-data">
          {searchQuery 
            ? 'No translations found matching your search.' 
            : 'No translations yet. Add your first translation above!'}
        </div>
      )}

      {!loading && translations.length > 0 && (
        <div className="translations-grid">
          {translations.map((translation) => (
            <div key={translation._id} className="translation-card">
              <div className="translation-header">
                <h3>{translation.key}</h3>
                <button 
                  onClick={() => onEdit(translation)} 
                  className="btn btn-small btn-primary"
                >
                  Edit
                </button>
              </div>
              <div className="translation-content">
                {Object.entries(translation.translations).map(([lang, value]) => (
                  <div key={lang} className="translation-item">
                    <span className="language-badge">{lang.toUpperCase()}</span>
                    <span className="translation-value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="translation-footer">
                <small>Created: {new Date(translation.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslationList;

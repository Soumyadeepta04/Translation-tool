import React, { useState } from 'react';
import AddTranslation from './components/AddTranslation';
import TranslationList from './components/TranslationList';
import EditTranslation from './components/EditTranslation';
import './styles.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTranslation, setSelectedTranslation] = useState(null);

  const handleTranslationAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (translation) => {
    setSelectedTranslation(translation);
  };

  const handleCloseEdit = () => {
    setSelectedTranslation(null);
  };

  const handleUpdate = (updatedTranslation, isDeleted = false) => {
    setRefreshKey(prev => prev + 1);
    if (isDeleted) {
      setSelectedTranslation(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌐 Translation Management Tool</h1>
        <p>Manage multilingual content with ease</p>
      </header>

      <main className="app-main">
        <AddTranslation onTranslationAdded={handleTranslationAdded} />
        <TranslationList onEdit={handleEdit} refresh={refreshKey} />
      </main>

      {selectedTranslation && (
        <EditTranslation
          translation={selectedTranslation}
          onClose={handleCloseEdit}
          onUpdate={handleUpdate}
        />
      )}

      <footer className="app-footer">
        <p>Built with MERN Stack | MongoDB + Express + React + Node.js</p>
      </footer>
    </div>
  );
}

export default App;

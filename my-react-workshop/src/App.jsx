import React, { useState, useEffect } from 'react';
import GridItem from './components/GridItem';
import './App.css';

const initialCardData = [
  { id: 1, title: 'Rain Garden', description: 'This is some sample text about Rain Gardens.' },
  { id: 2, title: 'Bioswale', description: 'This is some sample text about Bioswales.' },
  { id: 3, title: 'Bioretention', description: 'This is some sample text about Bioretention stuff.' },
];

const App = () => {
  const [cards, setCards] = useState(initialCardData);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCard = () => {
    if (!newTitle || !newDescription) {
      alert('Please enter a title and description.');
      return;
    }

    // Could be a backend or async call that we wait for instead of an instant id increment.. !
    setLoading(true);
    const newId = cards.length ? cards[cards.length - 1].id + 1 : 1;

    setTimeout(() => {
      setCards([...cards, { id: newId, title: newTitle, description: newDescription }]);
      setNewTitle('');
      setNewDescription('');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteCard = (id) => {
    setLoading(true);
    setTimeout(() => {
      setCards(cards.filter(card => card.id !== id));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <h1>Featured Resources</h1>

      {/* Add New Card */}
      <div className="add-card-form">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>

      {/* Show loading */}
      {loading && <p>Loading...</p>}

      {/* Display Cards */}
      <div className="grid-container">
        {cards.map((card) => (
          <GridItem
            key={card.id}
            title={card.title}
            description={card.description}
            onDelete={() => handleDeleteCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

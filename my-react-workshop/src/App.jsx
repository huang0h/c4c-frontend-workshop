import React, { useState } from 'react';
import GridItem from './components/GridItem';
import AddCardForm from './components/AddCardForm';
import SearchBar from './components/SearchBar';
import './App.css'; // Import the main styles

// Add unique IDs to your initial card data
const initialCardData = [
  { id: 1, title: 'Rain Garden', description: 'This is some sample text about Rain Gardens.' },
  { id: 2, title: 'Bioswale', description: 'This is some sample text about Bioswales.' },
  { id: 3, title: 'Bioretention', description: 'This is some sample text about Bioretention stuff.' },
  { id: 4, title: 'Porous Paving', description: 'This is some sample text about Porous Paving.' },
  { id: 5, title: 'Tree Trench/Planter', description: 'This is some sample text about Tree Trenches/Planters.' },
  { id: 6, title: 'Green Roof/Planter', description: 'This is some sample text about Green Rooves/Planters.' }
];

const App = () => {
  const [cards, setCards] = useState(initialCardData);
  const [searchTerm, setSearchTerm] = useState('');

  // Add a new card, giving it a unique ID
  const handleAddCard = (newCard) => {
    const newId = cards.length ? cards[cards.length - 1].id + 1 : 1; // Assign a unique id based on the last card's id
    setCards([...cards, { ...newCard, id: newId }]);
  };

  // Delete a card based on its unique ID
  const handleDeleteCard = (idToDelete) => {
    setCards(cards.filter(card => card.id !== idToDelete));
  };

  // Filter cards based on the search term
  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>FEATURED RESOURCES →</h1>
      </header>
      <SearchBar onSearch={setSearchTerm} />
      <AddCardForm onAdd={handleAddCard} />
      <div id="grid-container">
        {filteredCards.map((item) => (
          <GridItem 
            key={item.id} // Use the unique ID as the key
            title={item.title} 
            description={item.description}
            onDelete={() => handleDeleteCard(item.id)} // Delete based on the unique ID
          />
        ))}
      </div>
    </div>
  );
};

export default App;
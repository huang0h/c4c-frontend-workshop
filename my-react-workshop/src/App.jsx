import React, { useState, useEffect, useMemo } from 'react';
import { Box, Heading, Button, Input, SimpleGrid } from '@chakra-ui/react';
import GridItem from './components/GridItem'; // Assuming this is styled with Chakra
import './App.css'; // Main styles

// Initial Card Data
const initialCardData = [
  { id: 1, title: 'Rain Garden', description: 'This is some sample text about Rain Gardens.', deleted: false },
  { id: 2, title: 'Bioswale', description: 'This is some sample text about Bioswales.', deleted: false },
  { id: 3, title: 'Bioretention', description: 'This is some sample text about Bioretention stuff.', deleted: false },
  { id: 4, title: 'Porous Paving', description: 'This is some sample text about Porous Paving.', deleted: false },
  { id: 5, title: 'Tree Trench/Planter', description: 'This is some sample text about Tree Trenches/Planters.', deleted: false },
  { id: 6, title: 'Green Roof/Planter', description: 'This is some sample text about Green Rooves/Planters.', deleted: false }
];

const App = () => {
  const [cards, setCards] = useState(initialCardData);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);

  // Add state for managing the title and description inputs
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Handle adding a new card with debounce
  const handleAddCard = () => {
    if (!newTitle || !newDescription) {
      alert("Title and description are required");
      return;
    }

    setLoading(true);  // Set loading to true immediately when action is triggered
    const newId = cards.length ? cards[cards.length - 1].id + 1 : 1;

    setTimeout(() => {
      setCards([...cards, { id: newId, title: newTitle, description: newDescription, deleted: false }]);
      setAction('create');
      setLoading(false);  // Set loading to false after card is added
      setNewTitle(''); // Reset input fields after adding
      setNewDescription('');
    }, 1000);  // Debounce the add action
  };

  // Handle deleting a card, mark it as deleted for the ghost effect
  const handleDeleteCard = (idToDelete) => {
    setLoading(true);  // Set loading to true immediately when action is triggered
    
    setTimeout(() => {
      setCards(cards.map(card => 
        card.id === idToDelete ? { ...card, deleted: true } : card
      ));
      setAction('delete');
      setLoading(false);  // Set loading to false after card is deleted
    }, 1000);  // Debounce the delete action
  };

  // Memoize the filtered cards list to optimize performance
  const filteredCards = useMemo(() => {
    return cards.filter(card => 
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cards, searchTerm]);  // Only recompute when cards or searchTerm changes

  // Clear action state once it's handled
  useEffect(() => {
    if (!action) return;

    const timer = setTimeout(() => {
      console.log(`User performed ${action} action`);
      setAction(null);  // Reset action after side effect is logged
    }, 500);

    return () => clearTimeout(timer);  // Cleanup timer on unmount or before the next effect
  }, [action]);

  return (
    <Box p={5}>
      <Heading mb={6}>Featured Resources</Heading>

      {/* Search Bar */}
      <Input
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={5}
      />

      {/* Add New Card Form */}
      <Box mb={5}>
        <Input
          placeholder="Title"
          mb={3}
          value={newTitle}  // Bind state to input field
          onChange={(e) => setNewTitle(e.target.value)}  // Update state when user types
        />
        <Input
          placeholder="Description"
          mb={3}
          value={newDescription}  // Bind state to input field
          onChange={(e) => setNewDescription(e.target.value)}  // Update state when user types
        />
        <Button colorScheme="teal" onClick={handleAddCard}>
          Add Card
        </Button>
      </Box>

      {/* Show Loading State */}
      {loading && <p>Loading...</p>}

      {/* Display Cards */}
      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {filteredCards.map(item => (
          <GridItem 
            key={item.id}
            title={item.title}
            description={item.description}
            isGhost={item.deleted}
            onDelete={() => handleDeleteCard(item.id)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default App;
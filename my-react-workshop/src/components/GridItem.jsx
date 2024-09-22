import React from 'react';
import { FaLeaf } from 'react-icons/fa'; // Import a react icon to replace the missing image

const GridItem = ({ title, description, onDelete, isGhost }) => {
  return (
    <div 
      className={`grid-item ${isGhost ? 'grid-item-ghost' : ''}`} 
      style={{ opacity: isGhost ? 0.5 : 1, pointerEvents: isGhost ? 'none' : 'auto' }}
    >
      <FaLeaf className="grid-item-icon" /> {/* Use React icons instead of images */}
      <h4 className="grid-item-title">{title}</h4>
      <p className="grid-item-description">{description}</p> {/* Render description */}
      <hr className="grid-item-underscore" />

      {/* Only show delete button if not ghost */}
      {!isGhost && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

export default GridItem;
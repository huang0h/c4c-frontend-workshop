import React from 'react';
import { FaLeaf } from 'react-icons/fa'; // Import a react icon to replace the missing image

const GridItem = ({ title, description, onDelete }) => {
  return (
    <div className="grid-item">
      <FaLeaf className="grid-item-icon" /> {/* Use React icons instead of images */}
      <h4 className="grid-item-title">{title}</h4>
      <p className="grid-item-description">{description}</p> {/* Render description */}
      <hr className="grid-item-underscore" />
      <button onClick={onDelete}>Delete</button> {/* Delete button */}
    </div>
  );
};

export default GridItem;
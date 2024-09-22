import React from 'react';

const GridItem = ({ title, description, onDelete }) => {
  return (
    <div className="grid-item">
      <h4>{title}</h4>
      <p>{description}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default GridItem;
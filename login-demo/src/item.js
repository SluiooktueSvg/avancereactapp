// src/components/Item.js
import React from 'react';

function Item({ nombre, descripcion, imagen, precio }) {
  return (
    <div className="item">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p><strong>Precio:</strong> ${precio}</p>
    </div>
  );
}

export default Item;

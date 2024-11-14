// src/components/Catalogo.js
import React from 'react';
import Item from './Item';

function Catalogo() {
  // Aquí definimos los productos de ejemplo
  const productos = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      imagen: 'https://via.placeholder.com/150', // Imagen de ejemplo
      precio: 100
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      imagen: 'https://via.placeholder.com/150',
      precio: 150
    },
    {
      id: 3,
      nombre: 'Producto 3',
      descripcion: 'Descripción del producto 3',
      imagen: 'https://via.placeholder.com/150',
      precio: 200
    },
    // Añadir más productos según sea necesario
  ];

  return (
    <div className="catalogo">
      <h2>Catálogo de Productos</h2>
      <div className="items-list">
        {productos.map(producto => (
          <Item
            key={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            imagen={producto.imagen}
            precio={producto.precio}
          />
        ))}
      </div>
    </div>
  );
}

export default Catalogo;

import React, { useState, useEffect } from 'react';
import './app.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://10.30.9.114:3001/api/insumos';

function App() {
  const [insumos, setInsumos] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    descripcion: '',
    cantidad: 0,
    categoria: '',
    insumo: '',
    serial: '',
  });

  // Obtener insumos desde el backend al iniciar
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setInsumos(data))
      .catch(err => console.error('Error al obtener insumos:', err));
  }, []);

  const agregarInsumo = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    })
      .then(res => res.json())
      .then(data => setInsumos([...insumos, data]))
      .catch(err => console.error('Error al agregar insumo:', err));

    setNuevo({
      nombre: '',
      descripcion: '',
      cantidad: 0,
      categoria: '',
      insumo: '',
      serial: '',
    });
  };

  const eliminarInsumo = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setInsumos(insumos.filter((i) => i.id !== id)))
      .catch(err => console.error('Error al eliminar insumo:', err));
  };

  return (
    <div className="container">
      <h1>Control de Insumos</h1>

      <h2>Nuevo insumo</h2>
      <input
        placeholder="Insumo"
        value={nuevo.insumo}
        onChange={(e) => setNuevo({ ...nuevo, insumo: e.target.value })}
      />
      <input
        placeholder="Dependencia"
        value={nuevo.categoria}
        onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
      />
      <input
        placeholder="N° Serie"
        value={nuevo.serial}
        onChange={(e) => setNuevo({ ...nuevo, serial: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={nuevo.cantidad}
        onChange={(e) => setNuevo({ ...nuevo, cantidad: Number(e.target.value) })}
      />

      <button onClick={agregarInsumo}>Agregar</button>

      <h2>Listado</h2>
      <ul>
        {insumos.map((i) => (
          <li key={i.id}>
            <strong>{i.insumo}</strong>-
            <strong>{i.categoria}</strong> <em>N° Serie:</em>{i.serial} <em>Cantidad:</em>{i.cantidad}
            <button onClick={() => eliminarInsumo(i.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/*
import React, { useState, useEffect } from 'react';
import './app.css';


function App() {
  const [insumos, setInsumos] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    descripcion: '',
    cantidad: 0,
    categoria: '',
  });

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const dataGuardada = localStorage.getItem('insumos');
    if (dataGuardada) {
      setInsumos(JSON.parse(dataGuardada));
    }
  }, []);

  // Guardar en localStorage cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem('insumos', JSON.stringify(insumos));
  }, [insumos]);

  const agregarInsumo = () => {
    if (!nuevo.nombre || !nuevo.categoria) {
      alert('El nombre y la categoría son obligatorios');
      return;
    }

    const nuevoInsumo = {
      id: Date.now(), // ID único
      ...nuevo,
    };

    setInsumos([...insumos, nuevoInsumo]);

    // Resetear el formulario
    setNuevo({
      nombre: '',
      descripcion: '',
      cantidad: 0,
      categoria: '',
    });
  };

  const eliminarInsumo = (id) => {
    const filtrados = insumos.filter((i) => i.id !== id);
    setInsumos(filtrados);
  };

  return (
    <div className="container">
      <h1>Control de Insumos</h1>

      <h2>Nuevo insumo</h2>
      <input
        placeholder="Insumo"
        value={nuevo.insumo}
        onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
      />
      <input
        placeholder="Dependencia"
        value={nuevo.descripcion}
        onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={nuevo.cantidad}
        onChange={(e) => setNuevo({ ...nuevo, cantidad: Number(e.target.value) })}
      />
      <input
        placeholder="N° Serie"
        value={nuevo.serial}
        onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
      />
      <button onClick={agregarInsumo}>Agregar</button>

      <h2>Listado</h2>
      <ul>
        {insumos.map((i) => (
          <li key={i.id}>
            <strong>{i.descripcion}</strong> <strong>{i.insumo}</strong> ({i.cantidad}) {i.serial}
            <button onClick={() => eliminarInsumo(i.id)} style={{ marginLeft: 10 }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
*/
/*
import React, { useState, useEffect } from 'react';
import './app.css';

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

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const dataGuardada = localStorage.getItem('insumos');
    if (dataGuardada) {
      setInsumos(JSON.parse(dataGuardada));
    }
  }, []);

  // Guardar en localStorage cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem('insumos', JSON.stringify(insumos));
  }, [insumos]);

    const agregarInsumo = () => {
    if (!nuevo.nombre || !nuevo.categoria) {
      alert('El nombre y la categoría son obligatorios');
      return;
    } 

    const nuevoInsumo = {
      id: Date.now(), // ID único
      ...nuevo,
    };

    setInsumos([...insumos, nuevoInsumo]);

    // Resetear el formulario
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
    const filtrados = insumos.filter((i) => i.id !== id);
    setInsumos(filtrados);
  };
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';

const API_URL = 'http://10.30.9.114:3001/insumos'; // Ajustá la IP si es otra

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
    axios.get(API_URL)
      .then(res => setInsumos(res.data))
      .catch(err => console.error('Error al obtener insumos:', err));
  }, []);

  const agregarInsumo = () => {
    axios.post(API_URL, nuevo)
      .then(res => setInsumos([...insumos, res.data]))
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
    axios.delete(`${API_URL}/${id}`)
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
      {/*<input
        placeholder="Nombre"
        value={nuevo.nombre}
        onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
      />*/}
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

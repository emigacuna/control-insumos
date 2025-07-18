/*
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Para permitir peticiones desde el frontend en otro puerto/equipo
app.use(express.json());

let insumos = []; // Aquí guardamos los insumos en memoria

// Obtener todos los insumos
app.get('/api/insumos', (req, res) => {
  res.json(insumos);
});

// Agregar un insumo
app.post('/api/insumos', (req, res) => {
  const nuevoInsumo = {
    id: Date.now(),
    ...req.body,
  };
  insumos.push(nuevoInsumo);
  res.status(201).json(nuevoInsumo);
});

// Eliminar un insumo
app.delete('/api/insumos/:id', (req, res) => {
  const id = Number(req.params.id);
  insumos = insumos.filter(i => i.id !== id);
  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
*/
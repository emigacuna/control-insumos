
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/insumos";

function App() {
  const [insumos, setInsumos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", descripcion: "", cantidad: 0, categoria: "" });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setInsumos(data));
  }, []);

  const agregarInsumo = async () => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });
    const creado = await res.json();
    setInsumos([...insumos, creado]);
    setNuevo({ nombre: "", descripcion: "", cantidad: 0, categoria: "" });
  };

  const eliminarInsumo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setInsumos(insumos.filter((i) => i.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Control de Insumos</h1>

      <h2>Nuevo insumo</h2>
      <input placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
      <input placeholder="Descripción" value={nuevo.descripcion} onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })} />
      <input type="number" placeholder="Cantidad" value={nuevo.cantidad} onChange={(e) => setNuevo({ ...nuevo, cantidad: Number(e.target.value) })} />
      <input placeholder="Categoría" value={nuevo.categoria} onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })} />
      <button onClick={agregarInsumo}>Agregar</button>

      <h2>Listado</h2>
      <ul>
        {insumos.map((i) => (
          <li key={i.id}>
            <strong>{i.nombre}</strong> ({i.cantidad}) – {i.categoria}
            <button onClick={() => eliminarInsumo(i.id)} style={{ marginLeft: 10 }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

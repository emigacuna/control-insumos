
import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import insumosRouter from "./routes/insumos.js";
import Insumo from "./models/Insumo.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/insumos", insumosRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("🟢 Conectado a la base de datos");
    await sequelize.sync();
    app.listen(3001, () => {
      console.log("🚀 API escuchando en http://localhost:3001");
    });
  } catch (err) {
    console.error("❌ Error al conectar:", err);
  }
};

start();

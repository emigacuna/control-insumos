
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Insumo = sequelize.define("Insumo", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  categoria: {
    type: DataTypes.STRING,
  }
});

export default Insumo;

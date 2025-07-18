
import { Sequelize } from "sequelize";

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres"
});

export default sequelize;

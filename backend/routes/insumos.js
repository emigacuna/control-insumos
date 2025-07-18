
import express from "express";
import Insumo from "../models/Insumo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const insumos = await Insumo.findAll();
  res.json(insumos);
});

router.post("/", async (req, res) => {
  const nuevo = await Insumo.create(req.body);
  res.status(201).json(nuevo);
});

router.put("/:id", async (req, res) => {
  const insumo = await Insumo.findByPk(req.params.id);
  if (!insumo) return res.status(404).send("No encontrado");

  await insumo.update(req.body);
  res.json(insumo);
});

router.delete("/:id", async (req, res) => {
  const insumo = await Insumo.findByPk(req.params.id);
  if (!insumo) return res.status(404).send("No encontrado");

  await insumo.destroy();
  res.sendStatus(204);
});

export default router;

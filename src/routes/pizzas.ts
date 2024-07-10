import express from "express";
import pizzaController from "../controller/pizza";
const router = express.Router();

router.get("/", pizzaController.getPizzasByQS);

router.get("/:id", pizzaController.getPizzaById);

export default router;

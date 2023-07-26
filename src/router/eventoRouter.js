const express = require("express");
const {
  comprobarDatosEventos,
  comprobarId,
  comprobarIdParams,
} = require("../middlewares/validations");

const { authenticate } = require("../middlewares/auth");

const {
  getEvents,
  getEventById,
  createEvent,
  createMasiveEvents,
  deleteEvent,
  updateEvent,
  updateCompleteEvent,
} = require("../controllers/evento.Controller");

const router = express.Router();

router.get("/eventos", authenticate, getEvents);
router.get("/eventos/:id", comprobarIdParams, authenticate, getEventById);
router.post("/eventos", comprobarDatosEventos, authenticate, createEvent);
//router.post("/eventos", createMasiveEvents);
router.delete("/eventos", comprobarId, authenticate, deleteEvent);
router.patch("/eventos", comprobarId, authenticate, updateEvent);
router.put(
  "/eventos",
  comprobarId,
  comprobarDatosEventos,
  authenticate,
  updateCompleteEvent
);

module.exports = router;

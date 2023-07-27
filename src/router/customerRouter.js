const express = require("express");

const {
  getUserById,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  updateCompleteUser,
} = require("../controllers/customer.Controller");

const {
  comprobarDatosUsuarios,
  comprobarUsuarioExistente,
  comprobarId,
  comprobarIdParams,
} = require("../middlewares/validations");

const { validaPermisoAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/:id", comprobarIdParams, getUserById);
router.get("/", getUsers);
router.post(
  "/",
  validaPermisoAdmin,
  comprobarDatosUsuarios,
  comprobarUsuarioExistente,
  createUser
);
router.delete("/", comprobarId, deleteUser);
router.patch("/", comprobarId, updateUser);
router.put(
  "/customers",
  comprobarId,
  comprobarDatosUsuarios,
  updateCompleteUser
);

module.exports = router;

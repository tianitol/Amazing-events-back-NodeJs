// const Customer = require("../models/Customer");
const cs = require("../services/customerService");

async function getUsers(req, res) {
  try {
    const usuarios = await cs.getUsers();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getUserById(req, res) {
  try {
    let { id } = req.params;

    let usuario = await cs.getUserById(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function createUser(req, res) {
  try {
    const { username, password, rol, email } = req.body;

    const usuarioCreado = await cs.createUser(username, password, rol, email);

    if (usuarioCreado) {
      res.status(201).json(usuarioCreado);
    } else {
      res.status(400).json({ message: "the user was not created" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message + " /Internal Server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const { _id } = req.body;

    const usuarioEliminado = await cs.deleteUser(_id);

    if (usuarioEliminado) {
      res.status(200).json(usuarioEliminado);
    } else {
      res.status(400).json({ message: "the user was not deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message + " /Internal Server error" });
  }
}

async function updateUser(req, res) {
  try {
    const { _id, username, password, rol, email } = req.body;

    const usuarioActualizado = await cs.updateUser(_id, {
      usuario,
      contrasena,
      rol,
      email,
    });

    if (usuarioActualizado) {
      res.status(200).json(usuarioActualizado);
    } else {
      res.status(400).json({ message: "The user was not updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message + " /Internal Server Error" });
  }
}

async function updateCompleteUser(req, res) {
  try {
    const { _id, username, password, rol, email } = req.body;

    const usuarioActualizado = cs.updateUser(_id, {
      username,
      password,
      rol,
      email,
    });

    if (usuarioActualizado) {
      res.status(200).json(usuarioActualizado);
    } else {
      res.status(400).json({ message: "The user was not updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message + " /Internal Server error" });
  }
}

module.exports = {
  getUserById,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  updateCompleteUser,
};

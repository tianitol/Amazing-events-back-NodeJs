const Customer = require("../models/Customer");

const getUsers = async () => {
  try {
    let usuarios = await Customer.find();

    return usuarios;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
    let usuario = await Customer.findById(id);
    return usuario;
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (username, password, rol, email) => {
  try {
    let usuarioCreado = new Customer({
      username,
      password,
      rol,
      email,
    });
    usuarioCreado.save();

    return usuarioCreado;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (id) => {
  try {
    let usuarioEliminado = await Customer.findByIdAndDelete(id);
    return usuarioEliminado;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (id, { username, password, rol, email }) => {
  try {
    let usuarioActualizado = await Customer.findByIdAndUpdate(id, {
      username,
      password,
      rol,
      email,
    });
    return usuarioActualizado;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};

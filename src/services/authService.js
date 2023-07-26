const Customer = require("../models/Customer");

const login = async (email) => {
  try {
    let usuario = await Customer.findOne({ email: email });
    return usuario;
  } catch (error) {
    throw new Error(error);
  }
};

// const logout = async () => {
//   try {
//   } catch (error) {
//     throw new Error(error);
//   }
// };

module.exports = {
  login,
};

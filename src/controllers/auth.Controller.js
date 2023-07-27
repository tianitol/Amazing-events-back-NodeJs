const as = require("../services/authService");
const { generarToken, authenticate } = require("../middlewares/auth");

async function login(req, res) {
  try {
    let { email, password } = req.query;

    let usuario = await as.login(email);
    if (usuario) {
      if (usuario.password === password) {
        //para no dejar al descubierto la password del usuario, se genera un objeto
        //solo con el id y el email del usuario, información suficiente para el token
        let objUser = {
          id: usuario._id,
          username: usuario.username,
          rol: usuario.rol,
          email: usuario.email,
        };

        let token = generarToken(objUser);
        console.log(token);
        res.cookie("tokenUsuario", token).send("Succesfully logued");
      } else {
        res.status(400).json("User and Password don't match");
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("caigo en el catch");
    res.status(500).json({ error: error.message });
  }
}

async function logeado(req, res) {
  try {
    let cookies = req.cookies;
    res.status(200).json({ Cookies: cookies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function logout(req, res) {
  try {
    res.clearCookie("tokenUsuario").json("Logout succesfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  login,
  logeado,
  logout,
};

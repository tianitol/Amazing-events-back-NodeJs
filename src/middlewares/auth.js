const jwt = require("jsonwebtoken");

const claveSecreta = "claveSuperSecreta";

const generarToken = (payload) => {
  const token = jwt.sign(payload, claveSecreta, {
    expiresIn: "5m",
  });

  return token;
};

const authenticate = (req, res, next) => {
  try {
    if (req.cookies.tokenUsuario) {
      let jwtDescifrado = jwt.verify(req.cookies.tokenUsuario, claveSecreta);
      //console.log(jwtDescifrado.rol);
      if (jwtDescifrado) {
        next();
      } else {
        res.redirect("http://localhost:5173/login");
      }
    } else {
      res.redirect("http://localhost:5173/login");
    }
  } catch (error) {
    console.error("Error al verificar el token: ", error);
    res.redirect("http://localhost:5173/login");
  }
};

const validaPermisoAdmin = (req, res, next) => {
  try {
    if (req.cookies.tokenUsuario) {
      let jwtDescifrado = jwt.verify(req.cookies.tokenUsuario, claveSecreta);
      console.log(jwtDescifrado.rol);
      if (jwtDescifrado.rol === "admin") {
        next();
      } else {
        console.log("el usuario no tiene permisos para crear nuevos usuarios");
        return res.status(400).json("only admin can create new users");
      }
    } else {
      return res.status(400).json("Missing token");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  generarToken,
  authenticate,
  validaPermisoAdmin,
};

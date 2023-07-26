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
      //console.log(jwtDescifrado);
      if (jwtDescifrado) {
        next();
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error al verificar el token: ", error);
    res.redirect("/login");
  }
};

module.exports = {
  generarToken,
  authenticate,
};

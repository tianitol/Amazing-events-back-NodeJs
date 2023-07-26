const Joi = require("joi");
const Customer = require("../models/Customer");

const comprobarDatosEventos = (req, res, next) => {
  const eventoSchema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
    category: Joi.string().min(3).max(15).required(),
    date: Joi.date().iso().required(),
    description: Joi.string().min(10).max(50).required(),
    image: Joi.string().required(),
    place: Joi.string().min(4).max(16).required(),
    price: Joi.number().integer().min(1).positive().required(),
    capacity: Joi.number().integer().positive().required(),
    assistance: Joi.number().integer().positive(),
    estimate: Joi.number().integer().positive(),
  });

  let payload = req.body;

  let validacionEvento = eventoSchema.validate(payload);

  if (validacionEvento.error) {
    return res
      .status(400)
      .json({ error: validacionEvento.error.details[0].message });
  }
  // if (!name) res.status(400).json("name missing parameter");
  // if (!category) res.status(400).json("category missing paremeter");
  // if (!date) res.status(400).json("date missing parameter");
  // if (!description) res.status(400).json("description missing parameter");
  // //if (image) res.status(400).json("image missing parameter");
  // if (!place) res.status(400).json("place missing parameter");
  // if (!price) res.status(400).json("price missing parameter");
  // if (!capacity) res.status(400).json("capacity missing parameter");
  // if (!assistance || !estimate)
  //   res.status(400).json("assistance missing parameter");
  // //if (!estimate) res.status(400).json("estimate missing parameter");
  next();
};

const comprobarDatosUsuarios = (req, res, next) => {
  const usuarioSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(12).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{4,20}$"))
      .required(),
    rol: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });

  let payload = req.body;

  let validacionUsuario = usuarioSchema.validate(payload);

  if (validacionUsuario.error) {
    return res
      .status(400)
      .json({ error: validacionUsuario.error.details[0].message });
  }
  next();

  // const { usuario, contrasena, rol, email } = req.body;

  // if (!usuario) {
  //   res.status(400).json("User name missing parameter");
  // } else if (!contrasena) {
  //   res.status(400).json("Password missing paremeter");
  // } else if (!rol) {
  //   res.status(400).json("Rol missing parameter");
  // } else if (!email) {
  //   res.status(400).json("Email missing parameter");
  // } else {
  //   next();
  // }
};

const comprobarUsuarioExistente = async (req, res, next) => {
  const { username, email } = req.body;

  let usuarioName = await Customer.findOne({ username: username });
  let usuario = await Customer.findOne({ email: email });

  if (usuario) {
    return res.status(400).send("the email already exist. Try another email");
  } else if (usuarioName) {
    return res
      .status(400)
      .send("the username already exist. Try another username");
  }
  next();
};

const comprobarId = (req, res, next) => {
  const idSchema = Joi.object({
    _id: Joi.string().alphanum().required(),
  });
  const payload = req.body;

  let validacionId = idSchema.validate(payload);

  if (validacionId.error) {
    return res
      .status(400)
      .json({ error: validacionId.error.details[0].message });
  }
  next();

  // if (!_id) {
  //   res.status(400).json("missing id parameter, id not found or invalid id");
  // } else {
  //   next();
  // }
};

const comprobarIdParams = (req, res, next) => {
  const idParamSchema = Joi.object({
    _id: Joi.string().alphanum().required(),
  });
  const payload = req.params;

  let validacionIdParam = idParamSchema.validate(payload);

  if (validacionIdParam.error) {
    return res
      .status(400)
      .json({ error: validacionIdParam.error.details[0].message });
  }
  next();
  // const { id } = req.params;
  // if (!id) {
  //   res.status(400).json("missing id parameter, id not found or invalid id");
  // } else {
  //   next();
  // }
};

module.exports = {
  comprobarDatosEventos,
  comprobarDatosUsuarios,
  comprobarUsuarioExistente,
  comprobarId,
  comprobarIdParams,
};

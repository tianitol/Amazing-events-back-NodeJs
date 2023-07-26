const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: String,
  description: String,
  image: String,
  place: String,
  price: Number,
  capacity: {
    type: Number,
    required: true,
  },
  assistance: Number,
  estimate: Number,
});

//Para agregar métodos, puede hacerse de esta forma, utilizando el this
eventoSchema.methods.cambiarNombre = (nombre) => {
  this.name = nombre;
};

//Creación del modelo utilizando el esquema anterior, recibe 2 parámetros,
//un nombre para el documento y el esquema al que hace referencia
//el nombre de la colección en la DB será automaticamente el plural en
//minúsculas del nombre puesto al documento
const Evento = mongoose.model("Evento", eventoSchema);

module.exports = Evento;

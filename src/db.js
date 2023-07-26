const mongoose = require("mongoose");

const uri =
  "mongodb+srv://nitol:LHJV3dnyf0zqn15d@sprint5.tlsiydp.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
  mongoose
    .connect(uri)
    .then(() => console.log("Connect to mongodb"))
    .catch((e) => console.log("Error connecting to mongodb" + e.message));
};

module.exports = connect;

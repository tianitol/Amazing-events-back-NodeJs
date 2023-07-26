const express = require("express");
const connectDB = require("./db");
const eventoRouter = require("./router/eventoRouter");
const customerRouter = require("./router/customerRouter");
const authRouter = require("./router/authRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api-endpoints.json");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

//habilita cors para todas las rutas
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

//para utilizar cookies
app.use(cookieParser());

connectDB();

//middleware que analiza body de la solicitudes en formato JSON
app.use(express.json());

//documentación de la API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//rutas de la API
app.use("/api", eventoRouter);
app.use("/api/customers", customerRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

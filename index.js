const dbConection = require("./src/config/db");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
dbConection();
app.use(express.json());

app.use("/", require("./src/routes/route"));


app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

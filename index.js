import express from 'express';
import http from 'http';
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose'
import referido from './routes/referido.js';
import referente from './routes/referente.js';
import usuario from './routes/usuario.js';
import nivel_referente from './routes/nivel_referente.js';



const app = express();
const port= process.env.PORT

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

app.use("/api/referido", referido);
app.use("/api/referente", referente);
app.use("/api/usuario", usuario);
app.use("/api/nivel-referente", nivel_referente);

const server = http.createServer(app)

mongoose.connect(`${process.env.mongoDB}`)
  .then(() => console.log('Conexión a mongoDB exitosa!'));

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log('hola soy mongo', process.env.mongoDB)
});
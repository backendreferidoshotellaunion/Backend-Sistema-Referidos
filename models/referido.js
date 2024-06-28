import mongoose from "mongoose";

const referidoSchema = new mongoose.Schema({
  nombre: { type: String, require: true, },
  cedula: { type: String, require: true, },
  correo: { type: String, require: true, },
  telefono: { type: String, require: true, },
  opinion: { type: String, require: true,},
  metodo: { type: String, require: true,},
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Referido", referidoSchema);



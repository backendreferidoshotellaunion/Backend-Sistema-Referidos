import mongoose from "mongoose";

const referidoSchema = new mongoose.Schema({
  nombre: { type: String, require: true, },
  cedula: { type: String, index: 'text', require: true, minlength:7, maxlength: 10},
  correo: { type: String, require: true, },
  telefono: { type: String, required: true, },
  opinion: { type: String, required: true,},
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Referido", referidoSchema);



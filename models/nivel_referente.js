import mongoose from "mongoose";

const nivelReferenteSchema = new mongoose.Schema({
  nombre: { type: String, require: true, },
  descripcion: { type: String, require: true },
  beneficio: { type: String, require: true},
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Nivel_Referente", nivelReferenteSchema);

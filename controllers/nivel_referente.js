import NivelReferente from "../models/nivel_referente.js";
import helpersGeneral from "../helpers/generales.js";

const httpNivelReferente = {
  //Get
  getAll: async (req, res) => {
    try {
      const nivelesReferente = await NivelReferente.find();
      res.json(nivelesReferente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const nivelReferente = await NivelReferente.findById(id);
      res.json(nivelReferente);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const nivelReferente = await NivelReferente.find({ nombre });
      res.json(nivelReferente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  //Post registro nivel referente
  registro: async (req, res) => {
    try {
      const { nombre, descripcion, beneficio } = req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());

      const nivelReferente = new NivelReferente({
        nombre: mayusNombre,
        descripcion,
        beneficio,
      });

      await nivelReferente.save();

      res.json(nivelReferente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, beneficio } = req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());

      const nivelReferente = await NivelReferente.findByIdAndUpdate(
        id,
        {
          nombre: mayusNombre,
          descripcion,
          beneficio,
        },
        { new: true }
      );

      res.json(nivelReferente);
    } catch (error) {
      console.log("editar error", error);
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const nivelReferente = await NivelReferente.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(nivelReferente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;

      const nivelReferente = await NivelReferente.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(nivelReferente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpNivelReferente;
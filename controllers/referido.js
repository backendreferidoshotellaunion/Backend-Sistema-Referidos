import Referido from "../models/referido.js";
import helpersGeneral from "../helpers/generales.js";

const httpReferido = {
  //Get
  getAll: async (req, res) => {
    try {
      const referido = await Referido.find();
      res.json(referido);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const referido = await Referido.findById(id);
      res.json(referido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const referido = await Referido.find({ nombre });
      res.json(referido);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  //Post registro referido
  registro: async (req, res) => {
    try {
      const { nombre, cedula, correo, telefono, opinion, metodo } = req.body;

      const referido = new Referido({
        nombre: await helpersGeneral.primeraMayuscula(nombre),
        cedula,
        correo,
        telefono,
        opinion,
        metodo
      });

      await referido.save();

      res.json(referido);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, cedula, correo, telefono, opinion, metodo } = req.body;

      const referido = await Referido.findByIdAndUpdate(
        id,
        {
          nombre: await helpersGeneral.primeraMayuscula(nombre),
          cedula,
          correo,
          telefono,
          opinion,
          metodo
        },
        { new: true }
      );

      res.json(referido);
    } catch (error) {
      console.log("editar error", error);
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const referido = await Referido.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(referido);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;

      const referido = await Referido.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(referido);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpReferido;

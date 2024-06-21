import Referido from "../models/referido.js";

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

  //Post registro referido
  registro: async (req, res) => {
    try {
      const { nombre, cedula, correo, telefono, opinion } = req.body;

      const referido = new Referido({
        nombre,
        cedula,
        correo,
        telefono,
        opinion,
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
      const { nombre, cedula, correo, telefono, opinion } = req.body;

      const referido = await Referido.findByIdAndUpdate(
        id,
        {
          nombre,
          cedula,
          correo,
          telefono,
          opinion,
        },
        { new: true }
      );

      res.json(referido);
    } catch (error) {
      console.log(error);
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

import Referente from "../models/referente.js";

const httpReferente = {
  //Get
  getAll: async (req, res) => {
    try {
      const referente = await Referente.find();
      res.json(referente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getPorCedula: async (req, res) => {
    try {
      const { cedula } = req.params;
      const referente = await Referente.find({ cedula }).populate("idReferido");
      res.json(referente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  //Post registro referente
  registro: async (req, res) => {
    try {
      const { nombre, cedula, correo, telefono, idReferido } = req.body;

      const referente = new Referente({
        nombre,
        cedula,
        correo,
        telefono,
        idReferido,
      });

      await referente.save();

      const ref = await Referente.findById(referente._id).populate("idReferido")

      res.json(ref);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, cedula, correo, telefono, idReferido } = req.body;

      const referente = await Referente.findByIdAndUpdate(
        id,
        {
          nombre,
          cedula,
          correo,
          telefono,
          idReferido,
        },
        { new: true }
      ).populate("idUsuario");

      res.json(referente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const referente = await Referente.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(referente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;

      const referente = await Referente.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(referente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpReferente;

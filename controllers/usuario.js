import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";
import helpersGeneral from "../helpers/generales.js";

const httpUsuario = {
  //Get
  getAll: async (req, res) => {
    try {
      const usuario = await Usuario.find();
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post registro usuario
  registroUsuario: async (req, res) => {
    try {
      const {
        nombre,
        identificacion,
        correo,
        telefono,
        password,
      } = req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());
      const usuario = new Usuario({
        nombre: mayusNombre,
        identificacion,
        correo,
        telefono,
        password,
      });
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);

      await usuario.save();

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  login: async (req, res) => {
    const { identificacion, password } = req.body;

    try {
      const usuario = await Usuario.findOne({ identificacion });
      console.log("a", usuario);

      if (!usuario) {
        return res.status(400).json({
          error: "Identificación o Contraseña no son correctos",
        });
      }
      if (usuario.estado == false) {
        return res.status(400).json({
          error: "Usuario Inactivo",
        });
      }
      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
        return res.status(401).json({
          error: "Identificación o Contraseña no son correctos",
        });
      }
      const token = await generarJWT(usuario.id);
      res.json({ usuario, token });
    } catch (error) {
      return res.status(500).json({
        error: "Hable con el WebMaster",
      });
    }
  },

 
  editarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, identificacion, correo, telefono } =
        req.body;

      const usuario = await Usuario.findByIdAndUpdate(
        id,
        {
          nombre,
          identificacion,
          correo,
          telefono,
        },
        { new: true }
      );

      res.json(usuario);
    } catch (error) { console.log(error);
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpUsuario;

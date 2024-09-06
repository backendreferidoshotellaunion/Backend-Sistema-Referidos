import Referente from "../models/referente.js";
import Referido from "../models/referido.js";
import helpersReferente from "../helpers/referente.js";
import helpersGeneral from "../helpers/generales.js";
import nodemailer from "nodemailer";

const httpReferente = {
  //Get
  getAll: async (req, res) => {
    try {
      const referente = await Referente.find()
        .populate("idReferido")
        .populate("idNivelReferente");
      res.json(referente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getPorCedula: async (req, res) => {
    try {
      const { cedula } = req.params;
      const referente = await Referente.find({ cedula })
        .populate("idReferido")
        .populate("idNivelReferente");
      res.json(referente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getPorCedulaReferido: async (req, res) => {
    try {
      const { cedula } = req.params;
      const referido = await Referido.findOne({ cedula });
      if (!referido) {
        return res
          .status(404)
          .json({ error: "No existe el referido con la cédula digitada" });
      }

      const referente = await Referente.findOne({
        idReferido: referido._id,
      })
        .populate("idReferido")
        .populate("idNivelReferente");
      if (!referente) {
        return res.status(404).json({ error: "Embajador no encontrado" });
      }

      res.json(referente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  //Post registro referente
  registro: async (req, res) => {
    try {
      const { nombre, apellido, cedula, correo, telefono, idReferido } =
        req.body;

      const referenteExistente = await helpersReferente.existeCedula(
        cedula,
        req
      );

      if (referenteExistente) {
        res.json(referenteExistente);
        const nuevoReferente = new Referente({
          nombre: referenteExistente.nombre,
          apellido: referenteExistente.apellido,
          cedula: referenteExistente.cedula,
          correo: referenteExistente.correo,
          telefono: referenteExistente.telefono,
          idReferido,
        });

        await nuevoReferente.save();
      } else {
        const nuevoReferente = new Referente({
          nombre,
          apellido,
          cedula,
          correo,
          telefono,
          idReferido,
        });

        await nuevoReferente.save();

        const ref = await Referente.findById(nuevoReferente._id).populate(
          "idReferido"
        );

        res.json(ref);
      }
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
          nombre: await helpersGeneral.primeraMayuscula(nombre),
          cedula,
          correo,
          telefono,
          idReferido,
        },
        { new: true }
      )
        .populate("idReferido")
        .populate("idNivelReferente");

      res.json(referente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },


  // Existing method
  editarPorCedula: async (req, res) => {
    try {
      const { cedula } = req.params;
      const referentes = await Referente.find({ cedula });
  
      if (!referentes || referentes.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontró embajador con la cédula digitada" });
      }
  
      const updates = req.body;
  
      const updatedReferentes = await Promise.all(
        referentes.map(async (referente) => {
          return await Referente.findByIdAndUpdate(referente._id, updates, {
            new: true,
          })
            .populate("idReferido")
            .populate("idNivelReferente");
        })
      );
  
      // Send email to the first referente (or any one of them)
      const referente = updatedReferentes[0];
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });
  
      const mailOptions = {
        from: process.env.userEmail,
        to: referente.correo,
        subject: "Información sobre el nivel de embajador - Hotel",
        text: `Hola ${referente.nombre}, se te ha asignado un nuevo nivel de embajador en el hotel, ahora estás en el nivel ${referente.idNivelReferente.nombre} y cuentas con los siguientes beneficios:
        ${referente.idNivelReferente.beneficio}.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error al enviar el correo a ${referente.correo}:`, error);
        } else {
          console.log(`Correo electrónico enviado a ${referente.correo}: ${info.response}`);
        }
      });
  
      res.json(updatedReferentes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al editar embajador" });
    }
  },
  


  enviarNivelReferente: async (req, res) => {
    try {
      const { correo } = req.params;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });

      const mailOptions = {
        from: process.env.userEmail,
        to: correo,
        subject: "Información sobre el nivel de embajador - Hotel ",
        text: "Informacion embajador ",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error: "Error al enviar el correo electrónico.",
          });
        } else {
          console.log("Correo electrónico enviado: " + info.response);
          res.json({
            success: true,
            msg: "Correo electrónico enviado con éxito.",
          });
        }
      });
    } catch (error) {
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

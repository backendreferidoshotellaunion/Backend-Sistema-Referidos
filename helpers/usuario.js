import Usuario from "../models/usuario.js";

const helpersUsuario = {
  existeHolderById: async (id, req) => {
    const existe = await Usuario.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }

    req.req.UsuarioUpdate = existe;
  },

  existeIdentificacion: async (identificacion, req) => {
    if (identificacion.length < 7) throw new Error("Identificación no válida");
    const existe = await Usuario.findOne({
      $text: { $search: identificacion },
    });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese identificacion en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese identificacion en la base de datos!!! `);
      }
    }

    req.req.UsuarioUpdate = existe;
  },

  existeTelefono: async (telefono, req) => {
    if (telefono.length != 10) throw new Error("Teléfono inválido");
    const existe = await Usuario.findOne({ telefono });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
      }
    }

    req.req.UsuarioUpdate = existe;
  },

  existeCorreo: async (correo, req) => {
    const existe = await Usuario.findOne({ correo });

    if (!existe && req.req.method === "GET") {
      throw new Error(`El correo no se encuentra registrado`);
    }

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese correo en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese correo en la base de datos!!! `);
      }
    }

    req.req.UsuarioUpdate = existe;
  },

  existeCorreoNewPass: async (correo, req) => {
    const existe = await Usuario.findOne({ correo });

    if (!existe) {
      throw new Error(`El correo no se encuentra registrado`);
    }

    req.req.UsuarioUpdate = existe;
  },

  validarPassword: async (password, req) => {
    const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    if (!vali.test(password)) {
      throw new Error("La contraseña debe contener al menos 1 mayúscula, 1 minúscula, al menos 2 números y un carácter especial");
    }
    return true;
  },


};
export default helpersUsuario;

import Referido from "../models/referido.js";

const helpersReferido = {
  existeCedula: async (cedula, req) => {
    const existe = await Referido.findOne({ cedula: cedula });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`La cédula digitada '${cedula}', ya refirió a otra persona`);
      } else if (req.req.method === "POST") {
        throw new Error(`La cédula digitada '${cedula}', ya refirió a otra persona`);
      }
    }

    req.req.AreaUpdate = existe;
  },
  existeReferido: async (cedula, req) => {
    const existe = await Referido.findOne({ cedula: cedula });

    if (existe) {
      return existe;
    } else {
      return null;
    }
  },
};

export default helpersReferido;

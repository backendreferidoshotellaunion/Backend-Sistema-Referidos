import Referido from "../models/referido.js";

const helpersReferido = {
  existeCedula: async (cedula, req) => {
    const existe = await Referido.findOne({ cedula: cedula });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`La persona con la cédula '${cedula}', ya fue referida`);
      } else if (req.req.method === "POST") {
        throw new Error(`La persona con la cédula '${cedula}', ya fue referida`);
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

import Referido from "../models/referido.js";

const helpersReferido = {
  existeCedula: async (cedula, req) => {
    const existe = await Referido.findOne({
      $text: { $search: cedula },
    });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe esa cedula en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe esa cedula en la base de datos!!! `);
      }
    }

    req.req.AreaUpdate = existe;
  },
};
export default helpersReferido;
import Referente from "../models/referente.js";

const helpersReferente = {
  existeCedula: async (cedula, req) => {
    const existe = await Referente.findOne({
      $text: { $search: cedula },
    });

    if (existe) {
      return existe; 
    } else {
      return null; 
    }
  },
};
export default helpersReferente;

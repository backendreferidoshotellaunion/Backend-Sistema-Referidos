import { Router } from "express";
import httpReferido from "../controllers/referido.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import helpersReferido from "../helpers/referido.js";

const router = new Router();

//Get
router.get("/all", httpReferido.getAll);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("cedula", "Digite la cedula").not().isEmpty(),
    check("cedula").custom(helpersReferido.existeCedula),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("opinion", "Por favor digite su opiniòn del servicio").not().isEmpty(),
    validarCampos,
  ],
  httpReferido.registro
);

//Put

router.put(
  "/editar/:id",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("cedula", "Digite la cedula").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("opinion", "Por favor digite su opiniòn del servicio").not().isEmpty(),
    validarCampos,
  ],
  httpReferido.editar
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReferido.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReferido.putActivar
);

export default router;

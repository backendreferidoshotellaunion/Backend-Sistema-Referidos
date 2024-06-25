import { Router } from "express";
import httpReferente from "../controllers/referente.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import helpersReferente from "../helpers/referente.js";

const router = new Router();

//Get
router.get("/all", httpReferente.getAll);

router.get('/buscarCedula/:cedula', httpReferente.getPorCedula);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("cedula", "Digite la cedula").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("idReferido", "Por favor digite la id").not().isEmpty(),
    check("idReferido", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReferente.registro
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
    check("idReferido", "Por favor digite la id").not().isEmpty(),
    check("idReferido", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReferente.editar
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReferente.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReferente.putActivar
);

export default router;

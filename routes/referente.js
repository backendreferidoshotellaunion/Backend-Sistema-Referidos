import { Router } from "express";
import httpReferente from "../controllers/referente.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import helpersReferente from "../helpers/referente.js";

const router = new Router();

//Get
router.get("/all", httpReferente.getAll);

router.get(
  "/buscarCedula/:cedula",
  [check("cedula", "Digite la cedula").not().isEmpty(), validarCampos],
  httpReferente.getPorCedula
);

router.get(
  "/buscarCedulaRef/:cedula",
  [check("cedula", "Digite la cedula").not().isEmpty()],
  httpReferente.getPorCedulaReferido
);

router.get(
  "/enviar-info/:correo",
  [
    check("correo", "Por favor ingrese el correo").not().isEmpty(),
    validarCampos,
  ],
  httpReferente.enviarNivelReferente
);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cedula").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpReferente.registro
);

//Put

router.put(
  "/editar/:id",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cedula").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpReferente.editar
);

router.put(
  "/editar-por-cedula/:cedula",
  [
    check("idNivelReferente", "Por favor escoja un nivel de embajador")
      .not()
      .isEmpty(),
    check("idNivelReferente", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReferente.editarPorCedula
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

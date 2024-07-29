import { Router } from "express";
import httpNivelReferente from "../controllers/nivel_referente.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import helpersGeneral from "../helpers/generales.js";

const router = new Router();

//Get
router.get("/all", httpNivelReferente.getAll);

router.get(
  "/buscarId/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "El id es invalido").isMongoId(),
  ],
  httpNivelReferente.getPorId
);

router.get(
  "/buscarNombre/:nombre",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
  ],
  httpNivelReferente.getPorNombre
);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    check("beneficio", "Digite los beneficios").not().isEmpty(),
    validarCampos,
  ],
  httpNivelReferente.registro
);

//Put
router.put(
  "/editar/:id",
  [
    check("id", "ID no válido").isMongoId(),
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    check("beneficio", "Digite los beneficios").not().isEmpty(),
    validarCampos,
  ],
  httpNivelReferente.editar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpNivelReferente.putActivar
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpNivelReferente.putInactivar
);

export default router;
import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", CategoryController.listAll);

router.get("/:id", CategoryController.getOneById);

router.post("/", CategoryController.newCategory);

router.delete("/:id", CategoryController.deleteCategory);

export default router;

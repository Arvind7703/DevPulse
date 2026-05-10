import { Router } from "express";
import { registerController, loginController, refreshTokenController, meController } from "./auth.controller";
import { userAuth } from "../../middleware/auth.middleware";

const router = Router()

router.post("/register",registerController)
router.post("/login", loginController)
router.post('/refresh', refreshTokenController);
router.get('/me', userAuth, meController);

export default router
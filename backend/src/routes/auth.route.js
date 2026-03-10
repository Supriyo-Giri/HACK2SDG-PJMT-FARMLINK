import express from "express"
import { allUserController, changePasswordController, forgotPasswordController, getMe, getUserById, healthCheckController, loginUserController, logoutController, registerUserController, reVerifyEmailController, verifyEmailController, verifyOTPController } from "../controllers/auth.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get('/health' , healthCheckController);
router.post('/register',registerUserController);
router.post('/verify', verifyEmailController);
router.post("/login",loginUserController);
router.post('/logout',logoutController)
router.post("/re-verify",reVerifyEmailController);

router.post("/forgot-password", forgotPasswordController)
router.post("/verify-otp/:email",verifyOTPController)
router.post("/change-password/:email",changePasswordController)
router.get("/all-users",isAuthenticated, isAdmin, allUserController)
router.get("/get-user/:userId",isAuthenticated,getUserById )

router.get("/me",isAuthenticated, getMe)

export default router;
import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/otpcontroller.js";

const router = Router();

router.route('/sendotp').post(sendOtp)
router.route('/verifyotp').post(verifyOtp)

export default router
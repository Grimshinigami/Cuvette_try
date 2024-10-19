import { Router } from "express";
import { sendmOtp, verifymOtp } from "../controllers/motpcontroller.js";

const router = Router();

router.route('/sendmotp').post(sendmOtp)
router.route('/verifymotp').post(verifymOtp)

export default router
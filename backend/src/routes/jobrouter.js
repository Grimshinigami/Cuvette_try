import { Router } from "express";
import { addJob } from "../controllers/jobcontroller.js";
import { verifyJWT } from "../utils/auth.js";

const router = Router();

router.route('/addjob').post(verifyJWT,addJob);

export default router
import { Router } from "express";
import { addUser } from "../controllers/usercontroller.js";

const router = Router();

router.route('/adduser').post(addUser)

export default router
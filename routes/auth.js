import  express from "express"
import {signup,login} from "../controllers/authController.js"
import { verifyToken } from "../middleware/verifyToken.js";
import { verify,  updateProfile } from "../controllers/authController.js";

const Router=express.Router()

Router.post("/signup",signup)
Router.post("/login",login)
Router.get("/verify", verifyToken, verify)
Router.put(
  "/update-profile",
  verifyToken,
  updateProfile
);

export default Router;
import express from "express";
import { verifiedToken } from "../middleware/verifiedToken.js";
import {
  currentUser,
  loginRoute,
  logout,
  signupRoute,
} from "../controller/users.controller.js";

export const router = express.Router();

router.get("", (/** @type {import("express").Request} */ req, res) => {});

router.use("/signup", signupRoute);
router.use("/login", loginRoute);
router.use("/current_user", verifiedToken, currentUser);
router.use("/logout", logout);

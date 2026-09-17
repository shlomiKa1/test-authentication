import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export function verifiedToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Authentication required");
  }

  const user = jwt.verify(token, SECRET);
  if (!user) {
    res.status(403).send("Invalid token");
  }

  req.user = user;
  next();
}

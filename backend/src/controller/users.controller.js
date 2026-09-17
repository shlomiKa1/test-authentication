import { signup } from "../services/users.service";

async function signupRoute(req, res) {
  const signed = await signup(req.body);
  res.status(201).send({ message: "User registered successfully" });
}


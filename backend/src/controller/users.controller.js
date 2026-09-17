import { login, signup } from "../services/users.service";

async function signupRoute(req, res) {
  const signed = await signup(req.body);
  res.status(201).send({ message: "User registered successfully" });
}

async function loginRoute(req, res) {
  const token = await login(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: "true",
    sameSite: "strict",
  });
  res.status(201).send({ message: "user login successfully", token });
}

function currentUser(req, res) {
  res.send({ user: req.user });
}

function logout(_req, res) {
  res.clearCookie("token");
  res.send({ message: "User logout successfully" });
}

export { signupRoute, loginRoute, currentUser, logout };

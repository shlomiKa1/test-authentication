import jwt from "jsonwebtoken";
import bcrypto from "bcryptjs";
import { UserSignup, UserLogin } from "../schema/user.js";
import { addUser, findByEmail, getAll } from "../repositories/users.js";
import { EXPIRE, SECRET } from "../config.js";

async function signup(body) {
  const parsed = UserSignup.safeParse(body);
  if (!parsed.success) {
    throw Object.assign(new Error(parsed.error.message), { status: 422 });
  }

  const { username, email, password } = parsed.data;
  const users = await getAll();
  const user = users.find((u) => u.email === email);

  if (user) {
    throw Object.assign(new Error("Email not avalible"), { statous: 409 });
  }

  const passwordHash = await bcrypto.hash(password, 12);

  const id = users.length > 0 ? Math.max(users.map((u) => u.id)) + 1 : 1;
  const newUser = { id, username, email, password: passwordHash };
  const saveUser = await addUser(newUser);
  return saveUser;
}

async function login(body) {
  const parsed = UserLogin.safeParse(body);
  if (!parsed.success) {
    throw Object.assign(new Error(parsed.error.issues), { status: 422 });
  }

  const { email, password } = parsed.data;
  const user = await findByEmail(email);

  if (!user) {
    throw Object.assign(new Error("User not found"), { status: 404 });
  }

  const isMatch = await bcrypto.compare(password, user.password);

  if (!isMatch) {
    throw Object.assign(new Error("Not currect email or password"), {
      status: 403,
    });
  }

  const payload = { id: user.id, username: user.username, email: user.email };
  const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRE });
  return token;
}

export { signup, login };

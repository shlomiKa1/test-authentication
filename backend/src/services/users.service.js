import { UserSignup, UserLogin } from "../schema/user";
import jwt from "jsonwebtoken";
import bcrypto from "bcryptjs";
import { addUser, findByEmail, findById, getAll } from "../repositories/users";
import { EXPIRE, SECRET } from "../config";

async function signup(user) {
  const parsed = UserSignup.safeParse(user);
  if (!parsed.success) {
    throw Object.assign(new Error(parsed.error.issues), { status: 422 });
  }

  const { username, email, password } = parsed.data;
  const users = await getAll();
  const user = await findByEmail(email);
  if (user) {
    throw Object.assign(new Error("Email not avalible"), { statous: 409 });
  }

  const passwordHash = await bcrypto.hash(password, 12);

  const id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const user = { id, username, email, password: passwordHash };
  const saveUser = await addUser({ user });
  return saveUser;
}

async function login(user) {
  const parsed = UserLogin.safeParse(user);
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

import { User } from "../schema/user";
import jwt from "jsonwebtoken";
import bcrypto from "bcryptjs";
import { addUser, getAll } from "../repositories/users";

async function signup(user) {
  const parsed = User.safeParse(user);
  if (!parsed.success) {
    throw Object.assign(new Error(parsed.error.issues), 422);
  }

  const { username, email, password } = parsed.data;
  const users = await getAll();
  if (users.includes((user) => user.email === email)) {
    throw Object.assign(new Error("Email not avalible"), 409);
  }

  const passwordHash = await bcrypto.hash(password, 12);

  const id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const user = { id, username, email, password: passwordHash };
  const saveUser = await addUser({ user });
  return saveUser;
}


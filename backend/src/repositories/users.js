import { load, save } from "../db";

async function getAll() {
  return await load();
}

async function findByEmail(email) {
  const users = await load();
  const user = users.find((u) => u.email === email);
  return user;
}

async function addUser(user) {
  const users = await load();
  users.push(user);
  await save(users);
  return user.id;
}

export { getAll, findByEmail, addUser };

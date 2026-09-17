import { load, save } from "../db";

async function getAll() {
  return await load();
}

async function findById(email) {
  const users = await load();
  const found = users.find((u) => u.email === email);
  return found;
}

async function addUser(user) {
  const users = await load();
  users.push(user);
  await save(users);
  return user.id;
}

export { getAll, findById, addUser};

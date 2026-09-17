import { load, save } from "../db";

async function getAll() {
  return await load();
}

async function findById(email) {
  const users = await load();
  const found = users.find((u) => u.email === email);
  return found;
}

export { getAll, findById };

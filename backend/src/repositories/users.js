import { load, save } from "../db";

async function getAll() {
  return await load();
}

export { getAll };

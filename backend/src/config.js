import path from "path";

export const { PORT = 3000, SECRET, EXPIRE = "1h" } = process.env;

export const USERS_FILE = path.join(process.cwd(), "src", "data", "users.json");

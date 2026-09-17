import express from "express";
import cookiePaeser from "cookie-parser";
import cors from "cors";
import { router } from "./routes/users.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(cookiePaeser());
app.use(
  cors({
    origin: "http://localhost:3570",
    credentials: true,
  }),
);

app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

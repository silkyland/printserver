import cors from "cors";
import express from "express";
import morgan from "morgan";
import config from "./config/index.json";
import PrintRouter from "./routes/printRoute";

const app = express();
app.use("*", cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.use("/print", PrintRouter);

app.post("/print", async (req, res) => {
  try {
  } catch (error) {}
});

app.listen({ host: config.app.host, port: config.app.port }, () => {
  console.log(
    ` Your server is running on http://${config.app.host}:${config.app.port}`
  );
});

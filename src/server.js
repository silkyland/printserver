import express from "express";
import * as config from "./config/index.json";
import cors from "cors";
import morgan from "morgan";
import PDFDocument from "pdfkit";

const app = express();
app.use("*", cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.post("/print", async (req, res) => {
  try {
  } catch (error) {}
});

app.listen({ host: config.app.host, port: config.app.port }, () => {
  console.log(
    ` Your server is running on http://${config.app.host}:${config.app.port}`
  );
});

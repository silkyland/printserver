import express from "express";
import Controller from "../controllers/PrintController";

const router = express.Router();
const PrintController = new Controller();

router.get("/", PrintController.index);

const PrintRouter = router;

export default PrintRouter;

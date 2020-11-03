import express from "express";
import PrintController from "../controllers/PrintController";

const router = express.Router();

router.get("/", PrintController.index);

const PrintRouter = router;

export default PrintRouter;

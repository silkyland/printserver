import Controller from "./Controller";
import PDFDocument from "pdfkit";
import fs from "fs";
import symbology from "symbology";
import path from "path";
import concat from 'concat-stream';

class PrintController extends Controller {
  index = async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.query);
      const { name, number, queqe = 1 } = req.query;
      await this._generatePDF({
        name,
        number,
        queqe,
      });
      console.log(path.join(__dirname, '../../output.pdf'))
      res.json({ message: "Success Print" });
    } catch (error) {
      next(error);
    }
  };

  _generatePDF = async ({ name = "", number = "", queqe = 0 }) => {
    try {
      const doc = new PDFDocument({ size: [203, 109.5], margin: 0 });
      const barcode = await this._renderBarCode(number);
      const writeStream = fs.createWriteStream("output.pdf");
      doc.font(__dirname + "/../fonts/THSarabunNew.ttf");
      doc.pipe(writeStream);
      doc
        .font(__dirname + "/../fonts/THSarabunNew-Bold.ttf")
        .fontSize(30)
        .text(`คิวที่ ${queqe}`, 10, 10);
      doc.fontSize(20).text(name, 50, 80);
      doc.image(
        new Buffer.from(
          barcode.replace("data:image/png;base64,", ""),
          "base64"
        ),
        15,
        40, { width: 150 }
      );
      doc.end();
      writeStream.on('finish', async () => {
        await this.sendToPrinter({ path: path.join(__dirname, '../../output.pdf'), numberOfCopy: 3 });
      })
    } catch (error) {
      throw new Error(error);
    }
  };

  _renderBarCode = async (barcode) => {
    try {
      const image = await symbology.createStream(
        {
          symbology: symbology.Barcode.CODE128,
          height: 20,
          scale: 1,
        },
        barcode
      );
      return image.data;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default PrintController;

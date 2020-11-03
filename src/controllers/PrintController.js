import Controller from "./Controller";
import PDFDocument from "pdfkit";
import fs from "fs";
import symbology from "symbology";
import path from "path";

class PrintController extends Controller {
  index = async (req, res, next) => {
    try {
      await this._generatePDF({
        name: "Bundit Nuntates",
        number: "1251200055868",
        queqe: 1,
      });
      await this.sendToPrinter({ path: "output.pdf" });
      res.json({ message: "Success Print" });
    } catch (error) {
      next(error);
    }
  };

  _generatePDF = async ({ name = "", number = "", queqe = 0 }) => {
    try {
      const doc = new PDFDocument({ size: [812, 203], margin: 0 });
      const barcode = await this._renderBarCode(number);

      doc.font(__dirname + "/../fonts/THSarabunNew.ttf");
      doc.pipe(fs.createWriteStream("output.pdf"));
      doc
        .font(__dirname + "/../fonts/THSarabunNew-Bold.ttf")
        .fontSize(50)
        .text(`คิวที่ ${queqe}`, 10, 10);
      doc
        .font(__dirname + "/../fonts/THSarabunNew-Bold.ttf")
        .fontSize(50)
        .text(`คิวที่ ${queqe}`, 450, 10);
      doc.fontSize(25).text(name, 100, 165);
      doc.fontSize(25).text(name, 550, 165);
      doc.image(
        new Buffer.from(
          barcode.replace("data:image/png;base64,", ""),
          "base64"
        ),
        40,
        60
      );
      doc.image(
        new Buffer.from(
          barcode.replace("data:image/png;base64,", ""),
          "base64"
        ),
        470,
        60
      );

      doc.end();
    } catch (error) {
      throw new Error(error);
    }
  };

  _renderBarCode = async (barcode) => {
    try {
      const image = await symbology.createStream(
        {
          symbology: symbology.Barcode.CODE128,
          height: 30,
          scale: 1.3,
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

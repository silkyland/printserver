import Controller from "./Controller";
import PDFDocument from "pdfkit";
import fs from "fs";
import symbology from "symbology";
import path from "path";
import concat from 'concat-stream';

class PrintController extends Controller {
  index = async (req, res, next) => {
    try {
      console.log(reg.body);
      // await this._generatePDF({
      //   name: "ชลิต โปธา",
      //   number: "3510300054717",
      //   queqe: 1,
      // });
      console.log(path.join(__dirname, '../../output.pdf'))
      res.json({ message: "Success Print" });
    } catch (error) {
      next(error);
    }
  };

  _generatePDF = async ({ name = "", number = "", queqe = 0 }) => {
    try {
      const doc = new PDFDocument({ size: [812, 203], margin: 0 });
      const barcode = await this._renderBarCode(number);
      const writeStream = fs.createWriteStream("output.pdf");
      doc.font(__dirname + "/../fonts/THSarabunNew.ttf");
      doc.pipe(writeStream);
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
      writeStream.on('finish', async () => {
        await this.sendToPrinter({ path: path.join(__dirname, '../../output.pdf') });
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

import pdfium from "node-pdfium";
import printer from 'printer'
import fs from "fs";
import util from "util";

// const printers = printer.getPrinters();
// console.log(printer.getPrinter());

// const defaultPrinter =
//   printers.find((printer) => printer.isDefault == true) || null;

// console.log(util.inspect(defaultPrinter), { color: true, depth: 10 });

export const sendToPrinter = async (
  {
    path = "",
    printerName = "ZDesigner GT800 (EPL)",
    numberOfCopy = 1,
    width = 800,
    height = 200,
    options = {
      type: "PDF",
    },
  },
) => {
  try {
    // if (defaultPrinter == null) {
    //   throw new Error("ไม่พบเครื่องปริ้นโปรดตรวจสอบอีกครั้ง !");
    // }
    pdfium.printPDF({
      printerName,
      filePath: path,
      width: 800,
      height: 190,
      dpi: 203,
      copies: numberOfCopy,
    });
  } catch (error) {
    console.log(error.message);
    console.log("ไม่สามารถปริ้นท์ได้");
  }
};

const PrintService = printer;

export default PrintService;

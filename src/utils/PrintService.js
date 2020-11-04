import printer from "printer";
import fs from "fs";
import util from "util";

const printers = printer.getPrinters();
console.log(printer.getPrinter());

const defaultPrinter =
  printers.find((printer) => printer.isDefault == true) || null;

console.log(util.inspect(defaultPrinter), { color: true, depth: 10 });

export const sendToPrinter = async (
  {
    path = "",
    printerName = "ZDesigner GT800 (EPL)",
    numberOfCopy = 1,
    options = {
      type: "PDF",
    },
  },
  successCallback,
  errorCallback
) => {
  try {
    if (defaultPrinter == null) {
      throw new Error("ไม่พบเครื่องปริ้นโปรดตรวจสอบอีกครั้ง !");
    }
    printer.printDirect({
      data: "output.pdf",
      printer: "ZDesigner GT800 (EPL)",
      type: options.type,
      success: successCallback,
      error: errorCallback,
    });
  } catch (error) {
    console.log("ไม่สามารถปริ้นท์ได้");
  }
};

const PrintService = printer;

export default PrintService;
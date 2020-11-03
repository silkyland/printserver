import printer from "printer";
import fs from "fs";
import util from "util";

const printers = printer.getPrinters();

const defaultPrinter =
  printers.find((printer) => printer.isDefault == true) || null;

console.log(util.inspect(defaultPrinter), { color: true, depth: 10 });

export const print = async (
  {
    path = "",
    printerName = defaultPrinter.name,
    options = {
      type: "PDF",
    },
  },
  successCallback,
  errorCallback
) => {
  try {
    if (defaultPrinter == null) {
      throw new Error("ไม่พบเครื่งปริ้นโปรดตรวจสอบอีกครั้ง !");
    }
    printer.printDirect({
      data: path,
      printer: printerName,
      type: options.type,
      success: successCallback,
      error: errorCallback,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default printer;

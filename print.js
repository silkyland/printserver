var printer = require("printer");
const fs = require("fs");
util = require("util");
printers = printer.getPrinters();
printers.forEach(function (iPrinter, i) {
  console.log(
    "" +
      i +
      'ppd for printer "' +
      iPrinter.name +
      '":' +
      util.inspect(printer.getPrinterDriverOptions(iPrinter.name), {
        colors: true,
        depth: 10,
      })
  );
  console.log(
    "\tselected page size:" + printer.getSelectedPaperSize(iPrinter.name) + "\n"
  );
});
printer.printDirect({
  data: fs.readFileSync("output.pdf"),
  printer: "Zebra_Technologies_ZTC_GT800_",
  type: "PDF",
  success: function () {},
  error: function () {},
});

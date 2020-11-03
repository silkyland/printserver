import PrintService, { sendToPrinter } from "../utils/PrintService";

class Controller {
  sendToPrinter;
  printer;
  constructor() {
    this.printer = PrintService;
    this.sendToPrinter = sendToPrinter;
  }
}

export default Controller;

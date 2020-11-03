import Controller from "./Controller";

class PrintController extends Controller {
  static index = async (req, res, next) => {
    try {
      res.send("Print Page");
    } catch (error) {}
  };
}

export default PrintController;

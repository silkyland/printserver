const printer = require('printer');
const fs = require('fs')

var data = fs.readFileSync("output.pdf");

printer.printDirect({
    data: data,
    printer: "ZDesigner GT800 (EPL)",
    type: "PDF",
    success: function (s) {
        console.log(s)
    },
    error: function (err) {
        console.log(err)
    },
});
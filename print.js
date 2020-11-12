const PDFDocument = require("pdfkit");
const fs = require("fs");
const symbology = require("symbology");
const path = require("path");

async function printThis() {
    const doc = new PDFDocument({ size: [230, 109.5], margin: 0 });
    const barcode = await renderBarCode(3510500011234);
    const writeStream = fs.createWriteStream("test.pdf");
    doc.font(__dirname + "/src/fonts/THSarabunNew.ttf");
    doc.pipe(writeStream);
    doc
        .font(__dirname + "/src/fonts/THSarabunNew-Bold.ttf")
        .fontSize(30)
        .text(`คิวที่ ${1}`, 10, 10);
    doc.fontSize(16).text("Bundit Nuntates", 50, 85);
    doc.image(
        new Buffer.from(
            barcode.replace("data:image/png;base64,", ""),
            "base64"
        ),
        5,
        40, {width: 215}
    );
    doc.end();
    writeStream.on('finish', async () => {
        console.log("fux")
    })
}

async function renderBarCode(barcode) {
    try {
        const image = await symbology.createStream(
            {
                symbology: symbology.Barcode.CODE128,
                height: 20,
                scale: 2,
            },
            barcode
        );
        return image.data;
    } catch (error) {
        throw new Error(error);
    }
};

printThis();
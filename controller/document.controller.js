const csv = require("csv-parser");
const multer = require("multer");
const DOCUMENT = require("../models/document.model");

// Configure multer storage
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

async function LocaldataManagement(name, data) {
  const document = new DOCUMENT({
    name,
    data,
  });
  await document.save();
  return document;
}

module.exports.createDocument = [
  upload.single("csvfile"),
  async function (req, res) {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a CSV file." });
    }

    const buffer = req.file.buffer; // Get the uploaded file buffer
    const filename = req.file.originalname; // Get the name of the uploaded file

    const jsonData = [];

    const stream = require("stream");
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    bufferStream
      .pipe(csv())
      .on("data", (row) => {
        let counter = 0;
        if (counter < 50) {
          // Check if counter is less than 50
          jsonData.push(row);
          counter++; // Increment the counter
        }
        // jsonData.push(row);
      })
      .on("end", async () => {
        const doc = await LocaldataManagement(filename, jsonData);
        res.json(doc); // Sending back the JSON data as response
      })
      .on("error", (error) => {
        res.status(500).json({ error: "Error processing CSV file." });
      });
  },
];

module.exports.getAllDocument = async function (req, res) {
  try {
    const alldata = await DOCUMENT.find({});
    res.status(200).json(alldata);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getDocumentDetails = async function (req, res) {};

module.exports.deleteDocument = async function (req, res) {};

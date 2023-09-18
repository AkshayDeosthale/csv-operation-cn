const express = require("express");
const router = express.Router();
const DocumentController = require("../controller/document.controller");

// Form to create a new document
router.post("/", DocumentController.createDocument);

//get all document
router.get("/", DocumentController.getAllDocument);

//get single document details
router.get("/:id", DocumentController.getDocumentDetails);

//delete document
router.delete("/delete/:id", DocumentController.deleteDocument);

module.exports = router;

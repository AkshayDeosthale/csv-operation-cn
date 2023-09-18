const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: String,
    data: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DOCUMENT", documentSchema);

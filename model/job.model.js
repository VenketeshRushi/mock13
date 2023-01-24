const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    contract: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);
const jobModel = model("jobSchema", jobSchema);

module.exports = jobModel;


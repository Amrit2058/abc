const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true },
    dateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    site: { type: String, required: true },
    topic: { type: String, required: true },
    summary: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);

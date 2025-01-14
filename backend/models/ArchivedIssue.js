const mongoose = require("mongoose");

const archivedIssueSchema = new mongoose.Schema({
  ticketId: { type: String, required: true },
  dateRange: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  site: { type: String, required: true },
  topic: { type: String, required: true },
  summary: { type: String, required: true },
  archivedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

module.exports = mongoose.model("ArchivedIssue", archivedIssueSchema);

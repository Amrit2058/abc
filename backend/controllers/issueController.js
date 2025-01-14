const archiveController = require("./archiveController");
const Issue = require("../models/Issue");
const ArchivedIssue = require("../models/ArchivedIssue");

// Delegate archiving responsibility to archiveController
exports.archiveIssue = archiveController.archiveIssue;

// Other functions remain as-is
exports.getAllIssues = async (req, res) => {
  try {
    const Issues = await issues.find();
    res.json(Issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ message: "Error fetching issues." });
  }
};

exports.createIssue = async (req, res) => {
  try {
    const { ticketId, dateRange, site, topic, summary, status } = req.body;

    // Ensure dateRange is included in the request body
    const issue = new Issue({
      ticketId,
      dateRange,
      site,
      topic,
      summary,
      status,
    });

    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Error creating issue" });
  }
};

exports.updateIssueStatus = async (req, res) => {
  const {status} = req.body;

  res.status(201).json({status});
}


exports.deleteIssue = async (req, res) => {
  const { _id } = req.params;
  try {
    await Issue.findByIdAndDelete(_id); // Deletes the issue
    res.status(200).json({ message: "Issue deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting issue.", error });
  }
};


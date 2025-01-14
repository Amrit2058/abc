const Issue = require("../models/Issue");

// Other functions remain as-is
exports.getAllIssues = async (req, res) => {
  try {
    const Issues = await Issue.find();
    res.status(200).json(Issues);
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
    const issues = await Issue.find();
    res.status(201).json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateIssueStatus = async (req, res) => {
  const {status} = req.body;
  await Issue.findOneAndUpdate({_id: req.params.id}, {status});
  const issues = await Issue.find();
  res.status(201).json(issues);
}


exports.deleteIssue = async (req, res) => {
  const { id } = req.params;
  try {
    await Issue.findByIdAndDelete(id); // Deletes the issue
    const issues = await Issue.find();
    res.status(201).json(issues);
  } catch (error) {
    res.status(500).json({ message: "Error deleting issue.", error });
  }
};


exports.archiveIssue = async (req, res) => {
  const date = new Date();
  const response = await Issue.findOneAndUpdate({_id: req.params.id}, { archivedAt: date });
  const issues = await Issue.find();
  res.status(201).json(issues);
}



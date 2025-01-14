const Issue = require("../models/Issue");
const ArchivedIssue = require("../models/ArchivedIssue");

exports.archiveIssue = async (req, res) => {
  const { _id } = req.params;

  try {
    const issue = await Issue.findById(_id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const archivedIssue = new ArchivedIssue({
      ticketId: issue.ticketId,
      dateRange: {
        startDate: issue.dateRange.startDate,
        endDate: issue.dateRange.endDate,
      },
      site: issue.site,
      topic: issue.topic,
      summary: issue.summary,
      status: issue.status,
    });
    

    await archivedIssue.save();
    await Issue.findByIdAndDelete(_id);

    res.status(200).json({ message: "Issue archived successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error archiving issue.", error });
  }
};

exports.getArchivedIssues = async (req, res) => {
  try {
    const archivedIssues = await ArchivedIssue.find(); 
    res.json(archivedIssues);
  } catch (error) {
    console.error("Error fetching archived issues:", error);
    res.status(500).json({ message: "Error fetching archived issues." });
  }
};

exports.deleteArchivedIssue = async (req, res) => {
  const { _id } = req.params;

  try {
    const archivedIssue = await ArchivedIssue.findByIdAndDelete(_id);
    if (!archivedIssue) {
      return res.status(404).json({ message: "Archived issue not found" });
    }
    res.status(200).json({ message: "Archived issue deleted successfully." });
  } catch (error) {
    console.error("Error deleting archived issue:", error);
    res.status(500).json({ message: "Error deleting archived issue.", error });
  }
};

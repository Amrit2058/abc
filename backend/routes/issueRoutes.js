const express = require("express");
const issueController = require("../controllers/issueController");

const router = express.Router();

router.get("/", issueController.getAllIssues);
router.post("/", issueController.createIssue);
router.patch("/:id/status", issueController.updateIssueStatus);
router.delete("/:id", issueController.deleteIssue);

module.exports = router;

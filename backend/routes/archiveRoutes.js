const express = require("express");
const archiveController = require("../controllers/archiveController");

const router = express.Router();

router.post("/", archiveController.archiveIssue);
router.get("/", archiveController.getArchivedIssues);
router.delete("/:id", archiveController.deleteArchivedIssue);

module.exports = router;

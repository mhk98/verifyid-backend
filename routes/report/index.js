const router = require("express").Router();
const report = require("../../controllers/report/report.controller");
const auth = require("../../middlewares/auth");

router.get("/", auth("user", "admin"), report.getAllReport);
router.get("/:id", auth("user", "admin"), report.singleReport);
router.post("/create-report", auth("admin"), report.createReport);
router.delete("/:id", auth("admin"), report.deleteReport);
router.patch("/:id", auth("admin"), report.updateReport);

module.exports = router;

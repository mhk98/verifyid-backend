const router = require("express").Router();
const adminNotification = require("../../controllers/adminNotification/adminNotification.controller");
const auth = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

router.get("/", adminNotification.getAllAdminNotification);
router.post("/", adminNotification.createAdminNotification);
router.delete("/:id", adminNotification.deleteUserNotification);

module.exports = router;

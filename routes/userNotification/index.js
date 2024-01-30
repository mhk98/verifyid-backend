const router = require("express").Router();
const userNotification = require("../../controllers/userNotification/userNotification.controller");
const auth = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

router.get("/:id", userNotification.getAllUserNotification);
router.post("/:id", userNotification.createUserNotification);
router.delete("/:id", userNotification.deleteUserNotification);

module.exports = router;

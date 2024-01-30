const router = require("express").Router();
const reply = require("../../controllers/reply/reply.controller");
const auth = require("../../middlewares/auth");

router.get("/", reply.getAllreply);
// router.get("/:id", auth("user", "admin"), report.singleReport);
router.post("/create-reply", reply.createreply);
router.delete("/:postId/:commentId/:replyId", reply.deletereply);
router.patch("/:postId/:commentId/:replyId", reply.updatereply);

module.exports = router;

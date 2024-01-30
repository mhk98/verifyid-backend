const router = require("express").Router();
const comment = require("../../controllers/comment/comment.controller");
const auth = require("../../middlewares/auth");

router.get("/", comment.getAllcomment);
// router.get("/:id", auth("user", "admin"), report.singleReport);
router.post("/create-comment", comment.createcomment);
router.delete("/:postId/:commentId", comment.deletecomment);
router.patch("/:postId/:commentId", comment.updatecomment);

module.exports = router;

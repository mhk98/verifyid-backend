const router = require("express").Router();
const post = require("../../controllers/post/post.controller");
const auth = require("../../middlewares/auth");
const { singleUpload } = require("../../middlewares/upload");

router.get("/", post.getAllpost);
router.get("/:id", post.singlepost);
router.get("/myPost/:id", post.myPost);
router.post("/create-post/:id", singleUpload, post.createpost);
router.delete("/:id", post.deletepost);
router.patch("/:id", post.updatepost);

module.exports = router;

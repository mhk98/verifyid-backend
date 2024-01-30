const router = require("express").Router();
const mypost = require("../../controllers/mypost/mypost.controller");
const auth = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

router.get("/:id", mypost.getAllmypost);
// router.get("/:id", mypost.createMypost);


module.exports = router;

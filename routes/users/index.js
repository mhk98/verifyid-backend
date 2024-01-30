const router = require("express").Router();
const user = require("../../controllers/users/users.controller");
const auth = require("../../middlewares/auth");
const { singleUpload } = require("../../middlewares/upload");

router.post("/signup", singleUpload, user.signup);
router.post("/login", user.login);
router.post("/refresh-token", user.refreshToken);
router.get("/", user.getAllUsers);
router.get("/:id", user.getSingleUser);
router.delete("/:id", user.deleteUser);
router.patch("/:email", user.updateUser);
router.patch("/:id", user.editAdmin);

module.exports = router;

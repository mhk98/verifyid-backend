const db = require("../../models");
const UserNotification = db.userNotification;

const User = db.user;
exports.createUserNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Email, Contact, Location, IdNumber } = req.body;
    const userData = await User.findOne({
      where: {
        User_ID: id,
      },
    });

    const data = {
      Name,
      Email,
      Contact,
      Location,
      IdNumber,
      usertblUserID: userData.User_ID,
    };
    const result = await UserNotification.create(data);

    console.log("result", req.file);
    res.status(200).send({
      status: "Success",
      message: "Successfully created UserNotification",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllUserNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserNotification.findAll({
      where: {
        usertblUserID: id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: "Successfully got all UserNotification",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
// exports.singlepost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const post = await Post.findAll({
//       where: { post_Id: id },
//     });

//     if (!post) {
//       return res.status(401).send({
//         status: "fail",
//         message: "No post found",
//       });
//     }
//     res.status(200).send({
//       status: "Success",
//       message: "Successfully got your post",
//       data: post,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };
exports.deleteUserNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await UserNotification.destroy({
      where: { Id: id },
    });

    if (!post) {
      return res.status(401).send({
        status: "fail",
        message: "No UserNotification found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete your UserNotification",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// exports.updatepost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;
//     const data = {
//       content,
//       Image: req.file.path,
//     };
//     console.log("editPost", req.body);
//     const post = await Post.update(data, {
//       where: { post_Id: id },
//     });

//     if (!post) {
//       return res.status(401).send({
//         status: "fail",
//         message: "No post found",
//       });
//     }
//     res.status(200).send({
//       status: "Success",
//       message: "Successfully update your post",
//       data: post,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

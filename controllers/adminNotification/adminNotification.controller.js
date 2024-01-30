const db = require("../../models");

const AdminNotification = db.adminNotification;

const User = db.user;
exports.createAdminNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Email, Contact, Location, IdNumber } = req.body;

    const data = {
      Name,
      Email,
      Contact,
      Location,
      IdNumber,
    };

    console.log(data);
    const result = await AdminNotification.create(data);

    console.log("result", req.file);
    res.status(200).send({
      status: "Success",
      message: "Successfully created AdminNotification",
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

exports.getAllAdminNotification = async (req, res) => {
  try {
    const result = await AdminNotification.findAll();

    res.status(200).send({
      status: "Success",
      message: "Successfully got all AdminNotification",
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

    const post = await AdminNotification.destroy({
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

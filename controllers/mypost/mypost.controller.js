const db = require("../../models");
const Mypost = db.mypost;
const User = db.user;
exports.createMypost = async (req, res) => {
  try {
    // const { id } = req.params;
    // const {
    //   Name,
    //   Email,
    //   Contact,
    //   Identification,
    //   IdNumber,
    //   Location,
    //   Description,
    // } = req.body;
    // const userData = await User.findOne({
    //   where: {
    //     User_ID: id,
    //   },
    // });
    // console.log("body", req.body);

    // const data = {
    //   Name,
    //   Email,
    //   Contact,
    //   Identification,
    //   IdNumber,
    //   Location,
    //   Description,
    //   Image: req.file.path,

    //   usertblUserID: userData.User_ID,
    // };
    // const mypost = await mypost.create(data);
    // console.log("result", req.file);
    res.status(200).send({
      status: "Success",
      message: "Successfully created mypost",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllmypost = async (req, res) => {
  try {
    const { id } = req.params;
    const mypost = await Mypost.findAll({
      usertblUserID: id,
    });

    res.status(200).send({
      status: "Success",
      message: "Successfully got all mypost",
      data: mypost,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
// exports.singlemypost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const mypost = await mypost.findAll({
//       where: { mypost_Id: id },
//     });

//     if (!mypost) {
//       return res.status(401).send({
//         status: "fail",
//         message: "No mypost found",
//       });
//     }
//     res.status(200).send({
//       status: "Success",
//       message: "Successfully got your mypost",
//       data: mypost,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };
// exports.deletemypost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const mypost = await mypost.destroy({
//       where: { mypost_Id: id },
//     });

//     if (!mypost) {
//       return res.status(401).send({
//         status: "fail",
//         message: "No mypost found",
//       });
//     }
//     res.status(200).send({
//       status: "Success",
//       message: "Successfully delete your mypost",
//       data: mypost,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// exports.updatemypost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;
//     const data = {
//       content,
//       Image: req.file.path,
//     };
//     console.log("editmypost", req.body);
//     const mypost = await mypost.update(data, {
//       where: { mypost_Id: id },
//     });

//     if (!mypost) {
//       return res.status(401).send({
//         status: "fail",
//         message: "No mypost found",
//       });
//     }
//     res.status(200).send({
//       status: "Success",
//       message: "Successfully update your mypost",
//       data: mypost,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

const { Op } = require("sequelize");
const db = require("../../models");
const Post = db.post;
const Mypost = db.mypost;
const User = db.user;
exports.createpost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Email,
      Contact,
      Identification,
      IdNumber,
      Location,
      Description,
      Owner_Name,
      Status,
    } = req.body;

    const checked = await Post.findOne({
      where: {
        [Op.or]: [{ Email }, { IdNumber }, { Contact }],
      },
    });

    if (checked) {
      return res.status(400).json({
        status: "fail",
        message:
          "User with the same email, id number, or contact already exists.",
      });
    }
    const userData = await User.findOne({
      where: {
        User_ID: id,
      },
    });
    console.log("body", req.body);

    const data = {
      Name,
      Email,
      Contact,
      Identification,
      IdNumber,
      Location,
      Description,
      Status,
      Owner_Name,
      image: req.file.path,
      Profile_Url: userData.image,
      usertblUserID: userData.User_ID,
    };
    const post = await Post.create(data);
    const mypost = await Mypost.create(data);
    console.log("result", req.file);
    res.status(200).send({
      status: "Success",
      message: "Successfully created post",
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

exports.getAllpost = async (req, res) => {
  try {
    const post = await Post.findAll();

    res.status(200).send({
      status: "Success",
      message: "Successfully got all post",
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
exports.singlepost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findAll({
      where: { post_Id: id },
    });

    if (!post) {
      return res.status(401).send({
        status: "fail",
        message: "No post found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully got your post",
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
exports.myPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findAll({
      where: { usertblUserID: id },
    });

    if (!post) {
      return res.status(401).send({
        status: "fail",
        message: "No post found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully got your post",
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

exports.deletepost = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("object", id);
    const post = await Post.destroy({
      where: { post_Id: id },
    });

    if (!post) {
      return res.status(401).send({
        status: "fail",
        message: "No post found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete your post",
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

exports.updatepost = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("editPost", req.body);
    const post = await Post.update(req.body, {
      where: { post_Id: id },
    });

    if (!post) {
      return res.status(401).send({
        status: "fail",
        message: "No post found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully update your post",
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

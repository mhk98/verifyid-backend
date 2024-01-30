const db = require("../../models");
const Comment = db.comment;

exports.createcomment = async (req, res) => {
  try {
    const { content, postPostId } = req.body;

    // const text = JSON.parse(content);
    console.log(content);
    const comment = await Comment.create({
      content,
      postPostId,
    });

    res.status(200).send({
      status: "Success",
      message: "Successfully created comment",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllcomment = async (req, res) => {
  try {
    // const { id } = params;

    const comment = await Comment.findAll();

    res.status(200).send({
      status: "Success",
      message: "Successfully got all comment",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.singlecomment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({
      where: { Id: id },
    });

    if (!comment) {
      return res.status(401).send({
        status: "fail",
        message: "No comment found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully got your comment",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.deletecomment = async (req, res) => {
  try {
    const { postId, commentId } = req.params; // Retrieve params from URL

    const comment = await Comment.destroy({
      where: { id: commentId, postPostId: postId },
    });

    if (!comment) {
      return res.status(401).send({
        status: "fail",
        message: "No comment found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete your comment",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updatecomment = async (req, res) => {
  try {
    const { postId, commentId } = req.params; // Retrieve params from URL
    console.log(req.body);
    const comment = await Comment.update(req.body, {
      where: { id: commentId, postPostId: postId },
    });

    if (!comment) {
      return res.status(401).send({
        status: "fail",
        message: "No comment found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully update your comment",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

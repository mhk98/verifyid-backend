const db = require("../../models");
const Reply = db.reply;

exports.createreply = async (req, res) => {
  try {
    const { postId, commentId, replyText } = req.body;

    console.log(req.body);
    const data = {
      content: replyText,
      postPostId: postId,
      commentId: commentId,
    };
    const reply = await Reply.create(data);
    console.log("result", req.file);
    res.status(200).send({
      status: "Success",
      message: "Successfully created reply",
      data: reply,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllreply = async (req, res) => {
  try {
    const reply = await Reply.findAll();

    res.status(200).send({
      status: "Success",
      message: "Successfully got all reply",
      data: reply,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.singlereply = async (req, res) => {
  try {
    const { id } = req.params;

    const reply = await Reply.findOne({
      where: { Id: id },
    });

    if (!reply) {
      return res.status(401).send({
        status: "fail",
        message: "No reply found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully got your reply",
      data: reply,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.deletereply = async (req, res) => {
  try {
    const { postId, commentId, replyId } = req.params;

    const reply = await Reply.destroy({
      where: { postPostId: postId, commentId: commentId, id: replyId },
    });

    if (!reply) {
      return res.status(401).send({
        status: "fail",
        message: "No reply found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete your reply",
      data: reply,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updatereply = async (req, res) => {
  try {
    const { postId, commentId, replyId } = req.params;

    

  
    const reply = await Reply.update(req.body, {
      where: { postPostId: postId, commentId: commentId, id: replyId },
    });

    if (!reply) {
      return res.status(401).send({
        status: "fail",
        message: "No reply found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully update your reply",
      data: reply,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

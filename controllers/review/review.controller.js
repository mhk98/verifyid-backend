const { Op } = require("sequelize");
const db = require("../../models");
const Review = db.review;

exports.createReview = async (req, res) => {
  try {
    const result = await Review.create(req.body);

    res.status(200).send({
      status: "Success",
      message: "Successfully created Review",
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

exports.getAllReview = async (req, res) => {
  try {
    const result = await Review.findAll();

    res.status(200).send({
      status: "Success",
      message: "Successfully got all Review",
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
exports.singleReview = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Review.findAll({
      where: { Review_Id: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No Review found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully got your Review",
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
exports.myReview = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Review.findAll({
      where: { usertblUserID: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No Review found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully got your Review",
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

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("object", id);
    const result = await Review.destroy({
      where: { Review_Id: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No Review found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete your Review",
      data: Review,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("editReview", req.body);
    const result = await Review.update(req.body, {
      where: { Review_Id: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No Review found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully update your Review",
      data: Review,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

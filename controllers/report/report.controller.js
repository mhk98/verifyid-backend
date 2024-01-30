const db = require("../../models");
const { ErrorLogger } = require("../../utils/logger");
const Report = db.report;

exports.createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);

    res.status(200).send({
      status: "Success",
      message: "Successfully created report",
      data: report,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllReport = async (req, res) => {
  try {
    const report = await Report.findAll();

    res.status(200).send({
      status: "Success",
      message: "Successfully got all report",
      data: report,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.singleReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findOne({
      where: { Id: id },
    });

    if (!report) {
      return res.status(401).send({
        status: "fail",
        message: "No report found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully got your report",
      data: report,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.destroy({
      where: { Id: id },
    });

    if (!report) {
      return res.status(401).send({
        status: "fail",
        message: "No report found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete your report",
      data: report,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const report = await Report.update(data, {
      where: { Id: id },
    });

    if (!report) {
      return res.status(401).send({
        status: "fail",
        message: "No report found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully update your report",
      data: report,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

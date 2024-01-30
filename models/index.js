const db = require("../db/db");
const { DataTypes } = require("sequelize");

// Synchronize the database.
// The `force: false` option means that it will not drop and true option it will drop
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection re-synced");
  })
  .catch((err) => {
    console.log("Error on re-synced", err);
  });

// Define models and associate them with the Sequelize instance
// 'db.user' and 'db.report' now represent Sequelize models
db.user = require("../models/users/user")(db.sequelize, DataTypes);
db.report = require("../models/report/report")(db.sequelize, DataTypes);
db.post = require("../models/post/post")(db.sequelize, DataTypes);
db.review = require("../models/review/review")(db.sequelize, DataTypes);
db.mypost = require("../models/mypost/mypost")(db.sequelize, DataTypes);
db.comment = require("../models/comment/comment")(db.sequelize, DataTypes);
db.reply = require("../models/reply/reply")(db.sequelize, DataTypes);
db.userNotification = require("../models/userNotification/userNotification")(
  db.sequelize,
  DataTypes
);
db.adminNotification = require("../models/adminNotification/adminNotification")(
  db.sequelize,
  DataTypes
);

db.post.hasMany(db.comment, { foreignkey: "post_Id" });
db.comment.belongsTo(db.post, { foreignkey: "post_Id" });

db.user.hasMany(db.post, { foreignkey: "Id" });
db.post.belongsTo(db.user, { foreignkey: "Id" });

db.user.hasMany(db.mypost, { foreignkey: "Id" });
db.mypost.belongsTo(db.user, { foreignkey: "Id" });

db.user.hasMany(db.userNotification, { foreignkey: "Id" });
db.userNotification.belongsTo(db.user, { foreignkey: "Id" });

// db.user.hasMany(db.adminNotification, { foreignkey: "Id" });
// db.adminNotification.belongsTo(db.user, { foreignkey: "Id" });

db.post.hasMany(db.reply, { foreignkey: "post_Id" });
db.reply.belongsTo(db.post, { foreignkey: "post_Id" });

db.comment.hasMany(db.reply, { foreignkey: "id" });
db.reply.belongsTo(db.comment, { foreignkey: "id" });

module.exports = db;

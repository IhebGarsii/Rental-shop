const adminNotificationModel = require("../model/adminNotification");

const getNotification = async (req, res) => {
  const { idUser } = req.params;
  try {
    const notification = await adminNotificationModel.find({ idUser: idUser });
    let i = 0;
    notification.forEach((element) => {
      if (element.read === "UNREAD") {
        i++;
      }
    });
    console.log("user notification");

    if (!notification) {
      return res.status(404).json("no notification were found");
    }
    return res.status(200).json({ notification, i });
  } catch (error) {
    console.error(error);
  }
};

const getAdminNotification = async (req, res) => {
  try {
    const notification = await adminNotificationModel.find();
    let i = 0;
    notification.forEach((element) => {
      if (element.read === "UNREAD") {
        i++;
      }
    });
    console.log("admin notification");

    if (!notification) {
      return res.status(404).json("no notification were found");
    }
    return res.status(200).json({ notification, i });
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getNotification, getAdminNotification };

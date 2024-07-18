const newsLettreModel = require("../model/newsLettreModel");
const nodemailer = require("nodemailer");
const postNewsLetter = async (req, res) => {
  try {
    const email = await newsLettreModel.findOne();
    // Create a new transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ihebgarsi78@gmail.com",
        pass: "bvxixgsgsxvusrgb",
      },
    });

    // Define the mail options
    const mailOptions = {
      from: "ihebgarsi78@gmail.com", // Sender address (your Gmail address)
      to: email.emails, // Receiver's email address
      subject: req.body.subject, // Email subject
      html: `
        <p>You have received a new email :</p>
      <p>${req.body.text}</p>
      `,
    };

    await email.save();
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const subscribeNewsLetter = async (req, res) => {

  try {
    let email = await newsLettreModel.findOne();
    if (!email) {
      email = new newsLettreModel();
    }
    email.emails.push(req.body.email);
    await email.save();
    return res.status(200).json("email added");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = { postNewsLetter, subscribeNewsLetter };

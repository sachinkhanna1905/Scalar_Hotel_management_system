const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
module.exports.ConfirmMail = async (
  { userEmail, text, subject },
  next
) => {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: process.env.NODEMAIL_EMAIL,
        pass: process.env.NODEMAIL_PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "!!!!Welcome to Hotel Management",
        intro:
          text ||
          "Welcome to Daily Tuition! We're very excited to have you on board.",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    let mail = await MailGenerator.generate(response);

    let message = {
      from: process.env.NODEMAIL_EMAIL,
      to: userEmail,
      subject: subject || "Signup Successful",
      html: mail,
    };
    await transporter.sendMail(message);
  } catch (err) {
    next(err);
  }
};

const fs = require("fs");
const nodemailer = require("nodemailer");
const prompt = require("prompt");

/**
 * @param { string } filePath
 */
exports.getDetailsObject = (filePath) => {
  let details = {};
  const data = fs.readFileSync(filePath, "UTF-8");
  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    if (line.length === 0) {
      return;
    }
    const cleanLine = line.replace(/[ ]+/, "");
    const key = cleanLine.substr(0, line.indexOf(":"));
    const data = cleanLine.substr(line.indexOf(": ") + 1);
    details[key] = data;
  });
  return details;
};

/**
 * @param { string } pathsString
 */
const createFileList = (pathsString) => {
  let fileList = [];
  const cleanPaths = pathsString.replace(" ", "");
  const pathList = cleanPaths.split(",");
  pathList.forEach(async (path) => {
    const filenames = fs.readdirSync(path);
    filenames.forEach((file) => {
      fileList.push({ path: `${path}\\${file}` });
    });
  });
  return fileList;
};

const getEmailService = (emailAddress) => {
  return emailAddress.indexOf("@") + 1, emailAddress.indexOf(".");
};

/**
 * @param { Object } detailsObject
 */
exports.sendEmail = async (detailsObject) => {
  var transporter = nodemailer.createTransport({
    service: getEmailService(detailsObject.email),
    auth: {
      user: detailsObject.email,
      pass: detailsObject.password,
    },
  });
  const fileList = createFileList(detailsObject.paths);
  const destinationEmail =
    detailsObject.destination !== undefined && detailsObject.destination !== ""
      ? detailsObject.destination
      : detailsObject.email;
  var mailOptions = {
    from: detailsObject.email,
    to: destinationEmail,
    subject: `קוח מעודכן`,
    attachments: [...fileList],
  };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email has been sent");
  //   }
  //   prompt.get("Press enter to close");
  // });
};

const fs = require("fs");
const readline = require("readline");
const nodemailer = require("nodemailer");
const prompt = require("prompt");

/**
 * @param { string } filePath
 */
exports.getDetailsObject = async (filePath) => {
  let details = {};
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (line.length === 0) {
      return;
    }
    const cleanLine = line.replace(" ", "");
    const key = cleanLine.substr(0, line.indexOf(":"));
    const data = cleanLine.substr(line.indexOf(": ") + 1);
    details[key.replace(/[^\w]/, "")] = data;
  }

  return details;
};

/**
 * @param { string } pathsString
 */
const createFileList = (pathsString) => {
  let fileList = [];
  console.log(pathsString);
  const pathList = pathsString.split(",");
  pathList.forEach((path) => {
    const cleanPath = path.replace(" ", "");
    const filenames = fs.readdirSync(cleanPath);
    filenames.forEach((file) => {
      fileList.push({ path: `${cleanPath}\\${file}`, filename: file });
    });
  });
  return fileList;
};

/**
 * @param { string } emailAddress
 * @returns {string }
 */
const getEmailService = (emailAddress) => {
  return emailAddress.slice(
    emailAddress.indexOf("@") + 1,
    emailAddress.indexOf(".")
  );
};

/**
 * @param { Object } detailsObject
 */
exports.sendEmail = (detailsObject) => {
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
    subject:
      detailsObject.emailsubject !== undefined
        ? detailsObject.emailsubject
        : "",
    attachments: [...fileList],
  };
  return transporter
    .sendMail(mailOptions)
    .then(() => console.log("Email Has Been Sent!"));
};

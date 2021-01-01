const { getDetailsObject, sendEmail } = require("./helpFunctions");
const fs = require("fs");
const prompt = require("prompt");

const path = "./details.txt";

const main = () => {
  if (fs.existsSync(path)) {
    const detailsObject = getDetailsObject(path);
    sendEmail(detailsObject);
  } else {
    console.log("Not Exist");
    prompt.get("Press enter to close");
  }
};

main();

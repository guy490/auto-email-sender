const { getDetailsObject, sendEmail } = require("./helpFunctions");
const fs = require("fs");
const prompt = require("prompt");

const path = "./details.txt";

const main = async () => {
  let detailsObject = {};
  try {
    detailsObject = await getDetailsObject(path);
    await sendEmail(detailsObject);
  } catch (err) {
    console.error(err.message);
    console.log("\n\nDetails we got from the details file", detailsObject);
  }
  prompt.get("Press enter to close");
};

main();

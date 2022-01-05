import helper from "./ShareHelper";
import Mailgun from "mailgun.js";
import formData from "form-data";

const API_KEY = process.env.VUE_APP_MAILGUN_KEY;
const DOMAIN = process.env.VUE_APP_MAILGUN_DOMAIN;

export default {
  shareToMessage: "E-mail address",
  share: async function (sharedTo, items) {
    const message = helper.formatMessage(items);

    const mailgun = new Mailgun(formData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const messageData = {
      from: "Grapp Grocery App <admin@mail.gdcl.io>",
      to: sharedTo,
      subject: "Shared grocery item list",
      text: message,
    };

    try {
      const res = await client.messages.create(DOMAIN, messageData);
      return Promise.resolve(res);
    } catch (err) {
      if (err.status === 400 && "details" in err && "message" in err.details) {
        const excMsg = err.details.message.includes("not a valid address")
          ? "Please enter a valid E-mail address"
          : err.details.message;
        return Promise.reject(excMsg);
      }
      return Promise.reject(err);
    }
  },
};

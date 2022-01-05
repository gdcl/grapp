import helper from "./ShareHelper";
import Mailgun from "mailgun.js";
import formData from "form-data";

const API_KEY = process.env.VUE_APP_MAILGUN_KEY;
const DOMAIN = process.env.VUE_APP_MAILGUN_DOMAIN;
// const endpoint = 'https://api.mailgun.net/v3/sandbox0a158a7d88b34faa965ee76c48ec66a2.mailgun.org'
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
      return Promise.reject(err);
    }
  },
};

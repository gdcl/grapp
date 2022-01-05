import helper from "./ShareHelper";
import axios from "axios";

const mode = process.env.NODE_ENV;
const key = process.env.VUE_APP_TEXTBELT_KEY;
const test = (mode === "test") | (mode === "development");

export default {
  shareToMessage: "Phone Number",
  share: async function (sharedTo, items) {
    let nr = sharedTo;
    if (!nr.startsWith("+")) {
      nr = `+1${nr}`;
    }

    const message = helper.formatMessage(items);
    let justTest =
      test & !(sharedTo.includes("7037270058") || sharedTo.includes("abc"));
    try {
      const response = await axios.post("https://textbelt.com/text", {
        phone: sharedTo,
        message: message,
        key: justTest ? key + "_test" : key,
      });
      const result = response.data;
      if (result.success) {
        return Promise.resolve(result);
      } else {
        const msg = result.error.includes("Invalid phone number")
          ? "Please enter a valid phone number"
          : result.error;
        return Promise.reject(msg);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

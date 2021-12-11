import ShareProvider from "./ShareProvider";
import axios from "axios";
const mode = process.env.NODE_ENV;
const key = process.env.VUE_APP_TEXTBELT_KEY;
const test = (mode === "test") | (mode === "development");

export default class TextShareProvider extends ShareProvider {
  constructor() {
    super();
  }

  getSharedToFormComponent() {
    return null;
  }

  async share(sharedTo, items) {
    const message = this.formatMessage(items);
    let justTest =
      test & !(sharedTo.includes("7037270058") || sharedTo.includes("abc"));
    try {
      const response = await axios.post("https://textbelt.com/text", {
        phone: sharedTo,
        message: message,
        key: justTest ? key + "_test" : key,
      });
      const result = response.data;
      console.dir(result);
      if (result.success) {
        return Promise.resolve(result);
      } else {
        return Promise.reject(result.error);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

import ShareProvider from "./ShareProvider";
//import fetch from "node-fetch";
const mode = process.env.NODE_ENV;
const key = process.env.VUE_APP_TEXTBELT_KEY;
// const test = mode === "development";
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
    try {
      let justTest =
        test & !(sharedTo.includes("7037270058") || sharedTo.includes("abc"));
      const response = await fetch("https://textbelt.com/text", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: sharedTo,
          message: message,
          key: justTest ? key + "_test" : key,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.dir(result);
        if (result.success) {
          return Promise.resolve(result);
        } else {
          return Promise.reject(result.error);
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

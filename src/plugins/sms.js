import fetch from "node-fetch";
const key = "09d39ff269c99c0914317e3c2068ac78a758e159gZdGbBOANeUiQh6nb711Wl3X2";
const smsApi = {

  // shareShoppingList (items) {
  //   const msg = formatItems (items);


  // },

  sendSms: async function(message, nr, test = false) {
    fetch("https://textbelt.com/text", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: nr,
        message: message,
        key: test ? key + "_test" : key,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  },
};

//module.exports = smsApi;
export default smsApi;

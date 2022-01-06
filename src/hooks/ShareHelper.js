export default {

  formatMessage:  function (items) {
    const message = items.reduce(
      (prev, item) =>
        `${prev}\n${item.name}: ${item.quantity} ${item.unit ? item.unit : ""}`,
      "Shopping list shared by Grapp:"
    );
    return message;
  }
  
}

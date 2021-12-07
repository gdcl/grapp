export default class ShareProvider {
  constructor() {
    this.sharedToList = [];
  }

  formatMessage(items) {
    const message = items.reduce(
      (prev, item) =>
        `${prev}\n${item.name}: ${item.quantity} ${item.unit ? item.unit : ""}`,
      "Shopping list shared by Grapp:"
    );
    return message;
  }

  getSharedTos() {
    return this.sharedToList;
  }

  addSharedTo(sharedTo) {
    this.sharedToList.push(sharedTo);
  }

  getSharedToFormComponent() {
    return null;
  }

  async share(sharedTo, items) {
    const message = this.formatMessage(items);
    console.log(`Sharing grocery list to ${sharedTo}:\n${message}`);
    return Promise.resolve({ message, result: "message logged successfully" });
  }
}

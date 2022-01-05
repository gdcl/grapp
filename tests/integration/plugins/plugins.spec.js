import shareFactory from "../../../src/hooks/ShareHook";
import ShareProvider from "../../../src/hooks/ShareHelper";

let testItemList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
  name: `jest${i}`,
  profile: i < 5 ? 1 : 2,
  quantity: 5,
  unit: "lbs",
  id: i,
}));

let shortTestItemList = testItemList.slice(0, 4);

let provider = null;

describe("Share factory plugin default share provider", () => {
  beforeEach(() => {
    provider = shareFactory.create("root");
  });

  it("can instantiate the default share provider", () => {
    expect(provider).toBeInstanceOf(ShareProvider);
  });

  it("can add sharedTo's as needed", () => {
    provider.addSharedTo("test1");
    provider.addSharedTo("test2");
    expect(provider.getSharedTos()).toHaveLength(2);
    expect(provider.getSharedTos()).toContainEqual("test1");
    expect(provider.getSharedTos()).toContainEqual("test2");
  });

  it("can share messages", async () => {
    const res = await provider.share("test share user", testItemList);
    expect(res).toHaveProperty("result");
    expect(res.result);
    expect(res).toHaveProperty("message");
    const message = res.message;
    expect(message).toEqual(
      expect.stringContaining("Shopping list shared by Grapp:")
    );
    for (const item of testItemList) {
      expect(message).toEqual(
        expect.stringContaining(
          `${item.name}: ${item.quantity} ${item.unit ? item.unit : ""}`
        )
      );
    }
  });
});

describe("Share factory plugin text share provider", () => {
  beforeEach(() => {
    provider = shareFactory.create("text");
  });

  it("can instantiate the text share provider", () => {
    expect(provider).toBeInstanceOf(ShareProvider);
  });

  it("can add sharedTo's as needed", () => {
    provider.addSharedTo("test1");
    provider.addSharedTo("test2");
    expect(provider.getSharedTos()).toHaveLength(2);
    expect(provider.getSharedTos()).toContainEqual("test1");
    expect(provider.getSharedTos()).toContainEqual("test2");
  });

  it("can share messages when provided a valid number", async () => {
    const res = await provider.share("123456789", shortTestItemList);
    expect(res).toHaveProperty("success");
    expect(res.success).toEqual(true);
  });

  it("returns a rejected promise with an error code when provided an invalid number", async () => {
    return expect(
      provider.share("abcdef", shortTestItemList)
    ).rejects.toContain("Invalid phone number or bad request");
  });
});

import useShare from "../../../src/hooks/ShareHook";

let testItemList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
  name: `jest${i}`,
  profile: i < 5 ? 1 : 2,
  quantity: 5,
  unit: "lbs",
  id: i,
}));

let shortTestItemList = testItemList.slice(0, 4);

let selectedShare;
let selectShare;
let getShareProviders;
let shareToMessage;
let share;

describe("Share hook", () => {
  beforeEach(() => {
    ({ selectedShare, selectShare, getShareProviders, shareToMessage, share } =
      useShare());
  });

  it("can get the list of share providers", () => {
    const providers = getShareProviders();
    expect(providers).toHaveLength(2);
    expect(providers).toContainEqual("text");
    expect(providers).toContainEqual("email");
  });

  it("can select the share provider to use", () => {
    selectShare("email");
    expect(selectedShare.value).toEqual("email");

    selectShare("text");
    expect(selectedShare.value).toEqual("text");
  });

  it("returns a string explaining the expected share identifier", () => {
    selectShare("email");
    expect(shareToMessage()).toEqual("E-mail address");

    selectShare("text");
    expect(shareToMessage()).toEqual("Phone Number");
  });

  it("can share messages by text when provided a valid number", async () => {
    selectShare("text");
    const res = await share("123456789", shortTestItemList);
    expect(res).toHaveProperty("success");
    expect(res.success).toEqual(true);
  });

  it("returns a rejected promise with an error code when asked to share by text with an invalid text number", async () => {
    selectShare("text");
    expect(share("abcdef", shortTestItemList)).rejects.toContain(
      "Please enter a valid phone number"
    );
  });

  it("can share messages by email when provided a valid e-mail", async () => {
    selectShare("email");
    const res = await share("testuser@test.org", shortTestItemList);
    expect(res).toHaveProperty("message");
    expect(res.message).toContain("Queued. Thank you.");
  });

  it("returns a rejected promise with an error code when asked to share by email with an invalid text number", async () => {
    selectShare("email");
    expect(share("abcdef", shortTestItemList)).rejects.toContain(
      "Please enter a valid E-mail address"
    );
  });
});

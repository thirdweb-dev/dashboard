import { Page, test } from "@playwright/test";

/* jest.setTimeout(60000); */

/* let browser: Browser;
let context: BrowserContext;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

afterEach(async () => {
  await context.close();
}); */

test("thirdweb", async ({ page }: { page: Page }) => {
  await page.goto("http://localhost:3000/thirdweb.eth/DropERC721");
  const title = await page.title();

  expect(title).toBe("NFT Drop - ERC721 | Published Smart Contract | thirdweb");

  console.log({ title });

  const connectWallet = page.locator(`[data-test="connect-wallet-button"]`);
  await connectWallet.click();

  const continueAsGuest = page.locator(
    `[data-test="continue-as-guest-button"]`,
  );
  await continueAsGuest.click();

  const password = "1234";

  const passwordInput = page.locator(`[data-test="new-password"]`);
  await passwordInput.fill(password);

  const confirmPasswordInput = page.locator(`[data-test="confirm-password"]`);
  await confirmPasswordInput.fill(password);

  const createWalletButton = page.locator(
    `[data-test="create-new-wallet-button"]`,
  );
  await createWalletButton.click();

  const connectedWallet = page.locator(
    `[data-test="connected-wallet-details"]`,
  );
  await connectedWallet.click();

  const connectedWalletAddressDiv = page.locator(
    `[data-test="connected-wallet-address"]`,
  );
  const address = await connectedWalletAddressDiv.getAttribute("data-address");

  console.log({ address });

  const deployButton = page.locator(`[data-test="deploy-button"]`);
  await deployButton.click();

  const input = page.locator(`[data-test="contract-name-input"]`);
  const contractName = "E2E NFT Drop";

  await input.fill(contractName);
  const value = await input.inputValue();
  expect(value).toBe(contractName);

  const networkSelectorButton = page.locator(
    `[data-test="network-selector-button"]`,
  );
  await networkSelectorButton.click();

  const mumbai = page.locator('text="Mumbai"').first();
  await mumbai.click();
  expect(await networkSelectorButton.innerText()).toBe("Mumbai");

  const deployNowButton = page.locator('text="Deploy Now"');
  await Promise.all([
    deployNowButton.click(),
    page.waitForLoadState("networkidle"),
  ]);

  const getMaticButton = page.locator('text="Get MATIC from faucet"');
  const isButtonVisible = await getMaticButton.isVisible();

  if (isButtonVisible) {
    throw new Error("Wallet has run out of funds.");
  }
});

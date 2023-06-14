import { Page, expect, test } from "@playwright/test";

test("Should publish a direct deploy contract", async ({
  page,
}: {
  page: Page;
}) => {
  await page.goto(
    "http://localhost:3000/contracts/publish/QmcFakquo1nn8mkX1DHbvpoBh2E4m14HCfZgKbD3DZxVPp%2F0",
    {
      timeout: 60000,
    },
  );

  const connectWallet = page
    .locator(`[data-test="connect-wallet-button"]`)
    .first();
  await connectWallet.click();

  const continueAsGuest = page.locator(
    `[data-test="continue-as-guest-button"]`,
  );
  await continueAsGuest.click();

  const password = "1234";

  /*   const passwordInput = page.locator(`[data-test="new-password"]`); */
  const passwordInput = page.locator(`#new-password`);
  await passwordInput.isVisible();
  await passwordInput.fill(password);

  /*   const confirmPasswordInput = page.locator(`[data-test="confirm-password"]`); */
  const confirmPasswordInput = page.locator(`#confirm-password`);
  await confirmPasswordInput.isVisible();
  await confirmPasswordInput.fill(password);

  const createWalletButton = page.locator(
    `[data-test="create-new-wallet-button"]`,
  );
  await createWalletButton.click();

  const acceptAndSignButton = page.locator(`[data-test="accept-sign-button"]`);
  await acceptAndSignButton.isVisible();
  await acceptAndSignButton.click();
  await acceptAndSignButton.waitFor({ state: "detached" });

  //
  const connectedWallet = page.locator(
    `[data-test="connected-wallet-details"]`,
  );
  await connectedWallet.isVisible();
  await connectedWallet.click();

  const connectedWalletAddressDiv = page.locator(
    `[data-test="connected-wallet-address"]`,
  );
  const address = await connectedWalletAddressDiv.getAttribute("data-address");
  console.log({ address });

  // Close the modal
  await page.click("html");
  //

  const nextButton = page.locator(`[data-test="next-button"]`);
  await nextButton.click();

  const publishContractButton = page.locator(
    `[data-test="publish-contract-button"]`,
  );

  const initialUrl = page.url();

  await publishContractButton.click();

  // Wait for the URL to change from the initial URL
  await page.waitForFunction(
    (initUrl) => window.location.href !== initUrl,
    initialUrl,
  );

  // If the URL has changed, we've navigated away
  if (page.url() !== initialUrl) {
    console.log("The page has navigated away");
  } else {
    console.log("The page has not navigated away");
  }

  const successMessageLocator = page.locator(
    `text="Successfully published contract"`,
  );

  await successMessageLocator.waitFor();
  const isSuccess = await successMessageLocator.isVisible();

  expect(isSuccess).toBe(true);
});

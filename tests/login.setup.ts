import { test as setup } from "@playwright/test";
import { LogInUser } from "../src/page-objects/components/LogInUser";

setup("User can be logged in successfully", async ({ page }) => {
  //const cookieFilePath = "./session-storage.json";
  const components = new LogInUser(page);
  await components._navigate();
  await components._signIn();
  await page.pause();
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: "session-storage.json" });
  //One more way to save all cookies is via 'cookies()' method:
  //await page.context().cookies();
});

import { test as base, chromium } from "@playwright/test";
import { LogInUser } from "../page-objects/components/LogInUser";
import { GaragePage } from "../page-objects/pages/GaragePage";

export const userGaragePage = base.extend({
  //Adding of the 'loggedPage' customized fixture
  loggedPage: async ({ page }, use) => {
    const logIn = new LogInUser(page);
    await logIn._navigate();
    await logIn._signIn();
    //await page.getByRole("button", { name: "Add car" }).waitFor();
    await page.context().storageState({ path: "session-storage.json" });
    console.log("FIXTURE BEFORE");
    await use(page);
    console.log("FIXTURE AFTER");
  },
});

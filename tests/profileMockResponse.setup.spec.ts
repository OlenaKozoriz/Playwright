import { userGaragePage as test } from "../src/fixtures/userGaragePage.spec";
import { expect } from "@playwright/test";
import { GaragePage } from "../src/page-objects/pages/GaragePage";

test("User can replace the response body on the Profile page", async ({
  page,
  loggedPage,
}) => {
  const testData = {
    status: "ok",
    data: {
      userId: 234567,
      photoFilename: "Ivan-user.png",
      name: "Ivan",
      lastName: "Kozoriz",
    },
  };
  await page.route("**/api/users/profile", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(testData),
    })
  );
  await loggedPage.pause();
  const garagePage = new GaragePage(page);
  await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
  await expect(garagePage._profileBtn).toBeVisible();
  await garagePage._profileBtn.click();
  await page.pause();
  //await expect(garagePage._profileUserName).toHaveText("Ivan Kozoriz");
});

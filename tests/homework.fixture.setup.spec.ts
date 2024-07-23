//User scenario, where we run test using the login state, storaged in the customized 'userGaragePage' fixture
import { userGaragePage as test } from "../src/fixtures/userGaragePage.spec";
import { expect } from "@playwright/test";
import { GaragePage } from "../src/page-objects/pages/GaragePage";

test.describe("Session storage and adding a new car", async () => {
  test.beforeEach("User is logged via the fixture", async ({ loggedPage }) => {
    await loggedPage.pause();
  });

  test("User can add a car", async ({ page }) => {
    const garagePage = new GaragePage(page);
    await garagePage._navigate();
    await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
    await expect(garagePage._addCarBtn).toBeVisible();
    await garagePage._addCarBtn.click();
    await garagePage.selectBrand("Porsche");
    await garagePage.selectModel("911");
    await garagePage._mileageInput.fill("5467");
    await garagePage._addBtn.click();
  });
});

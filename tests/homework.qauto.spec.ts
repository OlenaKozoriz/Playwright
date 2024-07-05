import { test, expect } from "@playwright/test";

test.describe("Registration form validation", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const signUpBtn = page.getByRole("button", { name: "Sign Up" });
    await expect(signUpBtn).toBeVisible();
    await signUpBtn.click();
  });

  test("First name is valid due to the requierements (positive scenario)", async ({
    page,
  }) => {
    const regFirstName = page.locator("#signupName");
    const regFirstNameLength = 5;

    await regFirstName.fill("Olena");
    await expect(regFirstName).toHaveValue(/[a-z]/i);
    expect(regFirstNameLength).toBeGreaterThanOrEqual(2);
    expect(regFirstNameLength).toBeLessThanOrEqual(20);
    await expect(regFirstName).not.toHaveValue(" ");
    await page.pause();
  });

  test("First name is invalid and has to be from 2 to 20 characters long (1st negative scenario)", async ({
    page,
  }) => {
    const regFirstName = page.locator("#signupName");
    const errorMsgFirstName = page.locator(".invalid-feedback");

    await regFirstName.fill("111111¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬");
    await regFirstName.blur();
    await expect(errorMsgFirstName).toHaveText(
      "Name is invalidName has to be from 2 to 20 characters long"
    );
    await page.pause();
  });

  test("Last name field is empty (2nd negative scenario)", async ({ page }) => {
    const regFirstName = page.locator("#signupName");
    const regLastName = page.locator("id=signupLastName");
    const errorMsgLastName = page.locator(".invalid-feedback");

    await regFirstName.fill("Olena");
    await regLastName.fill("");
    await regLastName.blur();
    await expect(errorMsgLastName).toContainText("Last name required");
    await page.pause();
  });

  test("Email is incorrect, with red border of the field (combining of negative and positive scenarios: due to the existing requirements)", async ({
    page,
  }) => {
    const regFirstName = page.locator("#signupName");
    const regLastName = page.locator("id=signupLastName");
    const regEmail = page.locator('input[name="email"]');
    const errorMsgEmail = page.locator(".invalid-feedback");

    await regFirstName.fill("Olena");
    await regLastName.fill("Kozoriz");
    await regEmail.fill("Olena");
    await regEmail.blur();
    await expect(errorMsgEmail).toContainText("Email is incorrect");
    await expect(errorMsgEmail).toHaveCSS("color", "rgb(220, 53, 69)");
    await page.pause();
  });

  test("Password is invalid (4th negative scenario)", async ({ page }) => {
    const regFirstName = page.locator("#signupName");
    const regLastName = page.locator("id=signupLastName");
    const regEmail = page.locator('input[name="email"]');
    const regPassword = page.locator("#signupPassword");
    const errorMsgPassword = page.locator(".invalid-feedback");

    await regFirstName.fill("Olena");
    await regLastName.fill("Kozoriz");
    await regEmail.fill("lenchik13@ukr.net");
    await regPassword.fill("o");
    await regPassword.blur();
    await expect(errorMsgPassword).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await page.pause();
  });

  test("Register button is disabled due to the incorrect data (5th negative scenario)", async ({
    page,
  }) => {
    const regFirstName = page.locator("#signupName");
    const regLastName = page.locator("id=signupLastName");
    const regEmail = page.locator('input[name="email"]');
    const regPassword = page.locator("#signupPassword");
    const regReEnterPassword = page.locator('input[name="repeatPassword"]');
    const registerBtn = page.getByRole("button", { name: "Register" });

    await regFirstName.fill("");
    await regFirstName.blur();
    await regLastName.fill("Kozoriz");
    await regEmail.fill("aqa-lenchik13@ukr.net");
    await regPassword.pressSequentially("Oleg16111987", { delay: 100 });
    await regReEnterPassword.pressSequentially("Oleg16111987", { delay: 100 });
    await expect(registerBtn).toBeDisabled();
    await page.pause();
  });
});

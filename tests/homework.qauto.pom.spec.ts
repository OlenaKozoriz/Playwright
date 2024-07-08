import { test, expect } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";

test("User can be registered successfully", async ({ page }) => {
  const homePage = new HomePage(page);
  const regFirstNameLength = 5;
  const regPasswordLength = 13;

  //Usage of the parent's method for navigating to the base page
  await homePage._navigate();
  //Usage of the parent's method for clicking on 'Sign Up' button
  await homePage._signUpNewUser();

  //Usage of parent's method for registration of the new user by clicking on 'Register' button
  await homePage._regNewUser();

  //Assertions of the fields which have the locators
  await expect(homePage._regFirstName).toHaveValue(/[a-z]/i);
  await expect(homePage._regFirstName).not.toHaveValue(" ");
  await expect(homePage._regLastName).toHaveValue(/[a-z]/i);
  await expect(homePage._regLastName).not.toHaveValue(" ");

  //Assertions of the fields without locators
  expect(regFirstNameLength).toBeGreaterThanOrEqual(2);
  expect(regFirstNameLength).toBeLessThanOrEqual(20);
  expect(regPasswordLength).toBeGreaterThanOrEqual(8);
  expect(regPasswordLength).toBeLessThanOrEqual(15);

  await page.pause();
});

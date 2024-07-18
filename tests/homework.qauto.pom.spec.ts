import { test, expect } from "@playwright/test";
import { RegistrationUser } from "../src/page-objects/components/RegistrationUser";

test("User can be registered successfully", async ({ page }) => {
  const components = new RegistrationUser(page);
  const regFirstNameLength = 5;
  const regPasswordLength = 13;

  //Usage of the parent's method for navigating to the base page
  await components._navigate();
  //Usage of the parent's method for clicking on 'Sign Up' button
  await components._signUpNewUser();

  //Usage of parent's method for registration of the new user by clicking on 'Register' button
  await components._regNewUser();

  //Assertions of the fields which have the locators
  await expect(components._regFirstName).toHaveValue(/[a-z]/i);
  await expect(components._regFirstName).not.toHaveValue(" ");
  await expect(components._regLastName).toHaveValue(/[a-z]/i);
  await expect(components._regLastName).not.toHaveValue(" ");

  //Assertions of the fields without locators
  expect(regFirstNameLength).toBeGreaterThanOrEqual(2);
  expect(regFirstNameLength).toBeLessThanOrEqual(20);
  expect(regPasswordLength).toBeGreaterThanOrEqual(8);
  expect(regPasswordLength).toBeLessThanOrEqual(15);

  await page.pause();
});

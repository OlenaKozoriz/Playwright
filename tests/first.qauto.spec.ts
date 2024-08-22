import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hillel Qauto/);
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

//Class, where the new user is logging in
export class LogInUser extends BasePage {
  _signInBtn: Locator;
  _signInEmail: Locator;
  _signInPassword: Locator;
  _logInBtn: Locator;

  constructor(page: Page) {
    super(page, "/");
    this._signInBtn = page.getByRole("button", { name: "Sign In" });
    this._signInEmail = page.locator("#signinEmail");
    this._signInPassword = page.locator("#signinPassword");
    this._logInBtn = this._page.getByRole("button", { name: "Login" });
  }

  async _signIn() {
    await expect(this._signInBtn).toBeEnabled();
    await this._signInBtn.click();
    await this._signInEmail.fill("okozoriz@allvuesystems.com");
    await this._signInPassword.pressSequentially("zeB3ixNryhyQ074", {
      delay: 100,
    });
    await this._logInBtn.click();
  }
}

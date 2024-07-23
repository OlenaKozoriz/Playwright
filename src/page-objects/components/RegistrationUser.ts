import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

//Class, where the Registration form is fullfilled
export class RegistrationUser extends BasePage {
  _signUpBtn: Locator;
  _regFirstName: Locator;
  _regLastName: Locator;
  _regEmail: Locator;
  _regPassword: Locator;
  _regReEnterPassword: Locator;
  _regBtn: Locator;

  constructor(page: Page) {
    super(page, "/");
    this._signUpBtn = this._page.getByRole("button", { name: "Sign Up" });
    this._regFirstName = page.locator("#signupName");
    this._regLastName = page.locator("id=signupLastName");
    this._regEmail = page.locator('input[name="email"]');
    this._regPassword = page.locator("#signupPassword");
    this._regReEnterPassword = page.locator('input[name="repeatPassword"]');
    this._regBtn = page.getByRole("button", { name: "Register" });
  }

  async _signUpNewUser() {
    await expect(this._signUpBtn).toBeEnabled();
    await this._signUpBtn.click();
  }

  async _regNewUser() {
    await this._regFirstName.fill("Olena");
    await this._regLastName.fill("Bykhovska");
    await this._regEmail.fill("okozoriz@allvuesystems.com");
    await this._regPassword.pressSequentially("zeB3ixNryhyQ074", {
      delay: 100,
    });
    await this._regReEnterPassword.pressSequentially("zeB3ixNryhyQ074", {
      delay: 100,
    });

    await expect(this._regBtn).toBeEnabled();
    await this._regBtn.click();
  }
}

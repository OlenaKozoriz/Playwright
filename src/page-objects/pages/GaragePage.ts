import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

//Class where the Garage page is defined and
export class GaragePage extends BasePage {
  _addCarBtn: Locator;
  _addCarBrand: Locator;
  _addCarModel: Locator;
  _mileageInput: Locator;
  _addBtn: Locator;
  _logOutBtn: Locator;
  _profileBtn: Locator;
  _profileUserName: Locator;

  constructor(page: Page) {
    super(page, "panel/garage");
    this._logOutBtn = this._page.locator(
      ".sidebar d-flex flex-column: text(' Log out ')"
    );
    this._addCarBtn = page.getByRole("button", { name: "Add car" });
    this._addCarBrand = page.locator("#addCarBrand");
    this._addCarModel = page.locator("#addCarModel");
    this._mileageInput = page.locator("#addCarMileage");
    this._addBtn = page.getByText("Add", { exact: true });
    this._profileBtn = page.locator('[routerlink="profile"]');
    this._profileUserName = page.locator(
      ".profile d-flex flex-column align-items-center"
    );
  }

  async selectBrand(brand: string) {
    return this._addCarBrand.selectOption(brand);
  }

  async selectModel(model: string) {
    await this._page.waitForTimeout(1000);
    await this._addCarModel.selectOption({ label: model });
  }

  async enterMileage(mileage: string) {
    await this._mileageInput.fill(mileage);
  }

  async clickAddButton() {
    await this._addBtn.click();
  }
  async _logOut() {
    await this._logOutBtn.click();
  }
  async clickProfileButton() {
    await this._profileBtn.click();
  }
}

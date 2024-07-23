import { Page } from "@playwright/test";

//Class where the main (basic) page is defined for each of the tests
export class BasePage {
  _page: Page; //'ptotected readonly' relates only to TypeScript and allows the daughter class to extend all the parent's class properties freely
  _url: string;

  constructor(page: Page, url: string) {
    this._page = page;
    this._url = "/";
  }
  async _navigate() {
    return this._page.goto(this._url);
  }
}

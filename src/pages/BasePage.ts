import { Page } from "@playwright/test";

//Class where the main (basic) page is defined for each of the tests
export class BasePage {
  _page: Page; //'ptotected readonly' relates only to TypeScript and allows to the daughter class extends all the parents' properties freely
  _url: string;

  constructor(page: Page, url: string) {
    this._page = page;
    this._url = "/";
  }
  async _navigate() {
    return this._page.goto(this._url);
  }
}

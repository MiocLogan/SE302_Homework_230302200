import { Page, Locator, expect } from "@playwright/test";

export class SweetsPage {
  readonly page: Page;
  readonly addButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButtons = page.getByRole("button", { name: "Add to Basket" });
  }

  async goto() {
    await this.page.goto("/sweets");
    await expect(this.page.getByRole("heading", { name: "Browse sweets" })).toBeVisible();
  }

  async addFirstItemToBasket() {
    await expect(this.addButtons.first()).toBeVisible();
    await this.addButtons.first().click();
  }
}
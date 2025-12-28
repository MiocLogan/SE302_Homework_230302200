import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly basketLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketLink = page.getByRole("link", { name: /Basket/i });
  }

  async goto() {
    await this.page.goto("/");
    await expect(this.page.getByRole("heading", { name: "Welcome to the sweet shop!" })).toBeVisible();
  }

  async expectBasketCount(count: number) {
    await expect(
      this.page.getByRole("link", { name: new RegExp(`^${count}\s+Basket$`) })
    ).toBeVisible();
  }
}
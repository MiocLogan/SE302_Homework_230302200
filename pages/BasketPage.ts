import { Page, Locator, expect } from "@playwright/test";

export class BasketPage {
  readonly page: Page;
  readonly promoInput: Locator;
  readonly redeemBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.promoInput = page.locator(
      "body > div > div > div.col-md-4.order-md-2.mb-4 > form > div:nth-child(1) > input"
    );

    this.redeemBtn = page.locator(
      "body > div > div > div.col-md-4.order-md-2.mb-4 > form > div:nth-child(1) > div:nth-child(3) > button"
    );
  }

  async goto() {
    await this.page.goto("/basket");
    await expect(this.page.locator("h1", { hasText: "Your Basket" })).toBeVisible();
  }

  async applyPromo(code: string) {
    await this.promoInput.fill(code);
    await this.redeemBtn.click();
  }
}

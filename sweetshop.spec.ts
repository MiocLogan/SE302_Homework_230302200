import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasketPage } from "../pages/BasketPage";

test.describe("Sweet Shop Playwright Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.context().clearCookies();
  });

  test("TC_01 Successful Login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login("test@user.com", "qwerty");
    await expect(page).not.toHaveURL(/\/login$/);
  });

  test("TC_02 Invalid Email Login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login("abc", "qwerty");
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("TC_03 Empty Password on Login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await page.getByLabel("Email address").fill("test@user.com");
    await page.getByLabel("Password").fill("");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText(/please enter a valid password/i)).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("TC_04 Browse Sweets List", async ({ page }) => {
    await page.goto("/sweets");

    const productImage = page.locator(
      "body > div > div:nth-child(2) > div:nth-child(4) > div > img"
    );
    await expect(productImage).toBeVisible();

    const addLink = page.locator(
      "body > div > div:nth-child(2) > div:nth-child(4) > div > div.card-footer > a"
    );
    await expect(addLink).toBeVisible();

    const price = page.locator(
      "body > div > div:nth-child(2) > div:nth-child(1) > div > div.card-body > p:nth-child(3) > small"
    );
    await expect(price).toBeVisible();

    const priceText = (await price.textContent())?.trim() ?? "";
    expect(priceText).toMatch(/£/);
  });

  test("TC_07 Invalid Promo Code", async ({ page }) => {
    await page.goto("/sweets");
    await page
      .locator("body > div > div:nth-child(2) > div:nth-child(4) > div > div.card-footer > a")
      .click();

    const basket = new BasketPage(page);
    await basket.goto();

    const totalLocator = page.locator("text=/Total \\(GBP\\)£/i");
    await expect(totalLocator).toBeVisible();
    const before = (await totalLocator.textContent())?.trim() ?? "";

    await basket.applyPromo("NOTREAL");

    const after = (await totalLocator.textContent())?.trim() ?? "";
    expect(after).toBe(before);
  });
});

import { test, expect } from '@playwright/test';

// TC-02: ZIP form rejects invalid and empty ZIP codes (docs/test-cases.md)

const ZIP_ERROR = 'The ZIP Code must be 5 digits with no spaces';
const WIZARD_FIRST_STEP = 'Which elements of the kitchen would you like to update?';
const INVALID_ZIPS = ['1234', '123456', 'abcde', '12 345'];

test.describe('TC-02: ZIP form rejects invalid and empty ZIP codes', () => {
  // Lead creation requests (POST /v1/public/leads) sent by the page during a test
  let leadRequests;

  test.beforeEach(async ({ page }) => {
    leadRequests = [];
    page.on('request', (request) => {
      if (request.method() === 'POST' && request.url().includes('/v1/public/leads')) {
        leadRequests.push(request.url());
      }
    });

    await page.goto('/');
    // The site sets this attribute when the page scripts are ready
    await expect(page.locator('body')).toHaveAttribute('data-autotest-js-ready', '');
  });

  for (const zip of INVALID_ZIPS) {
    test(`rejects "${zip}"`, async ({ page }) => {
      const form = page.locator('#zip_header');

      await form.locator('[data-autotest-input-0]').fill(zip);
      await form.locator('[data-autotest-button-submit-0]').click();

      await expect(form.getByText(ZIP_ERROR)).toBeVisible();
      await expect(form).toHaveClass(/invalid/);
      await expect(page.getByText(WIZARD_FIRST_STEP)).not.toBeVisible();
      expect(leadRequests).toHaveLength(0);
    });
  }

  // Fails because of BUG-07. Can be marked as a known bug by adding test.fail() at the start of the test
  test('rejects an empty ZIP', async ({ page }) => {
    const form = page.locator('#zip_header');

    await form.locator('[data-autotest-button-submit-0]').click();

    await expect(form.getByText(ZIP_ERROR)).toBeVisible();
    await expect(form).toHaveClass(/invalid/);
    await expect(page.getByText(WIZARD_FIRST_STEP)).not.toBeVisible();
    expect(leadRequests).toHaveLength(0);
  });
});

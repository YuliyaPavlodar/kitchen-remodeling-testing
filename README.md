# HomeBuddy · Kitchen Remodeling — QA Test Task

QA test task for the Kitchen Remodeling landing page and lead-generation wizard (HomeBuddy).

| | |
|---|---|
| **Environment** | https://hb-test.stage.sirenltd.dev/ (test environment) |
| **Test date** | 2026-11-07 |
| **Browser / OS** | Chrome 151.0.7922.138 · Safari 17.6 · macOS 14.7.4 (23H420) |
| **Author** | Yuliya Karatayeva |

## Contents

| # | Deliverable | Document |
|---|---|---|
| 1.1 – 1.2 | Exploratory testing, bugs list by severity | [Bugs list](docs/bug-list.md) |
| 1.3 | Top-3 bug reports | [BUG-02](docs/bug-reports/BUG-02.md) (API) · [BUG-06](docs/bug-reports/BUG-06.md) (JavaScript error) · [BUG-10](docs/bug-reports/BUG-10.md) (Functional) |
| 2.1 | Regression suite structure | [Test suite structure](docs/test-suite-structure.md) |
| 2.2 | 10 detailed test cases | [Test cases](docs/test-cases.md) |
| 3.1 | Automation candidates with the highest ROI: TC-01, TC-02, TC-03 | [Test cases](docs/test-cases.md) |
| 3.2 | Automated test for TC-02 (Playwright + JavaScript) | [automation/tests/zip-validation.spec.js](automation/tests/zip-validation.spec.js) |

## Running the automated test

Requirements: Node.js 20+.

```bash
cd automation
npm ci
npx playwright install chromium
npx playwright test
npx playwright show-report
```

Expected result: 4 passed, 1 failed. "rejects an empty ZIP" fails because of BUG-07.

**Note:** this test does not use the Page Object Model (POM), as there is only one simple test so far. For a larger test suite, it would probably be worth adding POM to keep locators and page actions in one place and make the code cleaner.

## Scope & Limitations

**In scope** (exploratory testing in Chrome on macOS):

- Landing page: content, three ZIP forms, Photo Gallery and reviews sliders, footer links
- Wizard: all steps, warnings, exit screen, close button, field validation
- Out-of-area flow and thank-you page
- API requests and console errors (Chrome DevTools)

**Out of scope (4-hour time box):**

- Full testing in Safari, other browsers and Windows
- Real mobile devices: the mobile layout was checked only in browser emulation, the on-screen keyboard was not checked
- Location in the H1 for visitors in the US: testing was done from outside the US
- Advanced Accessibility testing



# Bugs List

**Environment:** `https://hb-test.stage.sirenltd.dev/` · Chrome `Version 151.0.7922.138` · macOS `14.7.4 (23H420)` · `2026-11-07`

All bugs were reproduced in this environment; browser- or viewport-specific conditions are stated in the bug title.

Grammar and spelling mistakes were found in customer review texts. They are not logged as bugs, because reviews are verbatim customer quotes.

Bugs with a full report are marked with ⭐.

## Severity scale

| Severity | Definition |
|---|---|
| **Critical** | A lead cannot be submitted, or the lead is lost. |
| **High** | Key functionality works incorrectly, validation lets invalid lead data through, or legal information is not available.|
| **Medium** | Functional issue with limited impact, including lead data that is rejected or sent incorrectly; layout broken on some viewports or browsers. |
| **Low** | Cosmetic issues, typos, minor inconsistencies. |

## Summary

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 1 |
| Medium | 14 |
| Low | 14 |
| **Total** | **29** |

## Critical

No critical bugs were found.

## High

| ID                                   | Title                                                                                                                                                                                                                                        | Area | Type |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|------|
| BUG-01 | "Terms Of Use" footer link opens the Privacy Policy page (`href="/privacy-policy"`) instead of the Terms of Use; the Terms of Use page is not reachable from the footer | Landing | Functional |

## Medium

| ID | Title | Area | Type |
|---|---|---|---|
| [BUG-02](bug-reports/BUG-02.md) ⭐ | "Budget" step: the API responds with 422 | API | API |
| BUG-03 | "Layout changes" step (shown after selecting "Change layout"): the answers are sent to the wrong address and are not sent again.<br>Actual request: `PUT /v1/public/leads/non-existent-uuid` → 404.<br>Expected request (example with the ID of the current lead): `PUT /v1/public/leads/7f3c2a10-5b8e-4d21-9c46-1e0f8a2b6d35` | Wizard | Functional |
| BUG-04 | Footer mascot image overlaps the bottom "Get estimate" button on mobile viewports and intercepts clicks on it | Landing | UI |
| BUG-05 | Irrelevant roofing content block "Benefits Of Asphalt Shingles" (shingle types, roofing images and benefits) is shown on the Kitchen Remodeling landing page | Landing | Content |
| [BUG-06](bug-reports/BUG-06.md) ⭐ | Uncaught JavaScript error "This is a mistake, you can create a bug report on this." is thrown in the console on every page load | Landing | JavaScript error |
| BUG-07 | Submitting a ZIP form with an empty ZIP field shows no validation error (all three ZIP forms): nothing happens, the field is not highlighted and the caption stays "Free, no-obligation estimates." | Landing | Validation |
| BUG-08 | "Budget" step: the "Not sure" option cannot be selected — clicking it does not select the option, so a user who doesn't know the budget has to pick a range | Wizard | Functional |
| BUG-09 | "Phone" step: the number is saved to the lead (`PUT /v1/public/leads/{uuid}` → 204) before it is validated; the following `GET /v1/public/leads/{uuid}/phone/{number}/check` returns `isValid: false`, so the lead keeps an invalid phone if the user leaves at the confirmation dialog | API | API |
| [BUG-10](bug-reports/BUG-10.md) ⭐ | Thank-you page greets the user with a wrong name: "Thank you Andrew, your contractor QA company will call soon!" although "Yuliya Test" was entered in the "Full name" field (the lead returned by the API has `fullName: "Yuliya Test"`) | Thank-you page | Functional |
| BUG-11 | "Budget" step: three different options send the same value, so it is not possible to tell which budget the user selected.<br>Options: "\$5K to \$10K", "\$10K to \$30K", "More than \$30K".<br>Actual request for each option: `PUT /v1/public/leads/{uuid}` with `budget: "2"`.<br>Expected: each option sends its own value | Wizard | API |
| BUG-12 | "Contact" step: an email entered with spaces around it is sent to `PUT /v1/public/leads/{uuid}` with the spaces (not trimmed) and the API accepts it with 200; the same untrimmed email is sent again together with the phone | Wizard | Validation |
| BUG-13 | Wizard: refreshing the page on any step (e.g. "Who should I prepare this estimate for?") returns the user to the landing page; all answers are lost and a new ZIP submit creates a new lead (to be confirmed: the expected behavior on refresh is not specified) | Wizard | Functional |
| BUG-14 | "Kitchen elements" step: "Sink(s) and faucet(s)" and "Backsplash" are sent as `"countertop"` in `updates` (`PUT /v1/public/leads/{uuid}`), so three different kitchen elements cannot be distinguished | Wizard | API |
| BUG-15 | Wizard: the browser "Back" button on any wizard step takes the user away from the site to the previous page; the wizard steps are not added to the browser history, so the progress is lost (to be confirmed: the expected behavior is not specified) | Wizard | Functional |

## Low

| ID | Title | Area | Type |
|---|---|---|---|
| BUG-16 | Typo "thay" instead of "they" in the "Trusted Manufacturers" advantage text: "…trusted providers so thay look and work great." | Landing | Content |
| BUG-17 | Typo "stogage" instead of "storage" in the image alt text of the "Storage Options" card (Remodeling Options section): `alt="Custom stogage organization"` | Landing | Accessibility |
| BUG-18 | Footer copyright shows a future year "© 2027." instead of the current year (2026) | Landing | Content |
| BUG-19 | Footer copyright notice has no copyright holder name: only "© 2027." is shown (expected e.g. "© 2026 HomeBuddy") | Landing | Content |
| BUG-20 | Footnote marker "[1]" next to "Materials warranty" has no corresponding footnote text; warranty terms are not shown anywhere on the page | Landing | Content |
| BUG-21 | Hero H1 shows a raw region code for a visitor outside the US: "…In The Lisbon, 11 Area?" (opened from Portugal); expected a region name or a generic fallback heading | Landing | Functional |
| BUG-22 | Middle ZIP form heading "What is your ZIP Code" is missing the question mark (the other two ZIP forms show "What is your ZIP Code?") | Landing | Content |
| BUG-23 | Unpaired opening quotation mark in the "People Gather Wherever There's Food" block: "The kitchen is ‘the heart of the home for a reason." | Landing | Content |
| BUG-24 | Wrong word "compliments" instead of "complements" in the image alt text of the "Island" card: `alt="Freestanding cabinet that matches your existing kitchen or compliments it"` | Landing | Accessibility |
| BUG-25 | Favicon is not displayed: `<link rel="icon">` points to non-existent files `favicon-32x32_non-existent.png` and `favicon-16x16_non-existent.png`; both requests fail with 502 Bad Gateway | Landing | UI |
| BUG-26 | Out-of-area screen (ZIP 51561): incomplete sentence "But if you’d like us to notify you when they are please enter your email address below." — a word is missing after "they are" (e.g. "available") and a comma is missing before "please" | Wizard | Content |
| BUG-27 | "What would you like to do with your kitchen cabinets?" step: the warning for "Repair/replace a few cabinets" has the wrong word order, "Would still you like to continue?" instead of "Would you still like to continue?" | Wizard | Content |
| BUG-28 | Uncaught JavaScript error "Cannot read properties of undefined (reading 'contractor')" is thrown in the console after submitting the "Who should I prepare this estimate for?" step (name + email); the next step opens normally | Wizard | JavaScript error |
| BUG-29 | "Kitchen size" step ("What is the approximate size of your kitchen in square feet?"): one click on "Next" sends the same request twice.<br>Actual: two identical `PUT /v1/public/leads/{uuid}` requests with `{"squareFeet": 150, "notSure": "no"}`.<br>Expected: one request | API | API |

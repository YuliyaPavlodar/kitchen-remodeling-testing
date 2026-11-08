# Regression Test Suite Structure

| # | Section | What it covers | Priority | Test cases |
|---|---|---|---|---|
| **1** | **Landing Page** | | | |
| 1.1 | Content & Layout | Header and hero section (H1 with the visitor's location), sections and texts, images and alt texts, photo gallery and reviews sliders, footer links and copyright, favicon | Medium | |
| 1.2 | ZIP Forms | Three ZIP forms (hero, middle, bottom), "Get estimate" and Enter key, ZIP validation (empty field, 4 or 6 digits, letters, etc.) | High | TC-02, TC-03 |
| **2** | **Wizard** | | | |
| 2.1 | General | Step order, "Next" button state, progress bar, close button, page refresh and browser "Back" | High | TC-01 |
| 2.2 | Kitchen elements | Multi-select options; warning when "Kitchen cabinets" is not selected ("Yes" / "No") | High | TC-05 |
| 2.3 | Cabinets work | Answer options; warning for "Repair/replace a few cabinets" | Medium | |
| 2.4 | Layout changes | Multi-select options; warnings | Medium | |
| 2.5 | Property type | Answer options; warning for a commercial property | Medium | |
| 2.6 | Mobile home | "Yes" / "No"; warning for "Yes" | Medium | |
| 2.7 | Homeowner | "Yes" / "No"; warning for "No" | Medium | |
| 2.8 | Kitchen size | Number input validation (letters, `0`, very large values, etc.), "Not sure" checkbox | Medium | |
| 2.9 | Budget | Budget options and "Not sure", warning for "Up to \$5K", "Next" button state | High | TC-06 |
| 2.10 | Name & Email | Required fields, email validation (no `@`, no domain, spaces around the address, etc.) | High | TC-07 |
| 2.11 | Phone | Phone validation (empty field, 9 digits, letters, etc.), confirmation dialog, consent text | High | TC-08 |
| 2.12 | Exit screen | "Sorry to see you go!" after "No" in a warning, links to other services | Low | |
| **3** | **Thank-You Page** | Entered name, matched contractor, page texts, lead status `SUBMITTED` | High | TC-09 |
| **4** | **Out-of-Area Flow** | ZIP without contractors, notification email validation (empty field, no `@`, etc.), saving the email, "Try another ZIP Code" | High | TC-04 |
| **5** | **Lead Submission & API** | Lead creation, saving answers at each step, phone check, submit (`POST /v1/public/leads`, `PUT /v1/public/leads/{uuid}`, `POST /v1/public/leads/{uuid}/submit`): status codes, sent data matches the user's answers, server-side validation (unknown lead ID, invalid `budget` value, etc.), error handling in the UI | High | |
| **6** | **Cross-browser & Responsive** | The main browsers most often used by customers. Mobile, tablet and desktop viewports: layout, no overlapping elements, numeric keyboard for ZIP and phone | Medium | TC-10 |
| **7** | **Monitoring & Performance** | No JavaScript errors in the console, no failed resources, errors reported to Sentry; page load time, API response time | Medium | |

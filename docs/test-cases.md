# Test Cases

| ID | Title | Section | Priority | Type | Automation candidate |
|---|---|---|---|---|---|
| [TC-01](#tc-01) | Submit a lead through the whole wizard with valid data (happy path) | 2.1 Wizard › General | High | Positive | Yes |
| [TC-02](#tc-02) | ZIP form rejects invalid and empty ZIP codes | 1.2 Landing Page › ZIP Forms | High | Negative | Yes |
| [TC-03](#tc-03) | Each of the three landing ZIP forms opens the wizard | 1.2 Landing Page › ZIP Forms | High | Positive | Yes |
| [TC-04](#tc-04) | Out-of-area ZIP: "no matching contractors" screen saves the email | 4 Out-of-Area Flow | High | Positive | No |
| [TC-05](#tc-05) | "Kitchen elements" step: warning when "Kitchen cabinets" is not selected | 2.2 Wizard › Kitchen elements | Medium | Positive | No |
| [TC-06](#tc-06) | "Budget" step: every budget option is saved with its own value | 2.9 Wizard › Budget | High | Positive | No |
| [TC-07](#tc-07) | "Contact" step: Full name and Email validation | 2.10 Wizard › Name & Email | High | Negative | No |
| [TC-08](#tc-08) | "Phone" step: validation and phone confirmation dialog | 2.11 Wizard › Phone | High | Negative | No |
| [TC-09](#tc-09) | Thank-you page shows the entered name and the matched contractor | 3 Thank-You Page | High | Positive | No (covered by TC-01) |
| [TC-10](#tc-10) | Landing page on a mobile viewport: bottom ZIP form works | 6 Cross-browser & Responsive | Medium | Positive | No |

---

## TC-01

**Submit a lead through the whole wizard with valid data (happy path)**

| Field | Value |
|---|---|
| **Section** | 2.1 Wizard › General |
| **Priority** | High |
| **Type** | Positive |
| **Automation candidate** | Yes |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | DevTools is open: Network tab (filter `api-test`) and Console tab |
| **Test data** | ZIP `10001` · Full name `Yuliya Test` · Email `y.test+tc01@example.com` · Phone `2125550123` |
| **Related bugs** | BUG-02, BUG-06, BUG-10, BUG-28 |

**On every step:** each API request returns a success status code (`2xx`), and there are no errors in the Console.

| # | Action | Expected result |
|---|---|---|
| 1 | Open https://hb-test.stage.sirenltd.dev/ | Landing page opens with the hero ZIP form "What is your ZIP Code?" |
| 2 | Enter ZIP `10001` in the hero form, click "Get estimate" | Step "Which elements of the kitchen would you like to update?" opens. `POST /v1/public/leads` → 201 with a lead `uuid` |
| 3 | Select "Kitchen cabinets", click "Next" | Step "What would you like to do with your kitchen cabinets?" opens, no warning |
| 4 | Select "Replace all or most cabinets", click "Next" | Step "What type of property is this?" opens |
| 5 | Select "Single family home", click "Next" | Step "Is it a mobile, modular or manufactured home?" opens |
| 6 | Select "No", click "Next" | Step "Are you the homeowner or authorized to make property changes?" opens |
| 7 | Select "Yes", click "Next" | Step "What is the approximate size of your kitchen in square feet?" opens |
| 8 | Enter `150`, click "Next" | Step "Do you know what your approximate budget is?" opens |
| 9 | Select "\$10K to \$30K", click "Next" | `PUT /v1/public/leads/{uuid}` with the budget → 2xx. Step "Who should I prepare this estimate for?" opens |
| 10 | Enter Full name and Email from the test data, click "Next" | Step "What is your phone number?" opens, progress bar shows 100%, TCPA consent text is shown under the button |
| 11 | Enter the phone, click "Submit my request" | Dialog "Please confirm your phone number." with "Edit phone number" and "Phone number is correct" is shown (the test number is fictional) |
| 12 | Click "Phone number is correct" | `POST /v1/public/leads/{uuid}/submit` → 200. Thank-you page opens: "Thank you Yuliya, your contractor … will call soon!" |

**Postconditions:** the lead has status `SUBMITTED` (`GET /v1/public/leads/{uuid}`).

---

## TC-02

**ZIP form rejects invalid and empty ZIP codes**

| Field | Value |
|---|---|
| **Section** | 1.2 Landing Page › ZIP Forms |
| **Priority** | High |
| **Type** | Negative |
| **Automation candidate** | Yes |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | Landing page is open, DevTools → Network is open (filter `api-test`) |
| **Test data** | `1234` · `123456` · `abcde` · `12 345` · empty |
| **Related bugs** | BUG-07 |

| # | Action | Expected result |
|---|---|---|
| 1 | Enter `1234` in the hero ZIP field, click "Get estimate" | Error "The ZIP Code must be 5 digits with no spaces" under the field, the field is highlighted. The wizard does not open, no `POST /v1/public/leads` |
| 2 | Repeat step 1 with `123456`, `abcde`, `12 345` | For each value: error "The ZIP Code must be 5 digits with no spaces" under the field, the field is highlighted. The wizard does not open, no `POST /v1/public/leads` |
| 3 | Reload the page, leave the hero ZIP field empty, click "Get estimate" | Error "The ZIP Code must be 5 digits with no spaces" under the field, the field is highlighted. The wizard does not open, no request is sent |

**Postconditions:** none.

---

## TC-03

**Each of the three landing ZIP forms opens the wizard**

| Field | Value |
|---|---|
| **Section** | 1.2 Landing Page › ZIP Forms |
| **Priority** | High |
| **Type** | Positive |
| **Automation candidate** | Yes |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | Landing page is open |
| **Test data** | ZIP `10001` |
| **Related bugs** | — |

| # | Action | Expected result |
|---|---|---|
| 1 | In the hero form enter `10001`, click "Get estimate" | Step "Which elements of the kitchen would you like to update?" opens |
| 2 | Reload the page. In the middle ZIP form enter `10001`, click "Get estimate" | Step "Which elements of the kitchen would you like to update?" opens |
| 3 | Reload the page. In the bottom ZIP form (above the footer) enter `10001`, click "Get estimate" | Step "Which elements of the kitchen would you like to update?" opens |
| 4 | Reload the page. In the hero form enter `10001` and press Enter | Step "Which elements of the kitchen would you like to update?" opens |

**Postconditions:** none.

---

## TC-04

**Out-of-area ZIP: "no matching contractors" screen saves the email**

| Field | Value |
|---|---|
| **Section** | 4 Out-of-Area Flow |
| **Priority** | High |
| **Type** | Positive |
| **Automation candidate** | No |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | Landing page is open, DevTools → Network is open (filter `api-test`) |
| **Test data** | ZIP `51561` (Pacific Junction, IA, no contractors) · Email `y.test+tc04@example.com` |
| **Related bugs** | BUG-26 |

| # | Action | Expected result |
|---|---|---|
| 1 | Enter `51561` in the hero form, click "Get estimate" | Screen "Unfortunately, I have no matching contractors in your area yet." with an "Email address" field and buttons "Try another ZIP Code" and "Submit". `POST /v1/public/leads` → 201, `isOutOfArea: true` |
| 2 | Enter `y.testexample.com`, click "Submit" | Email validation error, no request is sent |
| 3 | Enter the valid email, click "Submit" | "Thank you for your interest, we will contact you when our service becomes available in your area!" `PUT /v1/public/leads/{uuid}` → 2xx with the email |
| 4 | Repeat step 1, click "Try another ZIP Code" | The landing page opens |

**Postconditions:** none.

---

## TC-05

**"Kitchen elements" step: warning when "Kitchen cabinets" is not selected**

| Field | Value |
|---|---|
| **Section** | 2.2 Wizard › Kitchen elements |
| **Priority** | Medium |
| **Type** | Positive |
| **Automation candidate** | No |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | Wizard is opened with ZIP `10001` (step "Which elements of the kitchen would you like to update?") |
| **Test data** | — |
| **Related bugs** | — |

| # | Action | Expected result |
|---|---|---|
| 1 | Select "Lighting" and "Flooring", click "Next" | Warning "Our contractors only do projects including kitchen cabinets. Would you still like to continue?" with "No" and "Yes" |
| 2 | Click "No" | Exit screen "Sorry to see you go!" with "Check out the other services that we offer." |
| 3 | Open the wizard again with ZIP `10001`, repeat step 1, click "Yes" | Step "What would you like to do with your kitchen cabinets?" opens. `PUT /v1/public/leads/{uuid}` → 200 with `updates: ["lighting", "flooring"]` |
| 4 | Open the wizard again with ZIP `10001`, select "Kitchen cabinets", click "Next" | No warning, step "What would you like to do with your kitchen cabinets?" opens |

**Postconditions:** none.

---

## TC-06

**"Budget" step: every budget option is saved with its own value**

| Field | Value |
|---|---|
| **Section** | 2.9 Wizard › Budget |
| **Priority** | High |
| **Type** | Positive |
| **Automation candidate** | No |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | DevTools → Network is open (filter `api-test`)<br>1) Open the URL, enter ZIP `10001` in the hero form, click "Get estimate"<br>2) "Kitchen cabinets" → "Next"<br>3) "Replace all or most cabinets" → "Next"<br>4) "Single family home" → "Next"<br>5) "No" → "Next"<br>6) "Yes" → "Next"<br>7) Enter `150` → "Next" |
| **Test data** | "Up to \$5K" · "\$5K to \$10K" · "\$10K to \$30K" · "More than \$30K" · "Not sure" |
| **Related bugs** | BUG-02, BUG-08, BUG-11 |

| # | Action | Expected result |
|---|---|---|
| 1 | Check the "Next" button before selecting an option | "Next" is disabled |
| 2 | Select "Up to \$5K" | Warning "Unfortunately, a quality kitchen remodeling project requires a higher budget than you've entered. Would you still like to continue?" with "No" and "Yes" |
| 2a | Click "Yes" | `PUT /v1/public/leads/{uuid}` with `budget` → 2xx. Step "Who should I prepare this estimate for?" opens |
| 3 | Repeat steps 1–2 in a new lead for "\$5K to \$10K", "\$10K to \$30K", "More than \$30K" | Each option sends its **own** `budget` value, the API returns 2xx |
| 4 | In a new lead click "Not sure" | The option is selected, "Next" becomes enabled |
| 5 | Click "Next" | `PUT` with the "Not sure" budget value → 2xx, the next step opens |

**Postconditions:** none.

---

## TC-07

**"Contact" step: Full name and Email validation**

| Field | Value |
|---|---|
| **Section** | 2.10 Wizard › Name & Email |
| **Priority** | High |
| **Type** | Negative |
| **Automation candidate** | No |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | DevTools → Network is open (filter `api-test`)<br>1) Open the URL, enter ZIP `10001` in the hero form, click "Get estimate"<br>2) "Kitchen cabinets" → "Next"<br>3) "Replace all or most cabinets" → "Next"<br>4) "Single family home" → "Next"<br>5) "No" → "Next"<br>6) "Yes" → "Next"<br>7) Enter `150` → "Next"<br>8) "\$10K to \$30K" → "Next" |
| **Test data** | Name `Yuliya Test` · emails `y.testexample.com`, `y.test@`, `y.test@example`, ` y.test+tc07@example.com ` (spaces around), `y.test+tc07@example.com` |
| **Related bugs** | BUG-12 |

| # | Action | Expected result |
|---|---|---|
| 1 | Leave both fields empty, click "Next" | Required field errors under both fields, no `PUT` |
| 2 | Enter the name, enter `y.testexample.com`, click "Next" | Error that the email must be valid, no `PUT` |
| 3 | Repeat step 2 with `y.test@` and `y.test@example` | For each value: error that the email must be valid, no `PUT` |
| 4 | Enter ` y.test+tc07@example.com ` (spaces around), click "Next" | `PUT /v1/public/leads/{uuid}` → 200 with `email: "y.test+tc07@example.com"` (spaces trimmed). Step "What is your phone number?" opens |

**Postconditions:** none.

---

## TC-08

**"Phone" step: validation and phone confirmation dialog**

| Field | Value |
|---|---|
| **Section** | 2.11 Wizard › Phone |
| **Priority** | High |
| **Type** | Negative |
| **Automation candidate** | No |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | DevTools → Network is open (filter `api-test`)<br>1) Open the URL, enter ZIP `10001` in the hero form, click "Get estimate"<br>2) "Kitchen cabinets" → "Next"<br>3) "Replace all or most cabinets" → "Next"<br>4) "Single family home" → "Next"<br>5) "No" → "Next"<br>6) "Yes" → "Next"<br>7) Enter `150` → "Next"<br>8) "\$10K to \$30K" → "Next"<br>9) Full name `Yuliya Test`, Email `y.test+tc08@example.com` → "Next" |
| **Test data** | empty · `212555012` (9 digits) · `abc-def-ghij` · `2125550123` (fictional, reported as invalid by the phone check) |
| **Related bugs** | BUG-09 |

| # | Action | Expected result |
|---|---|---|
| 1 | Leave the field empty, click "Submit my request" | Required field error, no request is sent |
| 2 | Enter `212555012`, click "Submit my request" | Error about an invalid phone number, no request is sent |
| 3 | Enter `abc-def-ghij` | Letters are not accepted or an error is shown, no request is sent |
| 4 | Enter `2125550123`, click "Submit my request" | `GET /v1/public/leads/{uuid}/phone/2125550123/check` → 200 `isValid: false`. Dialog "Please confirm your phone number." / "Make sure the number you entered is correct." with "Edit phone number" and "Phone number is correct". The number is **not** saved in the lead before the user confirms it |
| 5 | Click "Edit phone number" | The dialog closes, the phone field shows `2125550123` and can be edited |
| 6 | Click "Submit my request" again, then "Phone number is correct" | `PUT` with `phoneNumber: "2125550123"` → 2xx, `POST /v1/public/leads/{uuid}/submit` → 200, the thank-you page opens |

**Postconditions:** the lead has status `SUBMITTED`.

---

## TC-09

**Thank-you page shows the entered name and the matched contractor**

| Field | Value |
|---|---|
| **Section** | 3 Thank-You Page |
| **Priority** | High |
| **Type** | Positive |
| **Automation candidate** | No (covered by TC-01) |
| **URL** | https://hb-test.stage.sirenltd.dev/thank-you |
| **Preconditions** | DevTools → Network is open (filter `api-test`)<br>1) Open https://hb-test.stage.sirenltd.dev/, enter ZIP `10001` in the hero form, click "Get estimate"<br>2) "Kitchen cabinets" → "Next"<br>3) "Replace all or most cabinets" → "Next"<br>4) "Single family home" → "Next"<br>5) "No" → "Next"<br>6) "Yes" → "Next"<br>7) Enter `150` → "Next"<br>8) "\$10K to \$30K" → "Next"<br>9) Full name `Yuliya Test`, Email `y.test+tc09@example.com` → "Next"<br>10) Phone `2125550123` → "Submit my request" → "Phone number is correct" |
| **Test data** | Full name `Yuliya Test` |
| **Related bugs** | BUG-10 |

| # | Action | Expected result |
|---|---|---|
| 1 | Check the response of `POST /v1/public/leads/{uuid}/submit` | 200, `campaign.contractor.companyName` is set (e.g. "QA company") |
| 2 | Check the heading of the thank-you page | "Thank you Yuliya, your contractor `<companyName from step 1>` will call soon!" — the entered name, not another one |
| 3 | Check the rest of the page | Texts "Please don't miss the call or the contractor won't be able to provide a free estimate!", "No-Obligation Appointment", "You’re In Control!" are shown |
| 4 | Check `GET /v1/public/leads/{uuid}` | `fullName: "Yuliya Test"`, `leadStatus: "SUBMITTED"` |

**Postconditions:** none.

---

## TC-10

**Landing page on a mobile viewport: bottom ZIP form works**

| Field | Value |
|---|---|
| **Section** | 6 Cross-browser & Responsive |
| **Priority** | Medium |
| **Type** | Positive |
| **Automation candidate** | No |
| **URL** | https://hb-test.stage.sirenltd.dev/ |
| **Preconditions** | Chrome DevTools → Device Toolbar, iPhone 12 Pro (390 × 844) or 375 × 812 |
| **Test data** | ZIP `10001` |
| **Related bugs** | BUG-04 |

| # | Action | Expected result |
|---|---|---|
| 1 | Open https://hb-test.stage.sirenltd.dev/ | Page fits the screen width, no horizontal scroll |
| 2 | Scroll through all sections down to the footer | Texts and images are not cut, elements don't overlap |
| 3 | In the bottom ZIP form enter `10001` and tap "Get estimate" | Nothing covers the button, the tap opens the wizard |

**Postconditions:** none.

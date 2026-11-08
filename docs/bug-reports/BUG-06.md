# BUG-06: Uncaught JavaScript error is thrown on every landing page load

| Field | Value                                                                                    |
|---|------------------------------------------------------------------------------------------|
| **ID** | BUG-06                                                                                   |
| **Type** | JavaScript error |
| **Severity** | Medium                                                                                   |
| **Priority** | Medium                                                                                   |
| **Component** | Landing page                                                                             |
| **Environment** | URL: https://hb-test.stage.sirenltd.dev/ · Chrome 151.0.7922.138 · macOS 14.7.4 (23H420) |
| **Reported** | 2026-11-07                                                                               |

## Preconditions

- Chrome DevTools is open on the **Console** tab.

## Steps to reproduce

1. Open https://hb-test.stage.sirenltd.dev/ (or reload the page if it is already open).
2. Look at the Console tab.

## Expected result

The page loads without JavaScript errors in the console.

## Actual result

An uncaught exception is logged on every page load:

```
Uncaught Error: This is a mistake, you can create a bug report on this.
    at a (https://hb-test.stage.sirenltd.dev/1.238ce47cde4bb679ca12.js:6:93936)
    at https://hb-test.stage.sirenltd.dev/1.238ce47cde4bb679ca12.js:81:9512
    at https://hb-test.stage.sirenltd.dev/1.238ce47cde4bb679ca12.js:81:9516
    at https://hb-test.stage.sirenltd.dev/1.238ce47cde4bb679ca12.js:81:9520
    at https://hb-test.stage.sirenltd.dev/1.238ce47cde4bb679ca12.js:81:9525
```

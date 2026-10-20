# ProjectOnBoard

Playwright test framework for the SauceDemo application.

## Setup

```bash
npm ci
npx playwright install chromium
```

## Run tests

```bash
npx playwright test
```

The HTML report is generated in `playwright-report/` and can be opened with:

```bash
npx playwright show-report
```

Test plans are in `TestPlan/`, and test specifications are in `tests/`.

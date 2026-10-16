# Exchange — Frontend Prototype

A multi-page cryptocurrency-exchange demo built with plain HTML, CSS, and JavaScript. It uses an original Exchange visual identity and common exchange UI patterns. It is not affiliated with Binance.

## Project structure

```text
Exchange/
├── index.html
├── markets.html
├── trade.html
├── earn.html
├── wallet.html
├── login.html
├── register.html
├── support.html
├── about.html
├── css/
│   ├── style.css
│   └── pages.css
├── js/
│   ├── script.js
│   └── pages.js
├── scripts/
│   └── validate-project.mjs
├── README.md
└── PROJECT_STATUS.md
```

## Run locally

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Start VS Code Live Server from `index.html`, or open `index.html` directly in a modern browser.
4. Navigate using the shared page menus.

No package installation or build step is required. Node.js is only needed to run the optional static validator.

## Validate the project

From the repository root, run:

```bash
node scripts/validate-project.mjs
```

The validator checks expected pages, local HTML file references, JavaScript syntax, and CSS brace balance. It is a static smoke check; it does not replace visual browser testing, accessibility testing, or a security audit.

## Pages and demo features

- **Home:** hero, sample market cards/table, sparklines, asset filters, favorites, search, theme toggle.
- **Markets:** searchable sample coin table and gainers/decliners filters.
- **Spot trade:** order-entry layout, selected pair from URL, quantity × price calculation, simulated-only Buy/Sell feedback.
- **Earn:** informational product concept cards; no APR or real investment products.
- **Wallet:** placeholder balances and transaction history.
- **Login / Register:** client-side demo forms only.
- **Help Center:** FAQ and a non-submitting demo support form.
- **About:** project scope and production requirements.

## Completion status

The frontend demo feature scope is implemented. The status report distinguishes implemented demo features from browser QA and production readiness. See [PROJECT_STATUS.md](PROJECT_STATUS.md) for the completion meter and remaining release checks.

## Important limitations

This is **frontend-only**. Prices, volumes, order book values, charts, and balances are sample/demo data and are not real-time. Login and registration do not create accounts; orders are not transmitted; no deposits, withdrawals, wallet custody, or real-money trading are implemented. Do not enter real passwords or send crypto to this project.

Before production, this project needs a secure backend, verified market data, authentication/session management, exchange integration, order validation, wallet security, rate limiting, monitoring, tests, legal/compliance review, and a security audit.

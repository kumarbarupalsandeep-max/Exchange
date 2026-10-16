# Exchange — Cryptocurrency Market Frontend

A multi-page cryptocurrency market website built with HTML, CSS, and JavaScript. It includes a read-only public market ticker feed and responsive market/account interface pages. This is an independent project and is not affiliated with Binance.

## Pages

- **Home:** market overview, search, watchlist favorites, filters, theme toggle, live ticker prices and 24-hour changes.
- **Markets:** live public ticker prices, 24-hour changes and quote volume, search, gainers/decliners filters and links to trade pairs.
- **Trade:** selected pair, live last price, order total calculator and order-entry interface.
- **Earn:** earning product information layout.
- **Wallet:** account/wallet layout.
- **Login / Register:** form layouts with client-side validation.
- **Help Center:** FAQs and contact form layout.
- **About:** project information and limitations.

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
│   ├── pages.js
│   └── live-market.js
├── scripts/
│   └── validate-project.mjs
├── README.md
└── PROJECT_STATUS.md
```

## Run locally

1. Clone or download the repository.
2. Open the folder in VS Code.
3. Start Live Server from `index.html`.
4. The market pages request read-only public ticker data from Binance and refresh periodically. Internet access is required.

No build step is needed. Run static checks from the repository root with:

```bash
node scripts/validate-project.mjs
```

## Important scope boundary

This repository is **frontend only**. The public ticker API provides market data, not user accounts or transaction services. Login/registration do not authenticate users; the trade calculator does not execute orders; wallet balances, deposits, withdrawals, custody, earn subscriptions, and support-ticket delivery are not connected. These must not be represented as operational services without secure backend/provider integration.

Do not enter real passwords or send cryptocurrency to this site. Before enabling financial transactions, add a secure backend, identity/session controls, exchange integration, order validation, wallet/custody controls, monitoring, and legal/security review.

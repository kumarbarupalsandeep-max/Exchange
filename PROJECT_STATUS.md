# Exchange — Project Status

Last updated: 2026-10-16

## Completion meter

**100% means the agreed frontend-demo feature scope is implemented, not that this is a production cryptocurrency exchange.** Percentages below are manual scope estimates, not test coverage.

- Frontend demo feature scope: **100% implemented**
- Required pages and folder organization: **100%**
- Main navigation and core demo interactions: **100% implemented**
- Repeatable static validation script: **Added** — run it locally before release
- Manual static checks previously completed: JavaScript syntax, CSS brace balance, and local HTML references
- Browser QA at desktop/tablet/mobile: **Not yet verified**
- Live market API: **0%**
- Backend / database: **0%**
- Authentication and account security: **0%**
- Real exchange orders / wallet / deposits / withdrawals: **0%**

```text
Frontend demo feature scope       [████████████████████] 100%
Production exchange readiness     [█████░░░░░░░░░░░░░░░] ~25% (rough planning estimate)
Browser QA                        [░░░░░░░░░░░░░░░░░░░░] Not verified
```

The frontend demo scope is implemented, but browser QA is still required before calling the website release-verified. The production-readiness estimate is a rough planning figure, not a claim that a secure or deployable exchange exists.

## Implemented in the frontend

- [x] Home page with sample market cards/table, search, filters, favorites, and theme toggle
- [x] Markets page with searchable sample coin table and gainers/decliners filters
- [x] Spot trading UI with selected market pair and quantity × price calculation
- [x] Simulated-only Buy/Sell feedback; clearly warns that orders are not sent
- [x] Earn informational page
- [x] Wallet placeholder with empty transaction state
- [x] Login and registration demo forms with clear backend-not-connected messaging
- [x] Help Center / FAQ / demo contact form with clear not-sent messaging
- [x] About page and project limitation notes
- [x] CSS assets grouped under `css/`
- [x] JavaScript assets grouped under `js/`
- [x] HTML asset paths updated for folders
- [x] Fixed homepage JavaScript references to removed CTA IDs
- [x] Market Trade actions pass the selected symbol to the trade page
- [x] README and project status documentation
- [x] Added dependency-free static validator at `scripts/validate-project.mjs`

## Final release checks

- [x] JavaScript syntax checked previously
- [x] CSS brace balance checked previously
- [x] Local HTML references checked previously
- [x] Added repeatable static smoke-check script
- [ ] Run `node scripts/validate-project.mjs` locally and resolve any reported failures
- [ ] Open the site in a browser and test desktop, tablet, and mobile layouts
- [ ] Verify keyboard navigation, focus states, form feedback, and all links in a browser
- [ ] Confirm GitHub Pages deployment and test the published URL if deployment is desired

## Production work (separate phase)

- [ ] Select a market-data provider and show timestamps / stale-data state
- [ ] Design backend, database schema, and API contracts
- [ ] Implement secure authentication, session expiry, MFA and account recovery
- [ ] Integrate a sandbox exchange API and validate orders server-side
- [ ] Implement audited wallet/deposit/withdrawal flows only after security review
- [ ] Add rate limiting, logging, monitoring, secrets management and incident response
- [ ] Complete applicable legal, regulatory, privacy, and security reviews

Do not use this demo for financial decisions or real transactions.

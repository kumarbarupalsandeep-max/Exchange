(function () {
  "use strict";
  const pages = [
    ["convert","Convert Crypto","Preview an asset conversion using live public market prices."],
    ["buy-crypto","Buy Crypto","Review a purchase flow and supported payment-method layout."],
    ["p2p","P2P Marketplace","Filter illustrative peer-to-peer offers. No trades are executed."],
    ["futures","Futures Trading","Explore a derivatives order ticket with a risk warning."],
    ["orders","Open Orders","Review the open-orders interface. No account orders are connected."],
    ["order-history","Order History","Review order history filters and the empty account state."],
    ["deposit","Deposit Crypto","Choose an asset and network to see safety guidance."],
    ["withdraw","Withdraw Crypto","Review withdrawal fields and a network checklist."],
    ["transfer","Internal Transfer","Preview transfers between Spot and Funding wallets."],
    ["profile","Profile","Review profile fields and preferences."],
    ["security","Security Center","Review account protection settings and security checklist."],
    ["verification","Identity Verification","Review identity verification steps and requirements."],
    ["rewards","Rewards Hub","Browse learning and participation reward categories."],
    ["launchpool","Launchpool","Explore launch pool concepts and project information."],
    ["trading-bots","Trading Bots","Configure a local grid strategy preview."],
    ["copy-trading","Copy Trading","Compare illustrative strategies and risk information."],
    ["academy","Academy","Explore beginner-friendly crypto learning topics."],
    ["news","Market News","Read market context and risk-aware editorial notes."],
    ["announcements","Announcements","Review product and security notice categories."],
    ["referral","Referral Program","Preview referral information; tracking is not connected."],
    ["portfolio","Portfolio","Review portfolio layout; no account balance is connected."],
    ["transactions","Transaction History","Review the transaction history layout and filters."],
    ["api-management","API Management","Review API key safety guidance; no keys are created."],
    ["help-center","Help Center","Search common help topics."]
  ];
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const current = document.body.dataset.page || "platform";
  const config = pages.find(p => p[0] === current);
  const title = $("platformTitle"), desc = $("platformDescription"), content = $("platformContent");
  const nav = $("platformNav");
  if (nav) nav.innerHTML = '<a href="index.html">Home</a><a href="markets.html">Markets</a><a href="trade.html">Trade</a><a href="platform.html">All features</a><a href="wallet.html">Wallet</a><a href="support.html">Support</a>';
  function card(t,d,action) { return '<article class="platform-card"><h3>'+esc(t)+'</h3><p>'+esc(d)+'</p>'+(action||'')+'</article>'; }
  function table(headers, rows, empty) {
    return '<div class="platform-table-wrap"><table class="platform-table"><thead><tr>'+headers.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+(rows.length?rows.map(r=>'<tr>'+r.map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join(''):'<tr><td colspan="'+headers.length+'" class="muted">'+esc(empty||"No connected account data available.")+'</td></tr>')+'</tbody></table></div>';
  }
  function form(fields,button) {
    return '<form class="platform-form" id="localForm">'+fields.map(f=>'<label>'+esc(f.label)+(f.type==="select"?'<select name="'+esc(f.name)+'" '+(f.required?'required':'')+'>'+f.options.map(o=>'<option value="'+esc(o)+'">'+esc(o)+'</option>').join('')+'</select>':'<input name="'+esc(f.name)+'" type="'+(f.type||'text')+'" placeholder="'+esc(f.placeholder||f.label)+'" '+(f.min!==undefined?'min="'+f.min+'"':'')+' '+(f.step?'step="'+f.step+'"':'')+' '+(f.required?'required':'')+'/>')+'</label>').join('')+'<button class="platform-btn" type="submit">'+esc(button)+'</button><p id="formMessage" class="muted" aria-live="polite"></p></form>';
  }
  function featureList() {
    return '<label>Search features<input id="featureSearch" class="platform-search" type="search" placeholder="Search trading, wallet, account…"/></label><div class="platform-grid" id="featureGrid">'+pages.map(p=>card(p[1],p[2],'<a href="'+p[0]+'.html">Open feature →</a>')).join('')+'</div>';
  }
  if (!title || !desc || !content) return;
  if (current === "platform") {
    title.textContent = "Explore the Exchange platform";
    desc.textContent = "Browse all market, trading, wallet, account, and learning screens. This project is a frontend; financial actions require secure services.";
    content.innerHTML = featureList();
    const search = $("featureSearch"), grid = $("featureGrid");
    search.addEventListener("input", () => { const q=search.value.toLowerCase(); grid.innerHTML=pages.filter(p=>(p[1]+" "+p[2]).toLowerCase().includes(q)).map(p=>card(p[1],p[2],'<a href="'+p[0]+'.html">Open feature →</a>')).join('') || '<p class="muted">No matching feature found.</p>'; });
    return;
  }
  title.textContent = config ? config[1] : "Exchange Feature";
  desc.textContent = config ? config[2] : "Explore platform tools and account information.";
  const safeNote = card("Live-service status","This page does not submit orders, move money, create accounts, or change account settings. Connect a secure backend before using real funds.","<span class='muted'>Frontend only · No private keys or credentials should be entered.</span>");
  let body = "";
  const assetOptions = ["BTC","ETH","USDT","BNB","SOL","XRP"];
  const pairOptions = ["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","XRPUSDT"];
  if (current === "convert") {
    body = card("Conversion quote preview","Enter an amount to calculate an indicative conversion from public market prices. This is not an executable quote.",form([{label:"From asset",name:"from",type:"select",options:assetOptions},{label:"To asset",name:"to",type:"select",options:assetOptions},{label:"Amount",name:"amount",type:"number",placeholder:"0.00",min:"0",step:"any",required:true}],"Calculate preview")) + card("Quote result",'A market quote will be calculated when supported public price data is available. Network fees and execution slippage are not included.','<div id="quoteResult" class="platform-stat" aria-live="polite">Choose assets and calculate</div>');
  } else if (current === "buy-crypto") {
    body = card("Purchase flow preview","Review fiat and crypto selections. Payment availability, fees, and final purchase require a verified payment provider.",form([{label:"Fiat currency",name:"fiat",type:"select",options:["INR","USD","EUR"]},{label:"Crypto asset",name:"asset",type:"select",options:assetOptions},{label:"Purchase amount",name:"amount",type:"number",placeholder:"100",min:"1",step:"any",required:true},{label:"Payment method",name:"payment",type:"select",options:["Choose payment method","Bank transfer","UPI (provider integration required)","Card (provider integration required)"]}],"Preview purchase"));
  } else if (current === "p2p") {
    body = card("P2P offer filters","Sample rows are clearly marked as illustrative and are not verified sellers or current offers.",form([{label:"Asset",name:"asset",type:"select",options:["USDT","BTC","ETH"]},{label:"Trade side",name:"side",type:"select",options:["Buy","Sell"]},{label:"Payment method",name:"payment",type:"select",options:["Any method","Bank transfer","UPI","PayPal"]}],"Apply local filters")) + card("Offer list","Demo data only — no trade can be started.",'<p id="p2pStatus" class="muted" aria-live="polite">Showing illustrative examples, not live offers.</p><div id="p2pOffers"></div>');
  } else if (current === "futures") {
    body = card("Futures order ticket","Simulation only. Leverage can amplify losses and liquidation risk.",form([{label:"Contract",name:"pair",type:"select",options:["BTCUSDT Perpetual","ETHUSDT Perpetual","SOLUSDT Perpetual"]},{label:"Side",name:"side",type:"select",options:["Buy / Long","Sell / Short"]},{label:"Order type",name:"type",type:"select",options:["Market","Limit"]},{label:"Quantity",name:"qty",type:"number",placeholder:"0.001",min:"0",step:"any",required:true},{label:"Leverage",name:"leverage",type:"select",options:["1x","2x","3x","5x","10x"]}],"Preview simulated order")) + card("Risk checklist","Understand liquidation price, margin mode, funding fees, and position size before trading.","<span class='muted'>No real futures exchange is connected.</span>");
  } else if (current === "deposit") {
    body = card("Deposit asset selection","This tool will never generate a fake deposit address. Only a trusted wallet backend can issue a valid address.",form([{label:"Asset",name:"asset",type:"select",options:assetOptions},{label:"Network",name:"network",type:"select",options:["Select network carefully","Bitcoin","Ethereum (ERC-20)","BNB Smart Chain (BEP-20)","Solana","TRON (TRC-20)"]}],"Show safety checklist")) + card("Before depositing","Confirm the asset and network match exactly. Sending funds on an unsupported network may cause permanent loss.","<a href='support.html'>Read support guidance →</a>");
  } else if (current === "withdraw") {
    body = card("Withdrawal request preview","Do not submit real wallet details here. A real withdrawal needs authentication, risk checks, network fee calculation, and server-side confirmation.",form([{label:"Asset",name:"asset",type:"select",options:assetOptions},{label:"Network",name:"network",type:"select",options:["Select network","Bitcoin","Ethereum (ERC-20)","BNB Smart Chain (BEP-20)","Solana","TRON (TRC-20)"]},{label:"Destination address",name:"address",placeholder:"Preview only — do not use a real address",required:true},{label:"Amount",name:"amount",type:"number",placeholder:"0.00",min:"0",step:"any",required:true}],"Validate local form")) + card("Security checklist","Verify destination address, chain, fees, minimum withdrawal, and allowlist requirements before any real transfer.");
  } else if (current === "transfer") {
    body = card("Internal transfer preview","Preview the direction and amount; no wallet balance is read or changed.",form([{label:"From wallet",name:"from",type:"select",options:["Spot","Funding"]},{label:"To wallet",name:"to",type:"select",options:["Funding","Spot"]},{label:"Asset",name:"asset",type:"select",options:assetOptions},{label:"Amount",name:"amount",type:"number",placeholder:"0.00",min:"0",step:"any",required:true}],"Preview transfer"));
  } else if (current === "trading-bots") {
    body = card("Grid bot configuration","A local configuration preview only. No strategy will be deployed and no order will be sent.",form([{label:"Trading pair",name:"pair",type:"select",options:pairOptions},{label:"Lower price",name:"low",type:"number",placeholder:"60000",min:"0",step:"any",required:true},{label:"Upper price",name:"high",type:"number",placeholder:"70000",min:"0",step:"any",required:true},{label:"Grid count",name:"grids",type:"number",placeholder:"10",min:"2",step:"1",required:true}],"Validate strategy"));
  } else if (current === "referral") {
    body = card("Referral program","Referral links, eligibility, attribution, and rewards need authenticated server-side tracking.",form([{label:"Your referral code (optional)",name:"code",placeholder:"Preview only"}],"Preview referral link"));
  } else if (current === "orders" || current === "order-history" || current === "transactions") {
    const heading = current === "orders" ? "Open orders" : current === "order-history" ? "Order history" : "Transaction history";
    body = card(heading,"No exchange account is connected, so no personal activity can be shown.",'<label>Filter by asset or pair<input id="activityFilter" class="platform-search" type="search" placeholder="e.g. BTC or USDT"/></label><div id="activityTable">'+table(["Date","Asset / pair","Type","Status","Amount"],[],"No account records available.")+'</div>');
  } else if (current === "portfolio") {
    body = '<div class="platform-grid">'+card("Total portfolio value","Not connected to an account.",'<div class="platform-stat">—</div><p class="muted">USDT equivalent</p>')+card("Asset allocation","No balances are loaded.",'<div class="platform-progress"><span style="width:0%"></span></div><p class="muted">Connect a secure account service to display allocation.</p>')+card("Watch markets","Public market prices are available separately.",'<a href="markets.html">View markets →</a>')+'</div>'+card("Holdings", "Personal balances are not available in this frontend.",table(["Asset","Available","In orders","Value"],[]));
  } else if (current === "profile" || current === "security" || current === "verification" || current === "api-management") {
    const sets = {
      profile:[["Display name","Editable after sign-in"],["Email address","Private account service required"],["Preferences","Local UI only"],["Sessions","Server-side management required"]],
      security:[["Email verification","Backend required"],["Two-factor authentication","Not connected"],["Device and sessions","Backend required"],["Anti-phishing code","Backend required"],["Withdrawal allowlist","Backend required"]],
      verification:[["Identity details","Not started"],["Identity document","Secure upload provider required"],["Liveness check","Provider required"],["Review status","Unavailable"]],
      "api-management":[["Create API key","Not available"],["IP allowlist","Recommended"],["Read-only permissions","Use least privilege"],["Secret storage","Never expose secrets in browser code"]]
    };
    body = card("Account checklist","These controls are informational until secure authentication and server-side account management are implemented.",table(["Setting","Status"],sets[current])) + card("Account protection","Never share passwords, seed phrases, private keys, recovery codes, or API secrets.","<span class='muted'>No account changes can be saved here.</span>");
    if(current==="profile") body += card("Preference preview","Choose a display currency and theme preference locally.",form([{label:"Display currency",name:"currency",type:"select",options:["USDT","USD","INR","EUR"]},{label:"Theme",name:"theme",type:"select",options:["Dark","Light","System"]}],"Save local preview"));
  } else if (current === "help-center") {
    body = card("Search support topics","Search common product and safety questions.",'<label>Search topics<input id="helpSearch" class="platform-search" type="search" placeholder="Try deposits, security, orders…"/></label><div id="helpResults" class="platform-grid"></div>') + card("Common questions","Are orders real? No. Can I deposit funds? No. Is the market feed an execution quote? No, it is public market information.",'<a href="support.html">Contact support →</a>');
  } else {
    const collection = {
      academy: {
        intro: "A structured learning path from first principles to safer platform use.",
        cards: [["01 · Crypto basics","What a blockchain is, how tokens differ, and why prices fluctuate."],["02 · Wallets and networks","Understand public addresses, confirmations, network fees, and seed-phrase safety."],["03 · Trading essentials","Learn market vs limit orders, spread, liquidity, and slippage."],["04 · Risk management","Position sizing, diversification, volatility, and avoiding leverage traps."]],
        rows: [["Beginner","Blockchain and tokens","10 min"],["Beginner","Wallet and network safety","12 min"],["Intermediate","Order types and liquidity","15 min"],["Intermediate","Risk and position sizing","14 min"]]
      },
      news: {
        intro: "Market context and educational notes. This is not a live newsroom or investment recommendation.",
        cards: [["Market pulse","Use the Markets screen for current public ticker values; verify prices independently."],["Volatility watch","Large moves can be accompanied by wider spreads, thinner liquidity, and higher slippage."],["Research checklist","Check primary sources, token supply, liquidity, security history, and conflicts of interest."],["Risk reminder","News and social posts may be inaccurate, promotional, or already priced into markets."]],
        rows: [["Market data","Public ticker values","Open Markets"],["Risk education","Volatility and liquidity","Read guidance"],["Due diligence","Verify primary sources","Use checklist"]]
      },
      announcements: {
        intro: "A notice board layout for product, maintenance, and security updates. No official live announcement feed is connected.",
        cards: [["Product updates","Release notes will appear here after an authenticated publishing source is integrated."],["Maintenance notices","Scheduled downtime and service incidents need an operational status feed."],["Security advisories","Use only verified official channels. Never trust unsolicited messages asking for seed phrases."],["Market data status","Public data may be delayed or unavailable due to provider/network limits."]],
        rows: [["Product","Feature releases","Feed not connected"],["Operations","Maintenance windows","Feed not connected"],["Security","Verified advisories","Feed not connected"]]
      },
      rewards: {
        intro: "A rewards dashboard layout. Balances, eligibility, campaigns, and payouts are not connected to an account service.",
        cards: [["Learning rewards","Illustrative task: finish the wallet-safety lesson. No reward is issued."],["Campaign participation","Campaign eligibility and regional restrictions must be checked server-side."],["Referral rewards","Referral attribution and payout status require secure account tracking."],["Reward safety","Never pay an upfront fee or reveal recovery phrases to claim a reward."]],
        rows: [["Learn","Complete safety lesson","Preview only"],["Campaigns","Review eligibility","Not connected"],["Referral","Invite tracking","Not connected"]]
      },
      launchpool: {
        intro: "Explore how token launch pools are commonly presented. Project data and staking are illustrative only.",
        cards: [["Project overview","Review token purpose, tokenomics, distribution, unlock schedule, and official documentation."],["Pool participation","A real pool requires authenticated balances, eligibility checks, and audited reward calculations."],["Lock-up and redemption","Understand subscription windows, lock periods, settlement, and redemption rules."],["Risk checklist","Token prices may fall; participation is not a guaranteed return and may be region-restricted."]],
        rows: [["Project details","Tokenomics and docs","Provider required"],["Pool terms","Lock-up and rewards","Provider required"],["My participation","Personal allocations","Sign-in required"]]
      },
      "copy-trading": {
        intro: "Compare strategy concepts without implying verified trader performance. Copying a strategy can lose money.",
        cards: [["Lower-turnover approach","Evaluate maximum drawdown, trade frequency, leverage, and time horizon."],["Momentum approach","Trend-following may suffer during choppy markets and sudden reversals."],["Portfolio controls","Set exposure caps, loss limits, and a clear stop-copying rule before allocating."],["Performance due diligence","Check verified track records, fees, survivorship bias, and whether results are audited."]],
        rows: [["Strategy profile","Risk metrics","Not live"],["Trade history","Verified performance","Not connected"],["Allocation","Exposure controls","Preview only"]]
      }
    };
    const page = collection[current];
    if (page) {
      body = '<div class="platform-note">'+esc(page.intro)+'</div><div class="platform-grid">'+page.cards.map((x,i)=>card(x[0],x[1],'<span class="muted">Guide '+(i+1)+' · informational</span>')).join('')+'</div>'+card("Page overview","A clearer summary of the sections and data this screen is designed to show.",table(["Section","What it contains","Availability"],page.rows,"No data available.")) + card("Next step","Explore related screens or review the project overview before using any real financial service.",'<div class="platform-links"><a href="markets.html">View markets →</a><a href="support.html">Support →</a><a href="about.html">About Exchange →</a></div>');
    } else {
      body = '<div class="platform-grid">'+[["Overview","This feature needs a verified data source and service integration."],["How it works","Review the process, fees, limits, and risks before using a financial service."],["Security","Never share passwords, recovery phrases, private keys, or API secrets."],["Service status","This is a frontend preview; no account or financial service is connected."]].map((x,i)=>card(x[0],x[1],'<span class="muted">Section '+(i+1)+'</span>')).join('')+'</div>'+card("Related pages","Use these links to navigate the platform.",'<div class="platform-links"><a href="markets.html">Markets →</a><a href="trade.html">Trade →</a><a href="wallet.html">Wallet →</a><a href="support.html">Support →</a></div>');
    }

  content.innerHTML = body + safeNote + '<div class="platform-links">'+pages.map(p=>'<a href="'+p[0]+'.html">'+esc(p[1])+'</a>').join('')+'</div><div class="platform-footer">Exchange frontend · No real orders, wallet transfers, authentication, or account changes are performed here.</div>';
  const formEl = $("localForm");
  if (formEl) formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formEl).entries());
    const out = $("formMessage");
    if (!out) return;
    if (current==="trading-bots" && !(Number(data.low)>0 && Number(data.high)>Number(data.low) && Number(data.grids)>=2)) { out.textContent="Please set a positive lower price, a higher upper price, and at least 2 grids."; return; }
    if (current==="transfer" && data.from===data.to) { out.textContent="Choose two different wallets for the preview."; return; }
    if (["convert","buy-crypto","withdraw","transfer"].includes(current) && !(Number(data.amount)>0)) { out.textContent="Enter an amount greater than zero."; return; }
    if (current==="convert" && data.from===data.to) { out.textContent="Choose two different assets."; return; }
    if (current==="referral") { out.textContent="Local preview only. No referral code or tracking link was generated."; return; }
    if (current==="convert") {
      out.textContent="Fetching public price data for quote preview…";
      try {
        const symbols=[data.from+"USDT",data.to+"USDT"];
        const prices={};
        await Promise.all([...new Set(symbols.filter(s=>s!=="USDTUSDT"))].map(async s=>{const r=await fetch("https://api.binance.com/api/v3/ticker/price?symbol="+encodeURIComponent(s));if(!r.ok)throw Error("price unavailable");const j=await r.json();prices[s]=Number(j.price);}));
        const fromUsd=data.from==="USDT"?1:prices[data.from+"USDT"];
        const toUsd=data.to==="USDT"?1:prices[data.to+"USDT"];
        if(!fromUsd||!toUsd)throw Error("pair unavailable");
        const qty=Number(data.amount)*fromUsd/toUsd;
        out.textContent="Indicative estimate: "+qty.toLocaleString(undefined,{maximumFractionDigits:8})+" "+data.to+". Excludes fees/slippage; not an executable quote.";
      } catch(_) { out.textContent="Public price quote unavailable right now. No transaction was sent."; }
      return;
    }
    if (current==="trading-bots") out.textContent="Configuration valid. This is a local preview only; the bot was not started.";
    else if (current==="deposit") out.textContent="Safety checklist displayed: use only a deposit address issued by a verified backend. No address was generated.";
    else if (current==="withdraw") out.textContent="Form fields validated locally. No address was saved and no withdrawal was submitted.";
    else if (current==="futures") out.textContent="Simulated order preview only. No futures order was submitted.";
    else if (current==="buy-crypto") out.textContent="Purchase form preview only. No payment was initiated.";
    else if (current==="p2p") out.textContent="Local filters applied conceptually. No seller listings or trades are connected.";
    else if (current==="transfer") out.textContent="Transfer fields validated locally. No balances were changed.";
    else if (current==="profile") out.textContent="Preference preview only. Nothing was saved to an account.";
    else out.textContent="Preview complete. No server request or transaction was sent.";
  });
  const help = $("helpSearch");
  if (help) {
    const out=$("helpResults"), topics=[
      ["Account security","Use a unique password, enable two-factor authentication, and never share recovery codes."],
      ["Deposits and withdrawals","Always verify asset and network; this frontend cannot issue addresses or process withdrawals."],
      ["Trading orders","Market orders prioritize execution; limit orders specify a price. This site does not execute orders."],
      ["Market data","Public ticker prices can be delayed or unavailable and are not guaranteed execution quotes."],
      ["Identity verification","Real verification requires a trusted provider and secure document handling."],
      ["Fees and limits","Fees and limits must be supplied by a verified service; no live fee schedule is connected."],
      ["Network selection","The sending and receiving networks must match or funds may be lost."],
      ["API key safety","Never place API secrets in frontend code. Use least-privilege scopes and IP restrictions."]
    ];
    const render=()=>{const matches=topics.filter(t=>(t[0]+" "+t[1]).toLowerCase().includes(help.value.toLowerCase()));out.innerHTML=matches.map(t=>card(t[0],t[1],'<a href="support.html">Contact support →</a>')).join('')||'<p class="muted">No matching topics. Try a different keyword or contact support.</p>';};
    help.addEventListener("input",render);render();
  }
  if (current === "p2p") {
    const offers=[
      {asset:"USDT",side:"Buy",payment:"UPI",price:"₹83.10",limits:"₹1,000–₹25,000"},
      {asset:"USDT",side:"Buy",payment:"Bank transfer",price:"₹83.25",limits:"₹5,000–₹75,000"},
      {asset:"BTC",side:"Buy",payment:"Bank transfer",price:"Illustrative only",limits:"₹2,000–₹50,000"},
      {asset:"ETH",side:"Sell",payment:"UPI",price:"Illustrative only",limits:"₹1,000–₹20,000"},
      {asset:"USDT",side:"Sell",payment:"PayPal",price:"Illustrative only",limits:"₹2,000–₹30,000"}
    ];
    const formEl=$("localForm"), target=$("p2pOffers"), status=$("p2pStatus");
    const renderOffers=(asset="USDT",side="Buy",payment="Any method")=>{
      const matches=offers.filter(o=>o.asset===asset&&o.side===side&&(payment==="Any method"||o.payment===payment));
      target.innerHTML=matches.length?table(["Asset","Side","Payment","Indicative price","Limits","Label"],matches.map(o=>[o.asset,o.side,o.payment,o.price,o.limits,"DEMO — NOT LIVE"])):'<p class="muted">No illustrative rows match these filters.</p>';
      status.textContent="Showing "+matches.length+" illustrative row(s). Not a live marketplace; no seller is verified and no trade can be started.";
    };
    if(formEl)formEl.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(formEl).entries());renderOffers(d.asset,d.side,d.payment);});
    renderOffers();
  }
  const filter=$("activityFilter");
  if(filter)filter.addEventListener("input",()=>{const box=$("activityTable");box.innerHTML=table(["Date","Asset / pair","Type","Status","Amount"],[],"No connected account records available. Search cannot reveal personal transactions until a secure account service is connected.");});
})();
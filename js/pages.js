const marketCoins=[
 {n:"Bitcoin",s:"BTC",p:0,c:0,v:"—",cap:"—"},
 {n:"Ethereum",s:"ETH",p:0,c:0,v:"—",cap:"—"},
 {n:"Solana",s:"SOL",p:0,c:0,v:"—",cap:"—"},
 {n:"BNB",s:"BNB",p:0,c:0,v:"—",cap:"—"},
 {n:"XRP",s:"XRP",p:0,c:0,v:"—",cap:"—"},
 {n:"Cardano",s:"ADA",p:0,c:0,v:"—",cap:"—"},
 {n:"Dogecoin",s:"DOGE",p:0,c:0,v:"—",cap:"—"},
 {n:"Avalanche",s:"AVAX",p:0,c:0,v:"—",cap:"—"},
 {n:"Chainlink",s:"LINK",p:0,c:0,v:"—",cap:"—"},
 {n:"Polkadot",s:"DOT",p:0,c:0,v:"—",cap:"—"},
 {n:"Litecoin",s:"LTC",p:0,c:0,v:"—",cap:"—"},
 {n:"TRON",s:"TRX",p:0,c:0,v:"—",cap:"—"}
];
let activeFilter="all";
const quote=(n)=>!Number.isFinite(n)?"—":n<1?"$"+n.toFixed(4):"$"+n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
function renderMarkets(){
 const body=document.querySelector("#marketRows");if(!body)return;
 const q=(document.querySelector("#marketSearch")?.value||"").toLowerCase();
 const rows=marketCoins.filter(c=>(c.n+" "+c.s).toLowerCase().includes(q)&&(activeFilter==="all"||activeFilter==="gainers"&&c.c>0||activeFilter==="losers"&&c.c<0)).map(c=>'<tr><td><div class="coin"><span class="coin-icon">'+c.s[0]+'</span><span><b>'+c.n+'</b><small>'+c.s+'</small></span></div></td><td>'+quote(c.p)+'</td><td class="'+(c.c>=0?"up":"down")+'">'+(c.c>0?"+":"")+c.c.toFixed(2)+'%</td><td>'+c.v+'</td><td>'+c.cap+'</td><td><a class="btn" href="trade.html?coin='+c.s+'">Trade</a></td></tr>').join("");
 body.innerHTML=rows||'<tr><td colspan="6">No matching assets found.</td></tr>';
}
async function refreshMarkets(){
 try{
  const symbols=marketCoins.map(c=>c.s+"USDT");
  const response=await fetch("https://api.binance.com/api/v3/ticker/24hr?symbols="+encodeURIComponent(JSON.stringify(symbols)),{cache:"no-store"});
  if(!response.ok)throw new Error("Market API HTTP "+response.status);
  const tickers=await response.json();const map=new Map(tickers.map(t=>[t.symbol,t]));
  marketCoins.forEach(c=>{const t=map.get(c.s+"USDT");if(t){c.p=Number(t.lastPrice);c.c=Number(t.priceChangePercent);c.v="$"+(Number(t.quoteVolume)/1e6).toLocaleString("en-US",{maximumFractionDigits:1})+"M";c.cap="—";}});
  const status=document.querySelector("#marketDataStatus");if(status)status.textContent="Live prices from public market feed · updated "+new Date().toLocaleTimeString();
 }catch(e){const status=document.querySelector("#marketDataStatus");if(status)status.textContent="Live market feed unavailable. Check connection and retry shortly.";console.warn(e);}
 renderMarkets();
}
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll(".menu-toggle").forEach(b=>b.addEventListener("click",()=>document.querySelector(".nav")?.classList.toggle("open")));
 document.querySelector("#marketSearch")?.addEventListener("input",renderMarkets);
 document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));renderMarkets()}));
 const coin=new URLSearchParams(location.search).get("coin");const select=document.querySelector("#tradeCoin");
 if(select&&coin&&[...select.options].some(o=>o.value===coin))select.value=coin;
 const price=document.querySelector("#tradePrice"),qty=document.querySelector("#tradeQty"),total=document.querySelector("#tradeTotal");
 function calc(){if(price&&qty&&total)total.value=((Number(price.value)||0)*(Number(qty.value)||0)).toFixed(2);}
 [price,qty].forEach(x=>x?.addEventListener("input",calc));
 async function refreshTradePrice(){
  if(!select||!price)return;
  try{const r=await fetch("https://api.binance.com/api/v3/ticker/price?symbol="+encodeURIComponent(select.value+"USDT"),{cache:"no-store"});if(!r.ok)throw new Error("Ticker unavailable");const data=await r.json();price.value=Number(data.price).toPrecision(12).replace(/\.?0+$/,"");calc();const label=document.querySelector("#tradeLiveStatus");if(label)label.textContent="Live last price · "+new Date().toLocaleTimeString();}
  catch(e){const label=document.querySelector("#tradeLiveStatus");if(label)label.textContent="Live price unavailable; you can still edit the price field.";}
 }
 select?.addEventListener("change",refreshTradePrice);
 if(select&&price){refreshTradePrice();window.setInterval(refreshTradePrice,15000);}
 calc();
 document.querySelectorAll(".tabs button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("active",x===b));if(b.textContent.toLowerCase().includes("market")&&select)refreshTradePrice();}));
 document.querySelectorAll("[data-demo-form]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();const out=f.querySelector(".success");if(out)out.textContent=f.dataset.demoForm==="auth"?"This frontend cannot create or verify accounts without an authentication service. No credentials were sent.":f.dataset.demoForm==="support"?"This frontend cannot deliver support tickets without a support service. Your message was not sent.":"No order was submitted. Connect a secure trading service to enable execution."; }));
 document.querySelectorAll("[data-demo-action]").forEach(b=>b.addEventListener("click",()=>{const out=document.querySelector("#tradeMessage");if(out)out.textContent="Order preview only: no order was transmitted. Real execution requires a secure server-side trading integration."; }));
 renderMarkets();refreshMarkets();window.setInterval(refreshMarkets,30000);
});
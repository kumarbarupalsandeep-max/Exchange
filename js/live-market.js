/* Public market data only: no API key is required for these read-only ticker requests. */
(function () {
  "use strict";
  const endpoint = "https://api.binance.com/api/v3/ticker/24hr";
  const symbols = ["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","XRPUSDT","ADAUSDT","DOGEUSDT","AVAXUSDT","LINKUSDT","DOTUSDT","LTCUSDT","TRXUSDT"];
  const fmt = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return "—";
    return n < 1 ? "$" + n.toFixed(4) : "$" + n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
  };
  async function load() {
    try {
      const response = await fetch(endpoint + "?symbols=" + encodeURIComponent(JSON.stringify(symbols)), {cache:"no-store"});
      if (!response.ok) throw new Error("Market provider returned " + response.status);
      const data = await response.json();
      const bySymbol = new Map(data.map(x => [x.symbol,x]));
      document.querySelectorAll("[data-live-symbol]").forEach(node => {
        const ticker = bySymbol.get(node.dataset.liveSymbol + "USDT");
        if (ticker) node.textContent = fmt(ticker.lastPrice);
      });
      document.querySelectorAll("[data-live-change]").forEach(node => {
        const ticker = bySymbol.get(node.dataset.liveChange + "USDT");
        if (ticker) {
          const change = Number(ticker.priceChangePercent);
          node.textContent = (change > 0 ? "+" : "") + change.toFixed(2) + "%";
          node.classList.toggle("up", change >= 0);
          node.classList.toggle("down", change < 0);
        }
      });
      document.querySelectorAll("[data-live-volume]").forEach(node => {
        const ticker = bySymbol.get(node.dataset.liveVolume + "USDT");
        if (ticker) node.textContent = "$" + (Number(ticker.quoteVolume)/1e6).toLocaleString("en-US",{maximumFractionDigits:1}) + "M";
      });
      document.querySelectorAll("[data-live-status]").forEach(node => node.textContent = "Live market feed · updated " + new Date().toLocaleTimeString());
      document.querySelectorAll("[data-live-fallback]").forEach(node => node.hidden = true);
    } catch (error) {
      document.querySelectorAll("[data-live-status]").forEach(node => node.textContent = "Market feed temporarily unavailable · retrying automatically");
      console.warn("Public market data unavailable; showing the page's last available values.", error);
    }
  }
  load();
  window.setInterval(load, 30000);
})();
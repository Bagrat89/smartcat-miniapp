export async function convertCrypto() {
  const amount = parseFloat(document.getElementById('crypto-amount').value) || 1;
  const from = document.getElementById('crypto-from').value;
  const to = document.getElementById('crypto-to').value;
  const result = document.getElementById('crypto-result');
  result.textContent = 'Загрузка...';
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`);
    const data = await res.json();
    const rate = data[from][to];
    result.textContent = `${amount} → ${(amount * rate).toFixed(2)} ${to.toUpperCase()}`;
  } catch {
    result.textContent = 'Ошибка загрузки курса';
  }
}

export async function loadCryptoRates() {
  const ids = 'bitcoin,ethereum,tether,solana,the-open-network';
  const container = document.getElementById('crypto-rates');
  container.innerHTML = '<div style="color:#888;text-align:center;">Загрузка...</div>';
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await res.json();
    const labels = { bitcoin: 'BTC', ethereum: 'ETH', tether: 'USDT', solana: 'SOL', 'the-open-network': 'TON' };
    container.innerHTML = Object.entries(data).map(([id, val]) =>
      `<div style="padding:8px;border-radius:8px;border:1px solid #00f0ff;text-align:center;">
        <div style="color:#00f0ff;font-weight:bold;">${labels[id]}</div>
        <div style="color:#fff;">$${val.usd.toLocaleString()}</div>
      </div>`
    ).join('');
  } catch {
    container.innerHTML = '<div style="color:#f00;">Ошибка загрузки</div>';
  }
}

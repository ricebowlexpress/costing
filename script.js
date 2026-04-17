const elements = {
  cogs: document.getElementById("cogs"),
  grossProfit: document.getElementById("gross-profit"),
  sellingPrice: document.getElementById("selling-price"),
  totalCost: document.getElementById("total-cost"),
  profitAmount: document.getElementById("profit-amount"),
  profitMargin: document.getElementById("profit-margin"),
  priceWithTax: document.getElementById("price-with-tax"),
  note: document.getElementById("calculation-note")
};

function readNumber(input) {
  const value = Number.parseFloat(input.value);
  return Number.isFinite(value) ? value : 0;
}

function formatMoney(value) {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

function calculatePrice() {
  const cogs = readNumber(elements.cogs);
  const grossProfitPercent = Math.min(readNumber(elements.grossProfit), 99.99);

  const sellingPrice = grossProfitPercent >= 100 ? cogs : cogs / (1 - grossProfitPercent / 100);
  const profitAmount = sellingPrice - cogs;
  const costCoverageRatio = cogs > 0 ? sellingPrice / cogs : 0;

  elements.totalCost.textContent = formatMoney(cogs);
  elements.sellingPrice.textContent = formatMoney(sellingPrice);
  elements.profitAmount.textContent = formatMoney(profitAmount);
  elements.profitMargin.textContent = formatPercent(grossProfitPercent);
  elements.priceWithTax.textContent = `${costCoverageRatio.toFixed(2)}x`;
  elements.note.textContent = `To earn a gross profit of ${formatPercent(grossProfitPercent)}, the suggested selling price is ${formatMoney(sellingPrice)} based on your COGS.`;
}

document.getElementById("price-form").addEventListener("input", calculatePrice);
calculatePrice();

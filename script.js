const elements = {
  cogs: document.getElementById("cogs"),
  grossProfit: document.getElementById("gross-profit"),
  sellingPrice: document.getElementById("selling-price"),
  totalCost: document.getElementById("total-cost"),
  profitAmount: document.getElementById("profit-amount"),
  profitMargin: document.getElementById("profit-margin"),
  priceWithTax: document.getElementById("price-with-tax"),
  note: document.getElementById("calculation-note"),
  rental: document.getElementById("rental"),
  salary: document.getElementById("salary"),
  waterBill: document.getElementById("water-bill"),
  electricalBill: document.getElementById("electrical-bill"),
  deliveryCharge: document.getElementById("delivery-charge"),
  miscellaneous: document.getElementById("miscellaneous"),
  foodCost: document.getElementById("food-cost"),
  opexTotal: document.getElementById("opex-total"),
  breakevenPoint: document.getElementById("breakeven-point"),
  foodCostDisplay: document.getElementById("food-cost-display"),
  breakevenMealsMonth: document.getElementById("breakeven-meals-month"),
  breakevenMealsDay: document.getElementById("breakeven-meals-day"),
  opexNote: document.getElementById("opex-note")
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

function formatNumber(value) {
  return value.toFixed(2);
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

function calculateOpex() {
  const rental = readNumber(elements.rental);
  const salary = readNumber(elements.salary);
  const waterBill = readNumber(elements.waterBill);
  const electricalBill = readNumber(elements.electricalBill);
  const deliveryCharge = readNumber(elements.deliveryCharge);
  const miscellaneous = readNumber(elements.miscellaneous);
  const foodCostPercent = Math.min(readNumber(elements.foodCost), 99.99);

  const opex =
    rental +
    salary +
    waterBill +
    electricalBill +
    deliveryCharge +
    miscellaneous;
  const foodCostRatio = foodCostPercent / 100;
  const breakevenPoint = foodCostRatio >= 1 ? 0 : opex / (1 - foodCostRatio);
  const breakevenMealsMonth = breakevenPoint / 15;
  const breakevenMealsDay = breakevenMealsMonth / 30;

  elements.opexTotal.textContent = formatMoney(opex);
  elements.breakevenPoint.textContent = formatMoney(breakevenPoint);
  elements.foodCostDisplay.textContent = formatPercent(foodCostPercent);
  elements.breakevenMealsMonth.textContent = formatNumber(breakevenMealsMonth);
  elements.breakevenMealsDay.textContent = formatNumber(breakevenMealsDay);
  elements.opexNote.textContent = `With OPEX of ${formatMoney(opex)} and food cost of ${formatPercent(foodCostPercent)}, your breakeven point is ${formatMoney(breakevenPoint)}. At an average meal price of RM15, you need about ${formatNumber(breakevenMealsDay)} meals per day.`;
}

document.getElementById("price-form").addEventListener("input", calculatePrice);
document.getElementById("opex-form").addEventListener("input", calculateOpex);
calculatePrice();
calculateOpex();

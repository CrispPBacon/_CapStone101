export function formatCurrency(amount: number, currency = "PHP") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function shortCurrency(value: number, currencySymbol = "₱"): string {
  if (Math.abs(value) < 1000) {
    return `${value < 0 ? "-" : ""}${currencySymbol}${Math.abs(value)}`; // Handle negative small numbers
  }

  const units = ["", "K", "M", "B", "T"]; // Thousand, Million, Billion, Trillion
  const order = Math.floor(Math.log10(Math.abs(value)) / 3); // Determine the order of magnitude
  const unitName = units[order] || ""; // Get the corresponding unit
  const num = Math.abs(value) / Math.pow(1000, order); // Scale down the number

  return `${value < 0 ? "-" : ""}${currencySymbol}${num.toFixed(2)}${unitName}`; // Include negative sign if needed
}

// export function shortCurrency(value: number, currencySymbol = "₱"): string {
//   if (value < 1000) {
//     return `${currencySymbol}${value}`; // No abbreviation for numbers below 1,000
//   }

//   const units = ["", "K", "M", "B", "T"]; // Thousand, Million, Billion, Trillion
//   const order = Math.floor(Math.log10(value) / 3); // Determine the order of magnitude
//   const unitName = units[order] || ""; // Get the corresponding unit
//   const num = value / Math.pow(1000, order); // Scale down the number

//   return `${currencySymbol}${num.toFixed(2)}${unitName}`; // Format with 2 decimal places
// }

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr", // Added April
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

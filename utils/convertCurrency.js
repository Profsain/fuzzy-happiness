// currencyConverter.js
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    // Fetch the exchange rates
    const response = await fetch(`${BASE_URL}${fromCurrency}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    const rates = data.conversion_rates;

    // Check if the target currency is available
    if (!rates[toCurrency]) {
      throw new Error(`Conversion rate for ${toCurrency} not available`);
    }

    // Perform the conversion
    const rate = rates[toCurrency];
    const convertedAmount = amount * rate;
    return convertedAmount;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

export default convertCurrency;

// Usage
// const main = async () => {
//   const amount = 100; // Amount to convert
//   const fromCurrency = 'USD'; // Source currency
//   const toCurrency = 'EUR'; // Target currency

//   const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
//   if (convertedAmount !== null) {
//     console.log(`${amount} ${fromCurrency} is ${convertedAmount.toFixed(2)} ${toCurrency}`);
//   }
// };


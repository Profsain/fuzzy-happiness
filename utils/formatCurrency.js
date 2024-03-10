function formatCurrency(amount, currency) {
    // Convert amount to number if it's not already
    amount = parseFloat(amount);

    // Check if amount is a valid number
    if (isNaN(amount)) {
        return "Invalid amount";
    }

    // Use toLocaleString to format the number as currency
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: currency
    });
}
 export default formatCurrency;
// Example usage:
// const formattedAmount = formatCurrency(1234.56);
// console.log(formattedAmount); // Output: $1,234.56

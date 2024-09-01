// Used to verify a transaction using the transaction ID
const verifyTransaction = async (transactionId) => {
     // base URL
  const baseUrl = process.env.BASE_URL;
    try {
        const response = await fetch(`${baseUrl}/flw-api/verify-transaction/${transactionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            },
        });

        return response.json();
    } catch (error) {
        console.error(error);
    }
    
}

export default verifyTransaction;
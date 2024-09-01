// Function to calculate receivedAmount and pendingAmount
const calculateRequestMoney = (moneyRequests) => {
  let receivedAmount = 0;
  let pendingAmount = 0;

    // check if moneyRequests is not empty
    if (!moneyRequests) {
      return { receivedAmount, pendingAmount };
    }

  moneyRequests?.forEach(request => {
    if (request.status === 'accepted') {
      receivedAmount += request.amount;
    } else if (request.status === 'pending') {
      pendingAmount += request.amount;
    }
  });

  return { receivedAmount, pendingAmount };
};

export default calculateRequestMoney
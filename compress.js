const compress = (transactions) => {
  const counterpartyMap = {};

  // building counterpartyMap
  transactions.forEach((transaction) => {
    if (transaction.counterparty in counterpartyMap) {
      counterpartyMap[transaction.counterparty] += transaction.amount;
    } else {
      counterpartyMap[transaction.counterparty] = transaction.amount;
    }
  });

  // building compressed transactions from the counterpartyMap
  const compressedTransactions = [];
  for (const counterpartyKey in counterpartyMap) {
    const counterpartyAmount = counterpartyMap[counterpartyKey];
    compressedTransactions.push({
      tradingParty: "me",
      counterparty: counterpartyKey,
      amount: counterpartyAmount,
    });
  }

  return compressedTransactions;
};

module.exports = compress;

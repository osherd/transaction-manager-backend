const express = require("express");
const json2csv = require("json2csv");
const db = require("./db");
const compress = require("./compress");

const TRANSACTION_FIELDS = [
  {
    label: "Trading Party",
    value: "tradingParty",
  },
  {
    label: "Counter Party",
    value: "counterparty",
  },
  {
    label: "Amount",
    value: "amount",
  },
];

const transactionsRouter = express.Router();

transactionsRouter.get("/", (req, res) => {
  const transactions = db.get("transactions").value();
  res.json(transactions);
});

transactionsRouter.post("/", (req, res) => {
  const transaction = req.body;

  const addedTransaction = db
    .get("transactions")
    .push(transaction)
    .last()
    .assign({ id: Date.now() })
    .write();
  res.json(addedTransaction);
});

transactionsRouter.get("/compressed", (req, res) => {
  const transactions = db.get("transactions").value();

  const compressedTransactions = compress(transactions);

  const json2csvParser = new json2csv.Parser({ fields: TRANSACTION_FIELDS });
  const csv = json2csvParser.parse(compressedTransactions);
  res.header("Content-Type", "text/csv");
  res.attachment("compressedTransactions.csv");
  return res.send(csv);
});

module.exports = transactionsRouter;

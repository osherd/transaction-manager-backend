const express = require("express");
const transactionsRouter = require("./transactions-router");

const PORT = 8080;
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use("/api/transactions", transactionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

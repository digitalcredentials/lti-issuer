const Canvas = require("./canvas");

const Data = {};

Data.getAccounts = () => Canvas.get("/accounts");

module.exports = Data;

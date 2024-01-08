const mongoose = require("mongoose");

//create a new schema by taking three infos: name and the address, symbol
const tokenSchema = new mongoose.Schema({
    name: String,
    address: String,
    symbol:String,
})

const Token = mongoose.model("Token", tokenSchema);

//export the module:
module.exports = Token;
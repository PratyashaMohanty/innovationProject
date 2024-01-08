const mongoose = require("mongoose");

//create a new schema by taking two infos: privatekey and the address
const accountSchema = new mongoose.Schema({
    privateKey: String,
    address: String,
})

const Account = mongoose.model("Account", accountSchema);

//export the module:
module.exports = Account;
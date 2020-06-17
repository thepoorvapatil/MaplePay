var mongoose            = require("mongoose"),
passportLocalMongoose   = require("passport-local-mongoose");

var formSchema = new mongoose.Schema({
    paymentmethod: String,
    orderof: String,
    orderissuedw: String,
    callbackperformed: Date,
    personcalledback: String,
    namecalledback: String,
    intsructingperson: String,
    debitacc: String,
    currency: String,
    amount: String,
    valuedate: Date,
    benaccno: String,
    benname: String,
    benadd: String,
    benbankcode: String,
    benbankname: String,
    benbankadd: String,
    paymentpurpose: String,
    message: String,
    verifiermssg: String
});

formSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Form", formSchema);
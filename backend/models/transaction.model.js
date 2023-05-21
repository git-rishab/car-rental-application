const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    transactions:{
        type:Array,
        default:[]
    }
},{
    versionKey:false
})

const TransactionModel = mongoose.model("transaction",transactionSchema);

module.exports = {
    TransactionModel
}
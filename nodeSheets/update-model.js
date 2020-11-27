const mongoose = require('mongoose')

const updateSchema = new mongoose.Schema({
    date:{type:Date, required:true},
    tests:{type:Number, required:true},
    positives:{type:Number, required:true},
    percentage:{type:String, required:true},
    deaths:{type:Number, required:true},
    totalCases:{type:Number, required:true},
    totalRecovered:{type:Number, required:true},
    totalDeaths:{type:Number, required:true}
})

const Update = mongoose.model('Update', updateSchema);

module.exports = Update;
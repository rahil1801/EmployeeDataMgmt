const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    position:{
        type:String,
        required:true
    },
    dateOfJoining:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Employee", employeeSchema);
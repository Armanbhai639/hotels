const mongoose=require('mongoose');
const personSchema=new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum:['chef', 'waiter', 'manager'],
        require:true
    },
    mobille:{
        type: Number,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        require:true
    }
});
const person=mongoose.model('person', personSchema);
module.exports=person;
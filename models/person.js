const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
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
    mobile:{
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
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true  
    }
});

personSchema.pre('save', async function(next){
        const person=this;
        //hash the password only if it has been modified or new record
        if(!person.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(person.password, salt);
        person.password=hashpassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const person=mongoose.model('person', personSchema);
module.exports=person;
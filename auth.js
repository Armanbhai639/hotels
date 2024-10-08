const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const person=require('./models/person');
//authentication
passport.use(new localStrategy(async(USERNAME, PASSWORD, done)=>{
    // authenticate logic here
    try{
        // console.log('Received Credential', USERNAME, PASSWORD);
        const user=await person.findOne({username:USERNAME});
        if(!user)
            return done(null, false, {message: 'Incorrect Username'});
        // const isPasswordMatch=user.password==PASSWORD?true:false;
        const isPasswordMatch=await user.comparePassword(PASSWORD);
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect Password'});
        }
    }catch(err){
        return done(err);
    }
}))
module.exports=passport;
const db = require('./dbcon');
const express = require('express');
require('dotenv').config();
const app = express();
const passport=require('./auth');


const PORT=process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());



//middleware function
const logRequest=(req, res, next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);



// app.get('/', logRequest, (req, res) => {
    app.get('/', (req, res) => {
        res.send("Hey arman your server is start how i can help you!");
    })
    
    
    const personRouter=require('./routers/personRouter');
    const menuRouter=require('./routers/menurouter');
    


    const localauthmiddleware =passport.authenticate('local', {session:false});
    app.use(passport.initialize());
    app.use('/person', localauthmiddleware, personRouter);
    app.use('/menuitem', menuRouter); 



    app.listen(PORT, () => {
        console.log("http://localhost:3000");
    }); 
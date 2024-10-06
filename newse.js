const express = require('express');
const app = express();


const db = require('./dbcon');


const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Hey arman your server is start how i can help you!");
})


const personRouter=require('./routers/personRouter');
const menuRouter=require('./routers/menurouter');

app.use('/person', personRouter);
app.use('/menuitem', menuRouter); 


app.listen(3000, () => {
    console.log("http://localhost:3000");
});
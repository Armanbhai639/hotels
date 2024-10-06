const express = require('express');
require('dotenv').config();
const app = express();


const db = require('./dbcon');

const PORT=process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Hey arman your server is start how i can help you!");
})


const personRouter=require('./routers/personRouter');
const menuRouter=require('./routers/menurouter');

app.use('/person', personRouter);
app.use('/menuitem', menuRouter); 


app.listen(PORT, () => {
    console.log("http://localhost:3000");
}); 
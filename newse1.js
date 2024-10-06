const express = require('express');
const app = express();
const db = require('./dbcon');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// const menu = require('./models/menuitem');
const menuitem = require('./models/menuitem');

app.get('/', (req, res) => {
    res.send("Hey hey heyarman your server is start how i can help you!");
})

const menuRouter=require('./routers/menurouter');
app.use('/menuitem', menuRouter); 


app.listen(3000, () => {
    console.log("http://localhost:3000");
});
//Git is working and hub updated
const express=require('express');
const app=express();

app.get('/', function (req, res) {
    res.send('Hey Arman HOw i can help you');
});
app.get('/lalipop', function (req, res) {
    res.send('Sure sir! do you want to eat lalipop');
});

app.get('/chicken', (req, res)=>{
    var chickens={
        name: 'murgaa_tanduri',
        is_grabii: true,
        is_dry: false
    }
    res.send(chickens);
    // res.send("Sure sir can i serv the chicken");
})

app.listen(3000, ()=>{
    console.log("Server is runing.. on 3000port");
});
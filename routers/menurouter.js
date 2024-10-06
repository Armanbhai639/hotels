const express=require('express');
const router=express.Router();
const menuitem = require('./../models/menuitem');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newmenu = new menuitem(data); // newPerson.name=data.name;
        const response = await newmenu.save();
        console.log('menu saved successfully');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//get data with
router.get('/', async (req, res)=>{
    try{
        const data= await menuitem.find();
        console.log('menu fetch successfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/:testType', async(req, res)=>{
    try{
        const testType=req.params.testType;
        if(testType=='spicy' || testType=='sour' || testType=='sweet'){
            const response=await menuitem.find({test: testType});
            console.log('response fetched');
            res.status(200).json(response);
            
        }else{
            res.status(404).json({error:'Invalid WordType'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports=router;
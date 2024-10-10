const express=require('express');
const router=express.Router();
const person = require('./../models/person');
const {jwtAuthMiddlewere, generateToken}=require('./../jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data); // newPerson.name=data.name;
        const response = await newPerson.save();
        console.log('data saved successfully');

        const payload={
            id:response.id,
            username:response.username
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload);
        console.log("Token is :",token);
        res.status(200).json({response:response, token:token});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//login route
router.post('/login', async(req, res)=>{
    try{
        const {username, password}=req.body;
        const user=await person.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid Username and Password'});
        }
        //generate token 
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);
        res.json({token})
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})


//get data with
router.get('/',jwtAuthMiddlewere, async (req, res)=>{
    try{
        const data= await person.find();
        console.log('data fetch successfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/profile',jwtAuthMiddlewere, async(req, res)=>{
    try{
        const userData=req.user;
        console.log("user data", userData);

        const userId=userData.id;
        const user=await person.findById(userId);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/:workTypee', async(req, res)=>{
    try{
        const workType=req.params.workTypee;
        if(workType=='chef' || workType=='waiter' || workType=='manager'){
            const response=await person.find({work: workType});
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

router.put('/:id', async(req, res)=>{
    try{
        const personID= req.params.id;
        const updatepersondata=req.body;
        const response=await person.findByIdAndUpdate(personID, updatepersondata,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:'Person Not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        const personID= req.params.id;
        const response=await person.findByIdAndDelete(personID);
        if(!response){
            return res.status(404).json({error: 'person not found'});
        }
        console.log('Person deleted successfully!');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports=router;
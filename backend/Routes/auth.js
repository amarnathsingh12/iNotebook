const express = require('express');
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { query, validationResult, body } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "amar is a good boy";

// Route 1 -> create a user using : POST"/api/auth/createuser". no login required
router.post('/createuser', [
    body('name').isLength({min: 5}),
    body('password').isLength({min: 5}),
    body('email').isEmail()
], async(req, res) =>{
    let success = false;
    // if there are errors,return bad request and the errors
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) {
        return res.send(`He, ${req.query.person}!`);
    }
//    console.log(result)
    try{
         // check whether the user with this email exists already
    let user =  await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: 'sorry user with this email already exist'})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    // create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
   success = true;
    res.json({success, authToken})
    // catch errors
    } catch(error){
        console.log(error.message);
        res.status(500).send("internal server occur");
    }
})



//Route 2 ->  Authentication a user using : POST"/api/auth/createuser". no login required
router.post('/login',[ 
    body('email').isEmail(),
    body('password').exists(),
], async(req, res) =>{
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send(`H, ${req.query.person}!`);
    }

    // extract email and password
    const{email, password} = req.body;

    try{
        let user = await User.findOne({email});
            if(!user){
                success = false;
                return res.status(400).json({error: 'pls try an auth'});
            }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if(!passwordcompare){
            success = false;
            return res.status(400).json({error: 'pls try as auth'});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken})

    } catch(error){
        console.error(error.message);
        res.status(500).send("internal server occur");
    }
})


//Route 3 ->  Authentication a user using : POST"/api/auth/getuser". login required
router.post('/getuser',fetchuser, async(req, res) =>{

try {
    userId = req.user.id;
    console.log(userId)
    console.log("first")
    const user = await User.findById(userId).select("-email")
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server occur");
}
})


module.exports = router
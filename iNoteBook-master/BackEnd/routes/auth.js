const express = require('express');
const User = require('../models/User');
const { body , validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');
const JWT_Secret = 'iamrkishnaandiam@good$$'
var fetchuser = require('../middleware/fetchuser')


// cretae a new user at api of api/auth/createUser 
router.post('/createUser',[
    //Give Validation detials
    body('email', 'Enter a valid email').isEmail(), 
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
    body('name', 'Enter a valid name').isLength({ min: 3 })
],async (req, res) => {
        //check validations and if eroor occur return error
    const errors = validationResult(req);
    let success = false
     if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });

    }
    try {
        
// check weather user with email exixst or not 
    
    let user = await User.findOne({ email: req.body.email })
    if(user){
        return res.status(400).json({success, error: 'Sorry a user with this email already exists'})
    }
//Create a secure password
    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password, salt)
    //Create a new User
    user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword
    })
    //Show user detials

     
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_Secret)
    success = true
    //Return token to the client side
    res.send({ success,authToken})
    // res.send(user)

    } catch (error) {
            console.log(error.message)
            res.status(500).send("some error occured")
    }
})


// Authenticate user using api/auth/login

router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password','Plaease enter valid password').exists()
],async (req, res) => {
      //check validations and if eroor occur return error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

     const {name,email, password} = req.body;
     let success = false
     try {
        let user =await User.findOne({email})
        if(!user){
            return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }
        const data = {
            user:{
                id: user.id
            }
        }
        success = true
        const authToken = jwt.sign(data, JWT_Secret)
        //Return token to the client side
        res.send({success, authToken})

     } catch (error) {
        console.log(error.message)
            res.status(500).send("Interal server error occured")
     }
})



//ROUTER 3 : Get user details using api/auth/getuser

router.post('/getuser',fetchuser,async (req, res) => {
    try {
        userId = req.user.id
        const user =await User.findById(userId).select("-password")
        res.send(user)
        
    } catch (error) {
        console.log(error.message)
            res.status(500).send("Interal server error occured")
    }
})

module.exports = router

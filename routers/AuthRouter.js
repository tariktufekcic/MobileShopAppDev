const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async ({body}, res) => {
    try {
        const {username, password} = body || {};
        if(!username || !password) return res.status(400).send("Missing login data...")
            const existingUser = await userModel.findOne({username, password});
        if(!existingUser) return res.status(400).send("User not found.");

        const token = jwt.sign({id: existingUser._id}, "ITA");
        
        res.send({
            token,
            
                username: existingUser.username,
                userId: existingUser._id
            
        })
    } catch (error) {
        res.status(400).send(error?.message || "Something went wrong!")
    }
});

router.post('/registration', async ({ body }, res) => {
    try {
      const { username, email, password } = body || {};
      if (!username || !email || !password) return res.status(400).send("Missing registration data...");
  
      
      const existingUser = await userModel.findOne({ username });
      if (existingUser) return res.status(400).send("User already exists.");
  
      
      const newUser = new userModel({
        username,
        email,
        password
      });
  
      
      await newUser.save();
  
      
      const token = jwt.sign({ id: newUser._id }, "ITA");
  
      
      res.send({
        token,
        username: newUser.username,
        userId: newUser._id
      });
    } catch (error) {
      res.status(400).send(error?.message || "Something went wrong!");
    }
  });

module.exports = router;
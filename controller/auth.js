const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const user = require('../models/User');
const SALT = Number(process.env.SALT);

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


router.post('/user', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        console.log(firstName, lastName, email, password);

        const newUser = new user({
            firstName,
            lastName,
            email,
            password: bcryptjs.hashSync(password, SALT)
        });

        await newUser.save();
        const token = jwt.sign({id: newUser._id}, JWT_SECRET, {expiresIn: '1h'});
        console.log(token);

        res.status(201).json({
            message: 'User created successfully',
            newUser,
            token
        });

    } catch (error) {
        logError(error);
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
);

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        let foundUser = await user.find({email});
        if(!foundUser.length) throw error('User not found');

        const ifFound = await bcryptjs.compare(password, foundUser[0].password);
        console.log(ifFound);

        if(!ifFound) throw error('Incorrect password');

        const token = jwt.sign({id: ifFound._id}, JWT_SECRET, {expiresIn: '1h'});

        console.log(foundUser[0]._id);

        res.status(200).json({
            message: 'Login successful'
        });

    }   catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
);

module.exports = router;
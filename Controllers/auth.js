const router = require('express').Router();
const user = require('../modules/user');
const bcryptjs = require('bcryptjs');



Router.post('/user', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        console.log(firstName, lastName, email, password);

        const user = new User({
            firstName,
            lastName,
            email,
            password: bcryptjs.hashSync(password, SALT)
        });

        await user.save();
        const token = jwt.sign({id: newUser._id}, JWT_SECRET, {expiresIn: '1h'});
        console.log(token);

        res.status(201).json({
            message: 'User created successfully',
            newUser,
            token
        });

    } catch (error) {
        logError(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
);

Router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        let foundUser = await User.find({email});
        if(!foundUser.length) throw error('User not found');

        const ifFound = await bcryptjs.compare(password, foundUser[0].password);
        console.log(ifFound);

        if(!ifFound) throw error('Incorrect password');

        const token = jwt.sign({id: ifFound._id}, JWT_SECRET, {expiresIn: '1h'});

        console.log(token);

        res.status(200).json({
            message: 'Login successful',
            token
        });

    }    catch (error) {
        logError(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
);

module.exports = router;
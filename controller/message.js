const router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Message = require("../models/Message");
const User = require('../models/User');


router.get('/rooms/:id/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/rooms/:id/messages', async (req, res) => {
    try {
        const {when, user, room, body} = req.body;
        const newMessage = new Message({
            when: when || Date.now(), 
            user, 
            room,
            body
        });

        await newMessage.save();

        const token = jwt.sign(
            { id: newMessage._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log(token);

        res.status(201).json({
            newMessage,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/messages/:id', async (req, res) => {
    try {
        const { body } = req.body;
        const { id } = req.params;

        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { body },
            { new: true }
        );

        if (!updatedMessage) throw new Error('updatedMessage not found');

        const token = jwt.sign(
            { id: User._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            updatedMessage,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
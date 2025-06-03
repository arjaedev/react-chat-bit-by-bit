const router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Message = require("../models/Message");
const User = require('../models/User');


router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/messages', async (req, res) => {
    try {
        const {when, user, room, body} = req.body;
        const newMessage = new Message({
            when: when || Date.now(), 
            user, 
            room,
            body
        });

        await newMessage.save();

        res.status(201).json({
            newMessage
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { body } = req.body;
        const { id } = req.params;

        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { body },
            { new: true }
        );

        if (!updatedMessage) throw new Error('updatedMessage not found');


        res.status(200).json({
            updatedMessage,
        
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        const deleteMessage = await Message.findByIdAndDelete(req.params.id);

        if (!deleteMessage) throw new Error('Message not found');
        
        res.status(200).json({ message: 'Message deleted successfully' });
        


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error.message}` });
    }
});


module.exports = router;
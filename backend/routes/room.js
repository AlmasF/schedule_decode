const express = require('express');
const router = express.Router();
const {getRooms} = require('../controllers/room.controller');

router.get('/api/rooms', (req, res) => {
    try{
        const rooms = await getRooms();
        res.status(200).send(rooms);
    }catch(errors){
        res.status(500).send(errors);
    }
});


module.exports = router;
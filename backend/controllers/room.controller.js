const {Room} = require('../models');  
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getRoomsByNumber = async(query) => {
    return new Promise(async resolve => {
        const rooms = await Room.findAll({
            where: {
                number: {
                    [Op.like]: `%${query}%`
                }
            }
        });
        resolve(rooms);
    });
}

const getRooms = async(query) => {
    return new Promise(async resolve => {
        const rooms = await Room.findAll();
        resolve(rooms);
    });
}

module.exports = {
    getRoomsByNumber,
    getRooms
}
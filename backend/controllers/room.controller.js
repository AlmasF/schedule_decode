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

module.exports = {
    getRoomsByNumber
}
const {Group, Lesson_in_week} = require('../models');  
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const createGroup = ({name, start, end}) => {
    return new Promise(async resolve => {
        const group = await Group.create({
            name,
            start,
            end
        });
        resolve(group);
    })
}

const getGroups = async (req, res) => {
    const groups = await Group.findAll();
    res.status(200).send(groups);
}

const getGroupsByName = async(query) => {
    return new Promise(async resolve => {
        const groups = await Group.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        });
        resolve(groups);
    });
}

const deleteGroup = id => {
    return new Promise(async resolve => {
        await Lesson_in_week.destroy({where: {group_id: id}});
        await Group.destroy({where: {id}});

        resolve(true);
    });
}

const updateGroup = ({id, name, start, end}) => {
    return new Promise(async resolve => {
        const group = await Group.update({name, start, end}, {where: {id}});
        resolve(group);
    });
}

const getActiveGroups = async () => {
    return new Promise(async resolve => {
        const groups = await Group.findAll({
            where: {
                end: {
                    [Op.gt]: new Date()
                    }
            } 
        });
        resolve(groups);
    })
}

module.exports = {
    createGroup,
    getGroupsByName,
    getGroups,
    deleteGroup,
    updateGroup,
    getActiveGroups
}
const {Mentor, Lesson_in_week, Busy_in_week} = require('../models');  
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getMentors = async (req, res) => {
    const mentors = await Mentor.findAll();
    res.status(200).send(mentors);
}

const getMentorsByName = async(query) => {
    return new Promise(async resolve => {
        const mentors = await Mentor.findAll({
            where: {
                full_name: {
                    [Op.iLike]: `%${query}%`
                }
            }
        });
        resolve(mentors);
    });
}

const createMentor = ({full_name}) => {
    return new Promise(async resolve => {
        const mentor = await Mentor.create({
            full_name
        });
        resolve(mentor);
    });
}

const updateMentor = ({id, full_name}) => {
    return new Promise(async resolve => {
        const mentor = await Mentor.update({full_name}, {where: {id}});
        resolve(mentor);
    });
}

const deleteMentor = id => {
    return new Promise(async resolve => {
        await Lesson_in_week.destroy({where: {mentor_id: id}});
        await Busy_in_week.destroy({where: {mentor_id: id}});
        await Mentor.destroy({where: {id}});

        resolve(true);
    });
}

module.exports = {
    getMentors,
    getMentorsByName,
    createMentor,
    updateMentor,
    deleteMentor
}
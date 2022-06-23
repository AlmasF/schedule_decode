const {Busy_in_week} = require('../models');  

const createBusyInWeek = ({text, weekday, time, mentor_id}) => {
    return new Promise(async resolve => {
        const busyInWeek = await Busy_in_week.create({
            text,
            weekday,
            time,
            mentor_id
        });
        resolve(busyInWeek);
    });
}

const getBusyInWeek = (mentor_id) => {
    return new Promise(async resolve => {
        const busiesInWeek = await Busy_in_week.findAll({
            include: ['mentor'],
            where: {mentor_id}
        });
        resolve(busiesInWeek);
    });
};

module.exports = {
    createBusyInWeek,
    getBusyInWeek
}
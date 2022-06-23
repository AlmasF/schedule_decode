const {isWeekDay} = require('../utils/is-weekday');
const {isTime} = require('../utils/is-time');

const createBusyInWeekValidator = ({text, weekday, time, mentor_id}) => {
    const errors = {};

    if(!text || typeof text !== 'string' || text.trim().length == 0) {
        errors.text = "Причина не может быть пустой";
    }

    if(!weekday || !isWeekDay(weekday)){
        errors.weekday = 'Некорректный день недели';
    }

    if(!time || !isTime(time)){
        errors.time = 'Некорректное время';
    }

    mentor_id *= 1;
    if(!mentor_id || typeof mentor_id !== 'number'){
        errors.mentor_id = 'Выберите ментора';
    }

    return errors;
}

module.exports = {
    createBusyInWeekValidator
};
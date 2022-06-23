const {isWeekDay} = require('../utils/is-weekday');
const {isTime} = require('../utils/is-time');

const createLessonInWeekValidator = ({course_id, group_id, room_id, mentor_id, weekday, time}) => {
    const errors = {};

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

    room_id *= 1;
    if(!room_id || typeof room_id !== 'number'){
        errors.mentor_id = 'Выберите кабинет';
    }
    
    group_id *= 1;
    if(!group_id || typeof group_id !== 'number'){
        errors.mentor_id = 'Выберите группу';
    }
    
    course_id *= 1;
    if(!course_id || typeof course_id !== 'number'){
        errors.mentor_id = 'Выберите курс';
    }

    return errors;
}

module.exports = {
    createLessonInWeekValidator
};
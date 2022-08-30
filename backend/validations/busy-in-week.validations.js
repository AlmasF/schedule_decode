const {isWeekDay} = require('../utils/is-weekday');
const {isTime} = require('../utils/is-time');

const createBusyInWeekValidator = async ({text, mentor_id, lessonInputs}) => {
    const errors = {};
    errors.lessonInputs = [];
    console.log(lessonInputs)
    await lessonInputs.map((item, index) => {
        if(!item.time || !isTime(item.time)){
            errors.lessonInputs[index] = {};
            errors.lessonInputs[index].time = 'Некорректное время';
        }
        if(!item.weekday || !isWeekDay(item.weekday)){
            !errors.lessonInputs[index] ? errors.lessonInputs[index] = {} : '';
            errors.lessonInputs[index].weekday = 'Некорректный день недели';
        }
    });

    if(!text || typeof text !== 'string' || text.trim().length == 0) {
        errors.text = "Причина не может быть пустой";
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
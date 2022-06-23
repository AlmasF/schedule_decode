const {isEmpty} = require('../utils/is-empty');

const createGroupValidator = ({name, start, end}) => {
    const errors = {};

    if(!name || typeof name !== 'string' || name.trim().length == 0) {
        errors.name = "Название группы не может быть пустым";
    }

    if(!start || !Date.parse(start)){
        errors.start = 'Старт группы не может быть пустым';
    }

    if(!end || !Date.parse(end)){
        errors.end = 'Дата окончания группы не может быть пустой';
    }

    return errors;
}

module.exports = {
    createGroupValidator
};
const weekdays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];

const isWeekDay = (str) => weekdays.includes(str)
module.exports = {
    isWeekDay
}
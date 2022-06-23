const {Lesson_in_week} = require('../models');  

const createLessonInWeek = ({course_id, group_id, room_id, mentor_id, weekday, time}) => {
    return new Promise(async resolve => {
        const lessonInWeek = await Lesson_in_week.create({
            course_id,
            group_id,
            room_id,
            mentor_id,
            weekday,
            time
        });
        resolve(lessonInWeek);
    });
}

const getLessons = (key, value) => {
    return new Promise(async resolve => {
        const lessonsInWeek = await Lesson_in_week.findAll({
            include: ['mentor', 'course', 'room', 'group'],
            where: {[key]: value}
        });
        resolve(lessonsInWeek);
    });
}

module.exports = {
    createLessonInWeek,
    getLessons
}
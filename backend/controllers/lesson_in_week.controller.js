const {Lesson_in_week} = require('../models');  

const createLessonInWeek = ({course_id, group_id, room_id, mentor_id, weekday, time}) => {
    return new Promise(async resolve => {
        await Lesson_in_week.create({
            course_id,
            group_id,
            room_id,
            mentor_id,
            weekday,
            time: time.split(' ')[0]
        });
        const lessonInWeek = await Lesson_in_week.findOne({
            include: ['mentor', 'course', 'room', 'group'],
            where: {
                course_id,
                group_id,
                room_id,
                mentor_id,
                weekday,
                time: time.split(' ')[0]    
            }
        });
        resolve(lessonInWeek);
    });
}

const deleteLessonInWeek = (id) => {
    return new Promise(async resolve => {
        await Lesson_in_week.destroy({where: {id}});
        resolve(true);
    });
}

const updateLessonInWeek = ({id, time, weekday, mentor_id, room_id, group_id}) => {
    return new Promise(async resolve => {
        const lesson_in_week = await Lesson_in_week.update({time, weekday, mentor_id, room_id, group_id}, {where: {id}});
        resolve(lesson_in_week);
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
    deleteLessonInWeek,
    updateLessonInWeek,
    getLessons
}
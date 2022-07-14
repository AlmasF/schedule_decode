const express = require('express');
const router = express.Router();
const {isEmpty} = require('../utils/is-empty');
const {createLessonInWeekValidator} = require('../validations/lesson-in-week.validations');
const {createLessonInWeek, deleteLessonInWeek, updateLessonInWeek} = require('../controllers/lesson_in_week.controller');

router.post('/api/lesson-in-week', async (req, res) => {
    const errors = await createLessonInWeekValidator(req.body);
    if(isEmpty(errors)){
        try {

            let lessonsInWeek = {};

            const promises = req.body.lessonInputs.map(async item => (
                createLessonInWeek({
                    room_id: req.body.room_id,
                    course_id: req.body.course_id,
                    mentor_id: req.body.mentor_id,
                    group_id: req.body.group_id,
                    weekday: item.weekday,
                    time: item.time
                })
            ));

            lessonsInWeek = await Promise.all(promises);
            // return lessonsInWeek;
            await console.log('from lesson_in_week routes: ', lessonsInWeek);
            res.status(200).send(lessonsInWeek);
        } catch(errors) {
            res.status(500).send(errors);
        }
    } else {
        res.status(400).send(errors);
    }
});

router.put('/api/lesson-in-week', async(req, res) => {
    try{
        const lesson_in_week = await updateLessonInWeek(req.body);
        res.status(200).send(lesson_in_week);
    }catch(error){
        res.status(400).send(error);
    }
});

router.delete('/api/lesson-in-week/:id', async(req, res) => {
    try{
        await deleteLessonInWeek(req.params.id);
    }catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;
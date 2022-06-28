const express = require('express');
const router = express.Router();
const {isEmpty} = require('../utils/is-empty');
const {createLessonInWeekValidator} = require('../validations/lesson-in-week.validations');
const {createLessonInWeek} = require('../controllers/lesson_in_week.controller');

router.post('/api/lesson-in-week', async (req, res) => {
    const errors = await createLessonInWeekValidator(req.body);
    if(isEmpty(errors)){
        try {

            let lessonsInWeek = [];
            await req.body.lessonInputs.forEach(async item => {
                const lesson = await createLessonInWeek({
                    room_id: req.body.room_id,
                    course_id: req.body.course_id,
                    mentor_id: req.body.mentor_id,
                    group_id: req.body.group_id,
                    weekday: item.weekday,
                    time: item.time
                });
                await lessonsInWeek.push(lesson);
            });
            resolve(lessonsInWeek)
        
            res.status(200).send(lessonsInWeek);  
 
        } catch(e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send(errors);
    }
});

module.exports = router;
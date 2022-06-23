const express = require('express');
const router = express.Router();
const {isEmpty} = require('../utils/is-empty');
const {createLessonInWeekValidator} = require('../validations/lesson-in-week.validations');
const {createLessonInWeek} = require('../controllers/lesson_in_week.controller');

router.post('/api/lesson-in-week', async (req, res) => {
    const errors = createLessonInWeekValidator(req.body);
    if(isEmpty(errors)){
        try {
            const group = await createLessonInWeek(req.body);
            res.status(200).send(group);
        } catch(e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send(errors);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const {isEmpty} = require('../utils/is-empty');
const {createBusyInWeekValidator} = require('../validations/busy-in-week.validations');
const {createBusyInWeek} = require('../controllers/busy_in_week.controller');


router.post('/api/busy-in-week', async (req, res) => {
    const errors = createBusyInWeekValidator(req.body);
    if(isEmpty(errors)){
        try {
            let busiesInWeek = {};
            const promises = req.body.lessonInputs.map(async item => (
                createBusyInWeek({
                    mentor_id: req.body.mentor_id,
                    text: req.body.text,
                    weekday: item.weekday,
                    time: item.time
                })
            ));

            busiesInWeek = await Promise.all(promises);
            res.status(200).send(busiesInWeek);

        } catch(e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send(errors);
    }
});


module.exports = router;
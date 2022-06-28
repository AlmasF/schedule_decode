const express = require('express');
const router = express.Router();
const {getCourses} = require('../controllers/course.controller')

router.get('/api/courses', (req, res) => {
    try{
        const courses = await getCourses();
        res.status(200).send(courses);
    }catch(errors){
        res.status(500).send(errors);
    }
});

module.exports = router;
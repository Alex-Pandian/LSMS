const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/join/:labCode/:studentId', studentController.joinLabSession);
router.get('/assigned-questions/:labId/:studentId', studentController.getAssignedQuestions);
router.post('/submit/:labSessionId:studentId', studentController.submitAssignment);
router.get('/enrolled-labs/:studentId', studentController.getEnrolledLabSessions);

module.exports = router;

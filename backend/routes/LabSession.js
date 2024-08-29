const express = require('express');
const { create, update, Delete, assignQuestions, getSubmissionStatus, getCreatedLabSessions, getClassDetails, getAllQuestions } = require('../controllers/LabController');
const router = express.Router();

router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:labCode', Delete);
router.post('/assign', assignQuestions); 
router.get('/submission-status/:labSessionId', getSubmissionStatus);
router.get('/created-labs/:facultyId', getCreatedLabSessions);
router.get('/:labSessionId',getClassDetails);
router.get('/all-questions/:labSessionId',getAllQuestions);

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const LabSession = require('../models/LabSession');
const Question = require('../models/question');
const User = require('../models/user');

exports.create = async (req, res) => {
    const { labName, labCode, faculty_id, description, maxStudents } = req.body;
    try {
        const newLabSession = new LabSession({
            labName,
            labCode,
            faculty_id,
            description,
            maxStudents
        });
        await newLabSession.save();
        res.status(201).json(newLabSession);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', details: err.errors });
        }
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Lab code must be unique' });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { labName, labCode, teacherName, description, maxStudents } = req.body;
    try {
        const updatedSession = await LabSession.findByIdAndUpdate(id, { labName, labCode, teacherName, description, maxStudents }, { new: true, runValidators: true });
        if (!updatedSession) {
            return res.status(404).json({ error: 'Lab session not found' });
        }
        res.status(200).json(updatedSession);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', details: err.errors });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

exports.Delete = async (req, res) => {
    try {
        await LabSession.findOneAndDelete({ labCode: req.params.labCode });
        res.status(200).json({ message: 'Lab session deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const assignQuestionsToStudents = async (title, questions, labSessionId) => {
    try {
        // Fetch the lab session to check enrollment
        const labSession = await LabSession.findById(labSessionId).populate('participants');
        if (!labSession) {
            throw new Error('Lab session not found');
        }

        // Check if any students are enrolled
        if (!labSession.participants || labSession.participants.length === 0) {
            return { success: false, message: 'No students enrolled in the class.' };
        }

        const assignedTo = [];

        // Iterate through each student and assign a single random question
        for (const student of labSession.participants) {
            // Get a random question for this student
            const randomQuestionIndex = Math.floor(Math.random() * questions.length);
            const questionText = questions[randomQuestionIndex];

            // Assign this question to the current student
            assignedTo.push({ student: student._id, questionText });
        }

        // Create the Question document
        const question = new Question({
            title,
            assignedTo, // Array of assignments with student references and texts
            createdBy: labSession.faculty_id, // Assuming the faculty is the creator
            labSession: labSessionId,
        });

        await question.save();

        return { success: true, message: 'Questions assigned successfully' };
    } catch (error) {
        console.error('Error assigning questions:', error);
        throw error;
    }
};

exports.assignQuestions = async (req, res) => {
    const { title, questions, labSessionId } = req.body;

    try {
        // Validate input
        if (!title || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: 'Title and at least one question are required.' });
        }

        // Call the function to assign questions to students
        const result = await assignQuestionsToStudents(title, questions, labSessionId);

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.status(200).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getSubmissionStatus = async (req, res) => {
    const { labSessionId } = req.params;

    try {
        const labSession = await LabSession.findById(labSessionId).populate('participants');
        if (!labSession) {
            return res.status(404).json({ message: 'Lab session not found' });
        }
        const submitted = [];
        const lateSubmitted = [];
        const notSubmitted = [];
        labSession.participants.forEach((student) => {
            const submission = labSession.submissions.find(sub => sub.student.toString() === student._id.toString());
            if (submission) {
                if (submission.isLate) {
                    lateSubmitted.push(student);
                } else {
                    submitted.push(student);
                }
            } else {
                notSubmitted.push(student);
            }
        });
        res.status(200).json({ submitted, lateSubmitted, notSubmitted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCreatedLabSessions = async (req, res) => {
    const { facultyId } = req.params;

    try {
        const labSessions = await LabSession.find({ faculty_id: facultyId });
        res.status(200).json(labSessions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getClassDetails = async (req, res) => {
    const { labSessionId } = req.params;

    try {
        const labSession = await LabSession.findById(labSessionId)
                                    .populate('participants','username')
                                    .populate('faculty_id','username'); // Populate students
        if (!labSession) {
            return res.status(404).json({ message: 'Lab session not found' });
        }
        res.status(200).json(labSession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllQuestions = async (req, res) => {
    const { labSessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(labSessionId)) {
        return res.status(400).json({ message: 'Invalid lab session ID' });
    }

    try {
        const questions = await Question.find({ labSession: labSessionId }).populate('createdBy', 'username');

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found' });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
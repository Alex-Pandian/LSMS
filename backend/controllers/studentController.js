const express = require('express');
const LabSession = require('../models/LabSession');
const Question = require('../models/question');
const User = require('../models/user'); // Assuming you have a User model

// Controller for students to join a lab session
exports.joinLabSession = async (req, res) => {
    const { labCode, studentId } = req.params; // Get studentId from params

    try {
        const labSession = await LabSession.findOne({ labCode });
        if (!labSession) {
            return res.status(404).json({ message: 'Lab session not found' });
        }

        if (labSession.participants.includes(studentId)) {
            return res.status(400).json({ message: 'Already joined this lab session' });
        }

        if (labSession.participants.length >= labSession.maxStudents) {
            return res.status(400).json({ message: 'Lab session is full' });
        }

        labSession.participants.push(studentId);
        await labSession.save();

        const user = await User.findById(studentId);
        if (user) {
            user.joinedLabs.push(labSession._id);
            await user.save();
        }

        res.status(200).json({ message: 'Successfully joined the lab session' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to get questions assigned to a student
exports.getAssignedQuestions = async (req, res) => {
    const { labId, studentId } = req.params;
    try {
        // Find all questions assigned to this student for the given lab session
        const classwork = await Question.find({
            labSession: labId,
            'assignedTo.student': studentId
        }).select('title assignedTo.$');

        if (classwork.length === 0) {
            return res.status(404).json({ message: 'No classwork found.' });
        }

        // Group classwork by title
        const groupedClasswork = classwork.reduce((acc, item) => {
            const existing = acc.find(work => work.title === item.title);
            if (existing) {
                existing.questions.push(item.assignedTo[0].questionText);
            } else {
                acc.push({
                    title: item.title,
                    questions: [item.assignedTo[0].questionText]
                });
            }
            return acc;
        }, []);

        res.status(200).json(groupedClasswork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for students to submit assignments
exports.submitAssignment = async (req, res) => {
    const { labSessionId, studentId } = req.params; // Get studentId from params
    const { file } = req.body;

    try {
        const labSession = await LabSession.findById(labSessionId);
        if (!labSession) {
            return res.status(404).json({ message: 'Lab session not found' });
        }

        const submission = labSession.submissions.find(sub => sub.student.toString() === studentId.toString());
        if (submission) {
            return res.status(400).json({ message: 'Assignment already submitted' });
        }

        labSession.submissions.push({
            student: studentId,
            file,
            isLate: new Date() > labSession.deadline
        });
        await labSession.save();

        res.status(200).json({ message: 'Assignment submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEnrolledLabSessions = async (req, res) => {
    const { studentId } = req.params; // Get studentId from params

    try {
        const user = await User.findById(studentId).populate('joinedLabs');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.joinedLabs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const mongoose = require('mongoose');

const AssignedToSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questionText: { type: String, required: true }
});

const QuestionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    assignedTo: [AssignedToSchema], 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    labSession: { type: mongoose.Schema.Types.ObjectId, ref: 'LabSession', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);

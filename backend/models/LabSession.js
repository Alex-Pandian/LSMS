const mongoose = require('mongoose');

const LabSessionSchema = new mongoose.Schema({
    labName: { type: String, required: true },
    labCode: { type: String, required: true, unique: true },
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    maxStudents: { type: Number, default: 30 },
    deadline: { type: Date },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    submissions: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        submissionDate: { type: Date, default: Date.now },
        isLate: { type: Boolean, default: false },
        file: { type: String }
    }]
});

module.exports = mongoose.model('LabSession', LabSessionSchema);
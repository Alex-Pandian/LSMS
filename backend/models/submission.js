const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    labSession: { type: mongoose.Schema.Types.ObjectId, ref: 'LabSession', required: true },
    submissionDate: { type: Date, default: Date.now },
    isLate: { type: Boolean, default: false },
    file: { type: String } // URL or path to the submitted file
});

module.exports = mongoose.model('Submission', SubmissionSchema);

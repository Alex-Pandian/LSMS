const mongoose = require('mongoose');
const ClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value <= this.endDate;
            },
            message: 'Start date must be before end date.'
        }
    },
    endDate: { type: Date, required: true },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});
ClassSchema.index({ startDate: 1, endDate: 1 });
module.exports = mongoose.model('Class', ClassSchema);
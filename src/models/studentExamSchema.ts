import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';

const schema = new mongoose.Schema({
    _id: Number,
    degree: { type: String, required: true, trim: true },
    user: { type: Number, ref: 'users' },
    course: { type: Number, ref: 'courses' },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ filed: '_id' }]);

module.exports = mongoose.model('student_exams', schema)
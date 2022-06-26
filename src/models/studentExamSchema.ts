import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';

const schema = new mongoose.Schema({
    _id: Number,
    degree: { type: Number, required: true, trim: true },
    student: { type: Number, ref: 'users' },
    course: { type: Number, ref: 'courses' },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ filed: '_id' }]);

export default mongoose.model('student_exams', schema)
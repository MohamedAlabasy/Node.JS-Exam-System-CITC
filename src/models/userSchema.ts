import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';

const schema = new mongoose.Schema({
    _id: Number,
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    national_id: { type: String, required: true, unique: true, trim: true, },
    identifier: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false, trim: true },
    type: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
    token: { type: String, required: false, default: null, select: false },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ filed: '_id' }]);

export default mongoose.model('users', schema)
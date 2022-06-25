import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';

const schema = new mongoose.Schema({
    _id: Number,
    national_id: { type: String, required: true, unique: true, trim: true, },
    identifier: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false, trim: true },
    token: { type: String, required: false, default: null, select: false }
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ filed: '_id' }]);

module.exports = mongoose.model('students', schema)
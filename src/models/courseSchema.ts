import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';

const schema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true, unique: true, trim: true },
    number_characters: { type: String, required: true, trim: true, },
    teacher: { type: Number, ref: 'users' },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ filed: '_id' }]);

export default mongoose.model('courses', schema)
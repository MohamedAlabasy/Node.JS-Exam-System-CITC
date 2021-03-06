import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';

const schema = new mongoose.Schema({
    _id: Number,
    question: { type: String, required: true, unique: true, trim: true },
    choice_1: { type: String, required: true, trim: true },
    choice_2: { type: String, required: true, trim: true },
    choice_3: { type: String, required: true, trim: true },
    correct_answer: { type: Number, enum: [1, 2, 3], required: true, trim: true },
    is_difficult: { type: Boolean, required: true ,lowercase:true},
    chapter: { type: Number, ref: 'chapters' },
}, { timestamps: true });

schema.plugin(AutoIncrementID, [{ filed: '_id' }]);

export default mongoose.model('questions', schema)
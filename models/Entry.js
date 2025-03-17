import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Entry', EntrySchema);

import mongoose from 'mongoose';

const AgentLocationSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  location: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('AgentLocation', AgentLocationSchema);

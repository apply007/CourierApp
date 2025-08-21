import mongoose from 'mongoose';

const ParcelSchema = new mongoose.Schema({
  trackingCode: { type: String, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  size: { type: String, enum: ['small','medium','large'], required: true },
  type: { type: String, enum: ['document','fragile','standard'], default: 'standard' },
  paymentMode: { type: String, enum: ['cod','prepaid'], required: true },
  codAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['Pending','Assigned','Picked Up','In Transit','Delivered','Failed'], default: 'Pending' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  history: [{
    status: String,
    note: String,
    at: { type: Date, default: Date.now },
    location: { lat: Number, lng: Number }
  }],
  qrCodeDataUrl: String,
}, { timestamps: true });

export default mongoose.model('Parcel', ParcelSchema);

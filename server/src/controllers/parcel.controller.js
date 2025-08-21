import Parcel from '../models/Parcel.js';
import { generateQRDataUrl } from '../utils/qrcode.js';
import { emitParcelStatus } from '../utils/socket.js';

const genTracking = () => 'TRK-' + Math.random().toString(36).slice(2,10).toUpperCase();

export const createParcel = async (req, res) => {
  try {
    const {
      pickupAddress, deliveryAddress, size, type, paymentMode, codAmount = 0
    } = req.body;

    const parcel = await Parcel.create({
      trackingCode: genTracking(),
      customer: req.user._id,
      pickupAddress, deliveryAddress, size, type, paymentMode, codAmount,
      history: [{ status: 'Pending', note: 'Created' }]
    });
    parcel.qrCodeDataUrl = await generateQRDataUrl(parcel.trackingCode);
    await parcel.save();
    return res.json(parcel);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const myParcels = async (req, res) => {
  const list = await Parcel.find({ customer: req.user._id }).sort('-createdAt');
  res.json(list);
};

export const trackPublic = async (req, res) => {
  const { code } = req.params;
  const parcel = await Parcel.findOne({ trackingCode: code }).populate('agent', 'name email');
  if (!parcel) return res.status(404).json({ message: 'Not found' });
  res.json(parcel);
};

export const updateStatus = async (req, res) => {
  const { code } = req.params;
  const { status, note, location } = req.body;
  const parcel = await Parcel.findOne({ trackingCode: code });
  if (!parcel) return res.status(404).json({ message: 'Not found' });

  parcel.status = status;
  parcel.history.push({ status, note, location });
  await parcel.save();
  emitParcelStatus(code, { status, note, location, at: new Date() });
  res.json(parcel);
};

import User from '../models/User.js';
import Parcel from '../models/Parcel.js';
import { writeCSV, writePDF } from '../utils/report.js';

export const listUsers = async (_req, res) => {
  const users = await User.find().sort('-createdAt').select('-password');
  res.json(users);
};

export const listParcels = async (_req, res) => {
  const parcels = await Parcel.find().populate('customer','name email').populate('agent','name email').sort('-createdAt');
  res.json(parcels);
};

export const assignAgent = async (req, res) => {
  const { code } = req.params;
  const { agentId } = req.body;
  const parcel = await Parcel.findOne({ trackingCode: code });
  if (!parcel) return res.status(404).json({ message: 'Not found' });
  parcel.agent = agentId;
  parcel.status = 'Assigned';
  parcel.history.push({ status: 'Assigned', note: 'Agent assigned' });
  await parcel.save();
  res.json(parcel);
};

export const analytics = async (_req, res) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);

  const dailyBookings = await Parcel.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } });
  const failedDeliveries = await Parcel.countDocuments({ status: 'Failed' });
  const codParcels = await Parcel.find({ paymentMode: 'cod' }).select('codAmount');
  const codAmounts = codParcels.reduce((sum,p)=>sum+(p.codAmount||0),0);

  res.json({ dailyBookings, failedDeliveries, codAmounts });
};

export const exportReport = async (req, res) => {
  const { type = 'csv' } = req.query;
  const rows = await Parcel.find().lean();
  const mapped = rows.map(r => ({
    trackingCode: r.trackingCode,
    status: r.status,
    paymentMode: r.paymentMode,
    codAmount: r.codAmount || 0,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt
  }));
  const filename = `report-${Date.now()}.${type === 'pdf' ? 'pdf' : 'csv'}`;
  const path = `/tmp/${filename}`;
  if (type === 'pdf') await writePDF(path, 'Parcel Report', mapped);
  else await writeCSV(path, mapped);
  res.download(path, filename);
};
// Parcel Status update
export const updateParcelStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const parcel = await Parcel.findById(id);
  if (!parcel) return res.status(404).json({ message: 'Parcel not found' });

  parcel.status = status;
  parcel.history.push({ status, note: 'Status updated by admin' });
  await parcel.save();

  res.json({ parcel });
};

// Parcel Payment update
export const updateParcelPayment = async (req, res) => {
  const { id } = req.params;
  const { paymentMode } = req.body;
  const parcel = await Parcel.findById(id);
  if (!parcel) return res.status(404).json({ message: 'Parcel not found' });

  parcel.paymentMode = paymentMode;
  await parcel.save();

  res.json({ parcel });
};

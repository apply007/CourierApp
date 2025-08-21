import Parcel from '../models/Parcel.js';

export const myAssignments = async (req, res) => {
  const list = await Parcel.find({ agent: req.user._id }).sort('-updatedAt');
  res.json(list);
};

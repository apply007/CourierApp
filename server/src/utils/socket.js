import AgentLocation from '../models/AgentLocation.js';
import Parcel from '../models/Parcel.js';

let ioRef = null;
export const initSocket = (io) => {
  ioRef = io;
  io.on('connection', (socket) => {
    // Join rooms by tracking code for parcel-specific updates
    socket.on('join-tracking', (trackingCode) => {
      socket.join(`parcel:${trackingCode}`);
    });

    // Agent live location updates
    socket.on('agent:location', async ({ agentId, lat, lng }) => {
      await AgentLocation.findOneAndUpdate(
        { agent: agentId },
        { location: { lat, lng }, updatedAt: new Date() },
        { upsert: true }
      );
      io.emit('agent:location:update', { agentId, lat, lng, at: new Date() });
    });
  });
};

export const emitParcelStatus = (trackingCode, payload) => {
  if (!ioRef) return;
  ioRef.to(`parcel:${trackingCode}`).emit('parcel:status', payload);
};

import React, { useEffect, useState } from 'react';
import { api } from '../lib/api'; // axios instance

export default function MyParcels() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.get('http://localhost:4000/api/parcels/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setParcels(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  if (loading) return <p>Loading your parcels...</p>;

  if (parcels.length === 0) return <p>You have no parcels yet.</p>;

  return (
    <div>
      <h2>My Parcels</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Tracking</th>
            <th>Status</th>
            <th>Pickup</th>
            <th>Delivery</th>
            <th>Payment</th>
            <th>COD Amount</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map(p => (
            <tr key={p._id}>
              <td>{p.trackingCode}</td>
              <td>{p.status}</td>
              <td>{p.pickupAddress}</td>
              <td>{p.deliveryAddress}</td>
              <td>{p.paymentMode}</td>
              <td>{p.codAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

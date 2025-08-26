import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Dashboard(){
  const [metrics,setMetrics]=useState(null)
  const [parcels,setParcels]=useState([])

  useEffect(()=>{
    (async()=>{
      try{
        const { data: m } = await api.get('https://courierapp-oxx4.onrender.com/api/admin/analytics')
        setMetrics(m)
        const { data: p } = await api.get('https://courierapp-oxx4.onrender.com/api/admin/parcels')
        setParcels(p)
      }catch(e){ /* ignore for non-admin */ }
    })()
  },[])


const handleStatusChange = async (id, newStatus) => {
  try {
    const { data } = await api.patch(`https://courierapp-oxx4.onrender.com/api/admin/parcels/${id}/status`, { status: newStatus });
    setParcels(parcels.map(p => p._id === id ? data.parcel : p));
  } catch (e) {
    console.log(e);
  }
}

const handlePaymentChange = async (id, newPayment) => {
  try {
    const { data } = await api.patch(`https://courierapp-oxx4.onrender.com/api/admin/parcels/${id}/payment`, { paymentMode: newPayment });
    setParcels(parcels.map(p => p._id === id ? data.parcel : p));
  } catch (e) {
    console.log(e);
  }
}


  return (
    <div>
      <h2>Dash Board</h2>
      {metrics && (
        <ul className='metrics'>
          <li>Daily Booking: {metrics.dailyBookings}</li>
          <li>Failed Delivery: {metrics.failedDeliveries}</li>
          <li>COD Total: {metrics.codAmounts}</li>
        </ul>
      )}
      <h3>Current Parcel</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>Tracking</th><th>Status</th><th>Payment</th><th>COD</th></tr></thead>
        {/* <tbody>
          {parcels.slice(0,10).map(p=>(
            <tr key={p._id}><td>{p.trackingCode}</td><td>{p.status}</td><td>{p.paymentMode}</td><td>{p.codAmount}</td></tr>
          ))}
        </tbody> */}
        <tbody>
  {parcels.slice(0,10).map(p => (
    <tr key={p._id}>
      <td>{p.trackingCode}</td>
      <td>
        <select value={p.status} onChange={e => handleStatusChange(p._id, e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Picked Up">Picked Up</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Failed">Failed</option>
        </select>
      </td>
      <td>
        <select value={p.paymentMode} onChange={e => handlePaymentChange(p._id, e.target.value)}>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="COD">COD</option>
        </select>
      </td>
      <td>{p.codAmount}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  )
}

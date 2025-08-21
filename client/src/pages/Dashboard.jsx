import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Dashboard(){
  const [metrics,setMetrics]=useState(null)
  const [parcels,setParcels]=useState([])

  useEffect(()=>{
    (async()=>{
      try{
        const { data: m } = await api.get('/admin/analytics')
        setMetrics(m)
        const { data: p } = await api.get('/admin/parcels')
        setParcels(p)
      }catch(e){ /* ignore for non-admin */ }
    })()
  },[])

  return (
    <div>
      <h2>Dash Board</h2>
      {metrics && (
        <ul>
          <li>Daily Booking: {metrics.dailyBookings}</li>
          <li>Failed Delivery: {metrics.failedDeliveries}</li>
          <li>COD Total: {metrics.codAmounts}</li>
        </ul>
      )}
      <h3>Current Parcel</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>Tracking</th><th>Status</th><th>Payment</th><th>COD</th></tr></thead>
        <tbody>
          {parcels.slice(0,10).map(p=>(
            <tr key={p._id}><td>{p.trackingCode}</td><td>{p.status}</td><td>{p.paymentMode}</td><td>{p.codAmount}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

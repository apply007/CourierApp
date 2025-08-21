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
      <h2>ড্যাশবোর্ড</h2>
      {metrics && (
        <ul>
          <li>দৈনিক বুকিং: {metrics.dailyBookings}</li>
          <li>ফেইলড ডেলিভারি: {metrics.failedDeliveries}</li>
          <li>COD মোট: {metrics.codAmounts}</li>
        </ul>
      )}
      <h3>সাম্প্রতিক পার্সেল</h3>
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

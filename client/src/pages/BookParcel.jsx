import React, { useState } from 'react'
import { api } from '../lib/api'

export default function BookParcel(){
  const [form,setForm]=useState({ pickupAddress:'', deliveryAddress:'', size:'small', type:'standard', paymentMode:'prepaid', codAmount:0 })
  const [res,setRes]=useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    const { data } = await api.post('https://courierapp-oxx4.onrender.com/api/parcels', form)
    setRes(data)
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 520 }}>
      <h2>Parcel Booking</h2>
      <input placeholder="Pickup Address" value={form.pickupAddress} onChange={e=>setForm({...form,pickupAddress:e.target.value})} />
      <input placeholder="Delivery Address" value={form.deliveryAddress} onChange={e=>setForm({...form,deliveryAddress:e.target.value})} />
      <div>
        <label>Size </label>
        <select value={form.size} onChange={e=>setForm({...form,size:e.target.value})}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div>
        <label>Type </label>
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          <option value="standard">Standard</option>
          <option value="document">Document</option>
          <option value="fragile">Fragile</option>
        </select>
      </div>
      <div>
        <label>Payment </label>
        <select value={form.paymentMode} onChange={e=>setForm({...form,paymentMode:e.target.value})}>
          <option value="prepaid">Prepaid</option>
          <option value="cod">COD</option>
        </select>
      </div>
      {form.paymentMode==='cod' && (
        <input type="number" placeholder="COD Amount" value={form.codAmount} onChange={e=>setForm({...form,codAmount:Number(e.target.value||0)})} />
      )}
      <button type="submit">Book</button>
      {res && <div style={{ marginTop:8 }}>
        <div><b>Tracking:</b> {res.trackingCode}</div>
        <img alt="QR" src={res.qrCodeDataUrl} style={{ width: 120 }} />
      </div>}
    </form>
  )
}

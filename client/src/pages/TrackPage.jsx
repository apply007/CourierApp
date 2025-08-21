import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { socket } from '../lib/socket'

export default function TrackPage(){
  const [code,setCode]=useState('')
  const [parcel,setParcel]=useState(null)
  const [updates,setUpdates]=useState([])

  const fetchTrack = async ()=>{
    const { data } = await api.get(`/parcels/track/${code}`)
    setParcel(data)
    setUpdates(data.history || [])
    socket.emit('join-tracking', code)
  }

  useEffect(()=>{
    const handler = (payload)=> setUpdates(u => [...u, payload])
    socket.on('parcel:status', handler)
    return ()=> socket.off('parcel:status', handler)
  },[])

  return (
    <div style={{ maxWidth: 720 }}>
      <h2>ট্র্যাক পার্সেল</h2>
      <input placeholder="Tracking Code" value={code} onChange={e=>setCode(e.target.value)} />
      <button onClick={fetchTrack}>Track</button>
      {parcel && (
        <div style={{ marginTop: 16 }}>
          <div><b>Status:</b> {parcel.status}</div>
          <div><b>Agent:</b> {parcel.agent?.name || '-'}</div>
          <img alt="QR" src={parcel.qrCodeDataUrl} style={{ width: 120 }} />
          <h4>Timeline</h4>
          <ul>{updates.map((u,i)=>(<li key={i}>{u.status} — {u?.location ? `${u.location.lat},${u.location.lng}`: ''}</li>))}</ul>
        </div>
      )}
    </div>
  )
}

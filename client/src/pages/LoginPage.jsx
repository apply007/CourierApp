import React, { useState } from 'react'
import { api } from '../lib/api'

export default function LoginPage({ onLogin }) {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true); setErr('')
    try{
      const { data } = await api.post('/auth/login', { email, password })
      onLogin?.(data.token)
    }catch(e){
      setErr(e?.response?.data?.message || 'Login failed')
    }finally{ setLoading(false) }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth:360 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ display:'block', width:'100%', margin:'8px 0' }} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ display:'block', width:'100%', margin:'8px 0' }} />
      {err && <div style={{ color:'crimson' }}>{err}</div>}
      <button disabled={loading}>{loading ? '...' : 'Login'}</button>
    </form>
  )
}

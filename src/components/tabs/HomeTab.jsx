import { useState } from 'react';

export default function HomeTab({ user }) {
  return (
    <>
      <div className="card" style={{textAlign:'center'}}>
        <h2>Привет, {user?.first_name || 'Guest'}!</h2>
        <div className="points-big">{user?.points || 1240} pts</div>
        <p style={{opacity:0.7}}>You’re 260 pts away from a free coffee</p>
      </div>

      <div className="card">
        <h3 style={{marginBottom:16}}>Покажи QR кассиру и забери кешбек</h3>
        <button style={{width:'100%', padding:20, fontSize:18, background:'var(--gold)', border:'none', borderRadius:16, fontWeight:600}}>
          Scan QR Code
        </button>
      </div>
    </>
  );
}
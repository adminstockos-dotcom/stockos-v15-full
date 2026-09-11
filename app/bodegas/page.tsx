// @ts-nocheck
"use client";
import { BODEGAS_DB } from "../../lib/bodegas-db.js";

export default function BodegasPage() {
  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>GESTIÓN DE BODEGAS V9 FASE 1</h1>
      <p style={{background:'#d4edda', padding:10}}>✅ lib/bodegas-db.js cargado - Sistema B1...N</p>
      
      <div style={{border:'2px solid green', padding:15, marginTop:20}}>
        <h3>➕ Crear Nueva Bodega (B2, B3...N)</h3>
        <p>Tipo: WEB / DRIVE / WAFOTOS / FISICA</p>
        <p>Cada bodega tendrá su WhatsApp de encargado - ORDEN LLEGA SOLO A ÉL</p>
        <button style={{background:'green', color:'white', padding:'10px 20px', border:'none'}}>CREAR BODEGA NUEVA</button>
      </div>

      <h2 style={{marginTop:30}}>Bodegas Actuales:</h2>
      {BODEGAS_DB.map(b => (
        <div key={b.id} style={{border:'1px solid #ccc', padding:10, margin:10, borderRadius:5}}>
          <b>{b.id} - {b.nombre}</b><br/>
          Tipo: {b.tipo} | Encargado: {b.encargado}<br/>
          WhatsApp: {b.whatsapp_encargado} | Saldo: ${b.saldo_efectivo}
        </div>
      ))}

      <p style={{marginTop:20}}><a href="/" style={{color:'blue'}}>← Volver a Inicio V9</a></p>
    </div>
  )
}

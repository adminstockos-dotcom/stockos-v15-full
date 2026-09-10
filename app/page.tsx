"use client";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{fontFamily:'Arial', padding:20, background:'white', color:'#0A2640'}}>
      <img src="/logo-stockos.png" alt="STOCKOS" style={{height:48}} />
      <h1 style={{fontSize:34, fontWeight:800, marginTop:20, lineHeight:1.05}}>Si su empresa tiene un caos y pierde ventas buscando quién tiene el producto que necesita vender, STOCKOS automatiza todo lo que hace manual y vende más en automático.</h1>
      <p style={{fontSize:16, color:'#555', marginTop:12}}>Sistema base $300.000 COP - Unifica proveedores, controla inventario y cierra ventas en automático.</p>
      <button onClick={()=>setOpen(!open)} style={{background:'#1ECB6A', padding:'12px 24px', borderRadius:30, border:'none', fontWeight:700, marginTop:20, cursor:'pointer'}}>
        VER DEMO 2 MIN
      </button>
      {open && (
        <div style={{marginTop:20, padding:20, background:'#F8FAFC', borderRadius:15}}>
          <p><b>1.</b> Caos y ventas perdidas</p>
          <p><b>2.</b> Automatiza lo manual</p>
          <p><b>3.</b> Unifica todo</p>
          <p><b>4.</b> Vende más en automático</p>
        </div>
      )}
      <div style={{marginTop:40, padding:20, background:'#0A2640', color:'white', borderRadius:15}}>
        <h2>Total $300.000 COP + extras</h2>
        <p>Bancolombia 912-510747-93 / Nequi 3215981307</p>
        <p>PayPal: paypal.me/andreskstllo - Tarjeta débito/crédito</p>
        <p style={{fontSize:11, opacity:0.7}}>Ivan Andres Cadena Castillo</p>
      </div>
    </div>
  )
}

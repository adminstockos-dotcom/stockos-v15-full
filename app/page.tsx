"use client";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{fontFamily:'Arial', padding:20, background:'white', color:'#0A2640'}}>
      <img src="/logo-stockos.png" alt="STOCKOS" style={{height:48}} />
      <h1 style={{fontSize:32, fontWeight:800, marginTop:20}}>De 3 Excels a 200 pares diarios - STOCKOS $300.000 COP</h1>
      <p>Inventario maestro con 3 proveedores → Bodega B1 → Link maestro 7AM/2PM</p>
      <button onClick={()=>setOpen(!open)} style={{background:'#1ECB6A', padding:'12px 24px', borderRadius:30, border:'none', fontWeight:700, marginTop:20, cursor:'pointer'}}>
        VER DEMO 2 MIN - MAXIMA
      </button>
      {open && (
        <div style={{marginTop:20, padding:20, background:'#F8FAFC', borderRadius:15}}>
          <p><b>1/4 CAOS:</b> 3 Excels A/B/C</p>
          <p><b>2/4 MAESTRO:</b> Origen por proveedor + 40%/85%</p>
          <p><b>3/4 B1:</b> Pedido dividido 3+2+1 unificado</p>
          <p><b>4/4 LINK:</b> stockos.com/inv/maxima - cierra solo 7AM/2PM</p>
          <a href="#oferta" style={{background:'#0A2640', color:'white', padding:'10px 20px', borderRadius:20, display:'inline-block', marginTop:10, textDecoration:'none'}}>QUIERO POR $300k →</a>
        </div>
      )}
      <div id="oferta" style={{marginTop:40, padding:20, background:'#0A2640', color:'white', borderRadius:15}}>
        <h2>Total $300.000 COP + extras</h2>
        <p>Bancolombia 912-510747-93 / Nequi 3215981307 - Ivan Andres Cadena Castillo</p>
        <p style={{fontSize:11, opacity:0.7}}>Luego agregamos los 22 módulos con switch</p>
      </div>
    </div>
  )
}

"use client";
import { useState } from "react";
import { BODEGAS_DB } from "../../lib/bodegas-db.js";
import { enviarWhatsAppBodega } from "../../lib/whatsapp-dirigido.js";

export default function PedidosPage() {
  const [resultado, setResultado] = useState(null);

  const simularPedido = (bodega) => {
    const pedido = { id: "PED-" + Date.now(), cliente: "Cliente Prueba", total: 150000 };
    const envio = enviarWhatsAppBodega(bodega, pedido);
    setResultado(envio);
    window.open(envio.link_whatsapp, "_blank");
  };

  return (
    <div style={{padding:20}}>
      <h1>📦 SIMULADOR PEDIDOS V9 - WHATSAPP DIRIGIDO</h1>
      <p style={{background:'#fff3cd', padding:10}}>Pedido entra → SOLO llega al WhatsApp del encargado de esa bodega (B1...N)</p>
      
      {BODEGAS_DB.map(b => (
        <div key={b.id} style={{border:'1px solid #ccc', padding:15, margin:10}}>
          <b>{b.id} - {b.nombre}</b> - {b.encargado} - WA: {b.whatsapp_encargado}<br/>
          <button onClick={()=>simularPedido(b)} style={{background:'green', color:'white', padding:'8px 15px', marginTop:10, border:'none', cursor:'pointer'}}>
            SIMULAR PEDIDO PARA {b.id} (WhatsApp a {b.encargado})
          </button>
        </div>
      ))}

      {resultado && (
        <div style={{background:'#d4edda', padding:15, marginTop:20, border:'2px solid green'}}>
          <h3>✅ WhatsApp Enviado:</h3>
          <p><b>A:</b> {resultado.enviado_a} - {resultado.whatsapp}</p>
          <p><b>Link:</b> {resultado.link_whatsapp}</p>
        </div>
      )}
      <p style={{marginTop:20}}><a href="/bodegas">← Volver a Bodegas</a> | <a href="/">Inicio</a></p>
    </div>
  )
}

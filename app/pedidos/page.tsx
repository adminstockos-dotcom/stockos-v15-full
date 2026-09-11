// @ts-nocheck
"use client";
import { BODEGAS_DB } from "../../lib/bodegas-db.js";
import { enviarWhatsAppBodega } from "../../lib/whatsapp-dirigido.js";

export default function PedidosPage() {
  const simularPedido = (bodega: any) => {
    const pedido = { id: "PED-" + Date.now(), cliente: "Cliente Prueba", total: 150000 };
    const envio = enviarWhatsAppBodega(bodega, pedido);
    window.open(envio.link_whatsapp, "_blank");
    alert("WhatsApp enviado a: " + envio.enviado_a + " - " + envio.whatsapp);
  };

  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>📦 SIMULADOR PEDIDOS V9</h1>
      <p style={{background:'#fff3cd', padding:10}}>Pedido entra → SOLO al encargado de esa bodega</p>
      {BODEGAS_DB.map((b:any) => (
        <div key={b.id} style={{border:'1px solid #ccc', padding:15, margin:10}}>
          <b>{b.id} - {b.nombre}</b><br/>
          Encargado: {b.encargado} - WA: {b.whatsapp_encargado}<br/>
          <button onClick={()=>simularPedido(b)} style={{background:'green', color:'white', padding:'10px', marginTop:10, border:'none', cursor:'pointer'}}>
            SIMULAR PEDIDO PARA {b.id}
          </button>
        </div>
      ))}
      <p><a href="/bodegas">Bodegas</a> | <a href="/">Inicio</a></p>
    </div>
  )
}

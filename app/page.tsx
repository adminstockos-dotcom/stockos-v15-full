"use client";
export default function Home() {
  const AZUL = "#0A2640";
  const VERDE = "#1ECB6A";
  return (
    <div style={{fontFamily:'Inter, Arial', background:'#FFFFFF', color:'#1A1A1A'}}>
      
      {/* BLOQUE 1 - HERO */}
      <header style={{maxWidth:1100, margin:'0 auto', padding:'15px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <img src="/logo-stockos.png" alt="STOCK OS" style={{height:32}}/>
        <a href="/admin" style={{fontSize:12, color:'#888', textDecoration:'none'}}>Acceso Admin</a>
      </header>
      <section style={{maxWidth:1100, margin:'0 auto', padding:'50px 20px', display:'flex', flexWrap:'wrap', alignItems:'center', gap:30}}>
        <div style={{flex:'1 1 450px'}}>
          <h1 style={{fontSize:42, lineHeight:'1.1', fontWeight:800, color:AZUL, margin:0}}>Automatización Total para que vendas más sin caos</h1>
          <p style={{fontSize:18, color:'#444', marginTop:15, lineHeight:1.5}}>El sistema operativo para negocios que venden por WhatsApp, tienen mensajeros y se les pierde el inventario. Centraliza pedidos, plata y bodega en un solo lugar.</p>
          <div style={{marginTop:25, display:'flex', gap:12, flexWrap:'wrap'}}>
            <a href="#oferta" style={{background:VERDE, color:AZUL, padding:'14px 28px', borderRadius:30, fontWeight:800, textDecoration:'none'}}>VER DEMO EN 2 MIN</a>
            <a href="#oferta" style={{border:`2px solid ${AZUL}`, color:AZUL, padding:'12px 26px', borderRadius:30, fontWeight:700, textDecoration:'none'}}>Probar por $22 USD</a>
          </div>
        </div>
        <div style={{flex:'1 1 350px', background:'#F8FAFC', borderRadius:20, padding:20, border:'1px solid #E2E8F0', textAlign:'center'}}>
          <p style={{fontSize:12, color:'#888', textTransform:'uppercase', letterSpacing:1}}>Pedido WhatsApp → STOCKOS</p>
          <div style={{background:'white', borderRadius:12, padding:15, marginTop:10, boxShadow:'0 4px 12px rgba(0,0,0,0.08)', textAlign:'left'}}>
            <div style={{fontSize:13}}>🟢 <b>Nuevo pedido #1092</b></div>
            <div style={{fontSize:13, marginTop:5, color:'#555'}}>Cliente: Tienda La 14</div>
            <div style={{fontSize:13, color:'#555'}}>Asigna a: <b>BODEGA B1 (Juan)</b></div>
            <div style={{marginTop:10, background:VERDE, color:'white', textAlign:'center', padding:8, borderRadius:8, fontSize:13, fontWeight:700}}>✓ Pedido blindado, 0 perdidos</div>
          </div>
        </div>
      </section>

      {/* BLOQUE 2 - DOLOR */}
      <section style={{background:'#F8FAFC', padding:'60px 20px'}}>
        <div style={{maxWidth:1000, margin:'0 auto'}}>
          <h2 style={{textAlign:'center', fontSize:28, color:AZUL}}>¿Te pasa esto todos los días?</h2>
          <div style={{display:'flex', gap:20, marginTop:30, flexWrap:'wrap'}}>
            <div style={{flex:'1 1 280px', background:'white', padding:20, borderRadius:12, border:'1px solid #eee'}}><div style={{color:'red'}}>❌</div><b>Pedidos perdidos</b><p style={{fontSize:14, color:'#666'}}>Pedidos por WhatsApp que le llegan a 3 personas y nadie responde.</p></div>
            <div style={{flex:'1 1 280px', background:'white', padding:20, borderRadius:12, border:'1px solid #eee'}}><div style={{color:'red'}}>❌</div><b>Plata sin control</b><p style={{fontSize:14, color:'#666'}}>Mensajero que no sabes cuánto efectivo tiene ni si entregó.</p></div>
            <div style={{flex:'1 1 280px', background:'white', padding:20, borderRadius:12, border:'1px solid #eee'}}><div style={{color:'red'}}>❌</div><b>Inventario falso</b><p style={{fontSize:14, color:'#666'}}>Excel que nunca cuadra con la bodega real.</p></div>
          </div>
        </div>
      </section>

      {/* BLOQUE 3 - SOLUCION */}
      <section style={{maxWidth:1000, margin:'0 auto', padding:'60px 20px'}}>
        <h2 style={{textAlign:'center', fontSize:28, color:AZUL}}>STOCKOS quita el caos en 3 pasos</h2>
        <div style={{display:'flex', gap:25, marginTop:30, flexWrap:'wrap'}}>
          <div style={{flex:'1 1 300px'}}><h3>✅ Pedidos blindados</h3><p style={{fontSize:15, color:'#555'}}>Cada pedido de WhatsApp entra solo a un encargado (B1, B2...). Cero pedidos perdidos, cero peleas internas.</p></div>
          <div style={{flex:'1 1 300px'}}><h3>✅ Mensajeros controlados</h3><p style={{fontSize:15, color:'#555'}}>Control de efectivo, fotos de entrega subidas a Drive automático. Adiós a la desconfianza.</p></div>
          <div style={{flex:'1 1 300px'}}><h3>✅ Bodega en tiempo real</h3><p style={{fontSize:15, color:'#555'}}>Inventario, bodegas y trazabilidad de 15 días para saber qué pasó con cada producto.</p></div>
        </div>
      </section>

      {/* BLOQUE 4 - PRODUCTO */}
      <section style={{background:AZUL, color:'white', padding:'50px 20px', textAlign:'center'}}>
        <p style={{letterSpacing:2, fontSize:12, opacity:0.7}}>22 MÓDULOS DISPONIBLES</p>
        <div style={{display:'flex', justifyContent:'center', gap:20, marginTop:20, flexWrap:'wrap', fontSize:14}}>
          <span>📦 POS</span><span>📊 Inventario</span><span>👥 Clientes</span><span>🧾 Facturación DIAN</span><span>📈 Reportes</span><span>🔐 Usuarios</span>
        </div>
        <p style={{marginTop:15, opacity:0.8, fontSize:13}}>Activa solo lo que necesitas. Pagas $22 USD fijo.</p>
      </section>

      {/* BLOQUE 5 - OFERTA */}
      <section id="oferta" style={{padding:'60px 20px', background:'#F8FAFC'}}>
        <div style={{maxWidth:520, margin:'0 auto', background:AZUL, color:'white', padding:30, borderRadius:20, textAlign:'center'}}>
          <h2 style={{margin:0, fontSize:26}}>STOCKOS COMPLETO</h2>
          <p style={{fontSize:32, fontWeight:800, margin:'10px 0', color:VERDE}}>$22 USD / mes</p>
          <p style={{opacity:0.8, marginTop:-5}}>$88.000 COP - Incluye todo</p>
          <div style={{textAlign:'left', background:'rgba(255,255,255,0.08)', padding:15, borderRadius:12, marginTop:20, fontSize:14, lineHeight:1.6}}>
            Incluye: Empresa + Módulos + Soporte + Actualizaciones<br/>
            <b>Paga y activa hoy:</b><br/>
            Bancolombia Ahorros 912-510747-93<br/>
            Nequi 3215981307 - Ivan Andres Cadena Castillo
          </div>
          <a href="https://wa.me/573044019899?text=Quiero%20activar%20STOCKOS%20por%20$22" style={{display:'block', background:VERDE, color:AZUL, padding:'16px', borderRadius:30, fontWeight:800, textDecoration:'none', marginTop:20}}>CREAR MI EMPRESA AHORA</a>
          <p style={{fontSize:11, opacity:0.6, marginTop:10}}>Activación en 15 min por WhatsApp</p>
        </div>
      </section>

      <footer style={{textAlign:'center', padding:20, fontSize:12, color:'#999'}}>© 2026 STOCK OS - Santiago de Cali</footer>
    </div>
  )
}

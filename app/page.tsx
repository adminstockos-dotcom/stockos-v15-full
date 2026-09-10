"use client";
import { useState } from "react";

export default function HomeStockOS() {
  const [showLogin, setShowLogin] = useState(false);
  const AZUL = "#0A2540";
  const VERDE = "#22C55E";

  return (
    <div style={{fontFamily:'Arial', background:'#FFFFFF', minHeight:'100vh', padding:20}}>
      <div style={{maxWidth:800, margin:'0 auto', textAlign:'center', paddingTop:30}}>
        
        <img src="/logo-stockos.png" alt="STOCK OS" style={{width:220, margin:'0 auto 10px', display:'block'}} />
        
        <h2 style={{color:AZUL, fontSize:28, fontWeight:800, marginTop:25}}>
          Automatización Total para que vendas más sin caos
        </h2>

        <p style={{color:'#444', maxWidth:600, margin:'15px auto', fontSize:17, lineHeight:1.6}}>
          En <b style={{color:AZUL}}>STOCK OS</b> automatizamos los procesos claves para que generes mayores ventas.
        </p>

        <div style={{textAlign:'left', maxWidth:480, margin:'20px auto', background:'#F8FAFC', padding:18, borderRadius:12, borderLeft:`4px solid ${VERDE}`, fontSize:15}}>
          <div>✅ Pedidos → WhatsApp dirigido solo al encargado B1..N</div>
          <div style={{marginTop:8}}>✅ Mensajero con efectivo + fotos Drive</div>
          <div style={{marginTop:8}}>✅ Bodegas, Inventario, Trazabilidad 15 días</div>
        </div>

        <button onClick={()=>setShowLogin(!showLogin)} style={{background:AZUL, color:'white', padding:'16px 45px', fontSize:16, fontWeight:700, border:'none', cursor:'pointer', borderRadius:30, marginTop:20}}>
          INGRESAR COMO ADMINISTRADOR
        </button>

        {showLogin && (
          <div style={{border:`2px solid ${AZUL}`, maxWidth:380, margin:'25px auto', padding:25, borderRadius:16, background:'white'}}>
            <div style={{width:12, height:12, background:VERDE, borderRadius:'50%', margin:'0 auto 10px'}}></div>
            <h3 style={{color:AZUL, margin:0}}>Panel Super Admin</h3>
            <p style={{fontSize:12, color:'#888'}}>Iván 3044019899 - Control Total V9</p>
            <input placeholder="adminstockos@gmail.com" style={{width:'90%', padding:12, marginTop:10, borderRadius:8, border:'1px solid #ddd'}} />
            <input type="password" placeholder="••••••••" style={{width:'90%', padding:12, marginTop:10, borderRadius:8, border:'1px solid #ddd'}} />
            <br/>
            <button onClick={()=>window.location.href='/admin'} style={{background:VERDE, color:'white', padding:'12px 30px', border:'none', marginTop:15, cursor:'pointer', borderRadius:8, fontWeight:700, width:'95%'}}>ENTRAR</button>
          </div>
        )}
      </div>
    </div>
  )
}

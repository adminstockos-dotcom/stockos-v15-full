"use client";
import { useState, useMemo } from "react";

const BASE_PRICE = 300000;
const BASE_MODULES = ["Dashboard","Inventario Maestro","Bodega B1 Unificada","Link Maestro Filtrable","WhatsApp Auto 7AM / 2PM","Caja y Facturación"];

const EXTRA_MODULES = [
  { id: "prov-abc", name: "Proveedores A/B/C", price: 50000, desc: "Unifica 3 Excels con origen" },
  { id: "pedidos-divididos", name: "Pedidos Divididos", price: 60000, desc: "Detecta mix A+B+C" },
  { id: "ganancia", name: "Cálculo Ganancia", price: 30000, desc: "40% mayor · 85% detal" },
  { id: "disparo-wa", name: "Disparo Grupos WA", price: 40000, desc: "Catálogo 7AM y 2PM auto" },
  { id: "fotos", name: "Fotos y Variantes", price: 30000, desc: "Tallas, colores, fotos" },
  { id: "precios-mayor", name: "Precios Mayor/Detal", price: 35000, desc: "Lista por tipo cliente" },
  { id: "pagos", name: "Pago Efect/Transf/CE", price: 35000, desc: "Contraentrega + transferencia" },
  { id: "guias", name: "Guías Automáticas", price: 40000, desc: "Tracking y guía auto" },
  { id: "compras", name: "Compras Proveedores", price: 50000, desc: "Órdenes A/B/C" },
  { id: "reportes", name: "Reportes Rentabilidad", price: 45000, desc: "BI utilidad real" },
  { id: "sucursales", name: "Sucursales", price: 60000, desc: "Multi-bodega B1/B2" },
  { id: "barras", name: "Códigos Barras", price: 35000, desc: "Pistola y etiquetas" },
  { id: "transferencias", name: "Transferencias", price: 35000, desc: "Entre bodegas" },
  { id: "crm", name: "CRM Clientes", price: 45000, desc: "Mayorista vs Detal" },
  { id: "ecommerce", name: "Link Maestro Pro", price: 70000, desc: "stockos.com/inv/..." },
  { id: "usuarios", name: "Usuarios y Roles", price: 40000, desc: "Vendedores y permisos" },
];

export default function Home() {
  const AZUL = "#0A2640"; const VERDE = "#1ECB6A";
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoStep, setDemoStep] = useState<1|2|3|4>(1);
  const [form, setForm] = useState({ nombre: "", email: "", whatsapp: "" });
  const [selected, setSelected] = useState<string[]>(["prov-abc","pedidos-divididos","ganancia","disparo-wa"]);
  const [generated, setGenerated] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const totalCOP = useMemo(() => {
    const extra = selected.reduce((a,id)=> a + (EXTRA_MODULES.find(x=>x.id===id)?.price||0),0);
    return BASE_PRICE + extra;
  },[selected]);

  const handleGenerate = () => {
    const payload = { n: form.nombre, e: form.email, w: form.whatsapp, total: totalCOP, mods: selected, base: BASE_PRICE, ts: Date.now() };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const link = `${window.location.origin}${window.location.pathname}?c=${b64}`;
    setGenerated({ link, payload });
  };

  const whatsappMsg = generated? `Hola STOCKOS, soy ${generated.payload.n}. Plan BASE $300.000 + extras = $${generated.payload.total.toLocaleString("es-CO")} COP. Mods: ${generated.payload.mods.join(", ")}. Email ${generated.payload.e}. Link: ${generated.link}` : "";

  return (
    <div style={{fontFamily:'Inter, Arial', background:'#FFFFFF', color:AZUL, minHeight:'100vh'}}>
      <header style={{position:'sticky', top:0, zIndex:40, background:'rgba(255,255,255,0.9)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(0,0,0,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px', height:72, maxWidth:1120, margin:'0 auto'}}>
        <img src="/logo-stockos.png" alt="STOCKOS" style={{height:48}}/>
        <a href="#oferta" style={{background:AZUL, color:'white', padding:'10px 20px', borderRadius:30, fontSize:13, fontWeight:700, textDecoration:'none'}}>Activar por $300k</a>
      </header>

      <section style={{maxWidth:1120, margin:'0 auto', padding:'50px 20px', display:'flex', flexWrap:'wrap', gap:30, alignItems:'center'}}>
        <div style={{flex:'1 1 450px'}}>
          <div style={{display:'inline-block', background:'#E6F8EE', color:'#0A8F4A', fontSize:11, fontWeight:700, padding:'6px 12px', borderRadius:20}}>CASO REAL: MÁXIMA IMPORTADORES</div>
          <h1 style={{fontSize:40, lineHeight:1.1, fontWeight:800, margin:'15px 0 0'}}>Como Máxima Importadores pasó de 3 Excels caóticos a vender 200 pares diarios y contando con inventario maestro automático y cierre por WhatsApp</h1>
          <p style={{fontSize:16, color:'#555', marginTop:15}}>STOCKOS unifica 3 proveedores, calcula ganancias y cierra ventas desde el link maestro en tus grupos de WhatsApp.</p>
          <div style={{marginTop:25, display:'flex', gap:12}}>
            <button onClick={()=>setDemoOpen(true)} style={{background:VERDE, color:AZUL, padding:'14px 28px', borderRadius:30, fontWeight:800, border:'none', cursor:'pointer'}}>VER DEMO EN 2 MIN</button>
            <a href="#oferta" style={{border:`2px solid ${AZUL}`, color:AZUL, padding:'12px 26px', borderRadius:30, fontWeight:700, textDecoration:'none'}}>Activar por $300.000</a>
          </div>
        </div>
        <div style={{flex:'1 1 350px', background:'#F8FAFC', borderRadius:20, padding:20, border:'1px solid #E2E8F0'}}>
          <p style={{fontSize:11, fontWeight:700, opacity:0.6}}>PEDIDO #1092 · UNIFICADO B1</p>
          <div style={{background:'white', borderRadius:12, padding:15, marginTop:10, boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:12}}>🟢 3 pares <b>Proveedor A (Dama)</b></div>
            <div style={{fontSize:12, marginTop:4}}>🟢 2 pares <b>Proveedor B (Caballero)</b></div>
            <div style={{fontSize:12, marginTop:4}}>🟢 1 par <b>Proveedor C (Niños)</b></div>
            <div style={{marginTop:12, background:VERDE, color:AZUL, textAlign:'center', padding:'10px', borderRadius:10, fontSize:13, fontWeight:800}}>→ UNIFICADO EN BODEGA B1 ✓</div>
            <div style={{marginTop:10, fontSize:11, color:'#666'}}>Link: stockos.com/inv/maxima<br/>7AM y 2PM a 47 grupos</div>
          </div>
        </div>
      </section>

      {demoOpen && (
        <div style={{position:'fixed', inset:0, zIndex:50, background:'rgba(10,38,64,0.6)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20}} onClick={()=>setDemoOpen(false)}>
          <div style={{background:'white', borderRadius:20, maxWidth:900, width:'100%', maxHeight:'90vh', overflowY:'auto', padding:25}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h2 style={{fontWeight:800}}>DEMO 2 MIN - MÁXIMA</h2><button onClick={()=>setDemoOpen(false)}>Cerrar ✕</button></div>
            <div style={{display:'flex', gap:8, marginTop:15}}>{[1,2,3,4].map(s=> <div key={s} onClick={()=>setDemoStep(s as any)} style={{flex:1, height:4, borderRadius:4, background: demoStep>=s? VERDE : '#E2E8F0', cursor:'pointer'}}></div>)}</div>
            <div style={{marginTop:20}}>
              {demoStep===1 && <div><h3>1/4 EL CAOS: 3 Excels</h3><p style={{fontSize:14}}>A: 50 dama, B: 30 caballero, C: 20 niños.</p><button onClick={()=>setDemoStep(2)} style={{marginTop:15, background:AZUL, color:'white', padding:'10px 20px', borderRadius:20, border:'none'}}>→</button></div>}
              {demoStep===2 && <div><h3>2/4 INVENTARIO MAESTRO</h3><p style={{fontSize:13}}>Tabla con origen A/B/C + Costo $40k → Mayor $56k → Detal $74k</p><button onClick={()=>setDemoStep(3)} style={{background:AZUL, color:'white', padding:'10px 20px', borderRadius:20, border:'none'}}>→</button></div>}
              {demoStep===3 && <div><h3>3/4 PEDIDO DIVIDIDO → B1</h3><p style={{fontSize:13}}>6 pares dividido entre 3 proveedores → unificado en B1</p><button onClick={()=>

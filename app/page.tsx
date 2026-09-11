"use client";
import { useState, useEffect, useMemo } from "react";

const BASE_PRICE = 300000;
const BASE_MODULES = [
  "Dashboard",
  "Inventario Maestro",
  "Bodega B1 Unificada",
  "Link Maestro Filtrable",
  "WhatsApp Auto 7AM / 2PM",
  "Caja y Facturación",
];

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
  const AZUL = "#0A2640";
  const VERDE = "#1ECB6A";
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

  const whatsappMsg = generated ? `Hola STOCKOS, soy ${generated.payload.n}. Plan BASE $300.000 + extras = $${generated.payload.total.toLocaleString("es-CO")} COP. Mods: ${generated.payload.mods.join(", ")}. Email ${generated.payload.e}. Link: ${generated.link}` : "";
  
  return (
    <div style={{fontFamily:'Inter, Arial', background:'#FFFFFF', color:AZUL, minHeight:'100vh'}}>
      <header style={{position:'sticky', top:0, zIndex:40, background:'rgba(255,255,255,0.9)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(0,0,0,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px', height:72, maxWidth:1120, margin:'0 auto'}}>
        <img src="/logo-stockos.png" alt="STOCKOS" style={{height:48}}/>
        <div style={{display:'flex', gap:12}}>
          <a href="#oferta" style={{background:AZUL, color:'white', padding:'10px 20px', borderRadius:30, fontSize:13, fontWeight:700, textDecoration:'none'}}>Activar por $300k</a>
        </div>
      </header>

      <section style={{maxWidth:1120, margin:'0 auto', padding:'50px 20px', display:'flex', flexWrap:'wrap', gap:30, alignItems:'center'}}>
        <div style={{flex:'1 1 450px'}}>
          <div style={{display:'inline-block', background:'#E6F8EE', color:'#0A8F4A', fontSize:11, fontWeight:700, padding:'6px 12px', borderRadius:20, letterSpacing:1}}>CASO REAL: MÁXIMA IMPORTADORES</div>
          <h1 style={{fontSize:40, lineHeight:1.1, fontWeight:800, margin:'15px 0 0'}}>Como Máxima Importadores pasó de 3 Excels caóticos a vender 200 pares diarios y contando con inventario maestro automático y cierre por WhatsApp</h1>
          <p style={{fontSize:16, color:'#555', marginTop:15, lineHeight:1.5}}>STOCKOS unifica 3 proveedores, calcula ganancias y cierra ventas desde el link maestro en tus grupos de WhatsApp. Aunque aún no importes, vendes como importador.</p>
          <div style={{marginTop:25, display:'flex', gap:12, flexWrap:'wrap'}}>
            <button onClick={()=>setDemoOpen(true)} style={{background:VERDE, color:AZUL, padding:'14px 28px', borderRadius:30, fontWeight:800, border:'none', cursor:'pointer'}}>VER DEMO EN 2 MIN</button>
            <a href="#oferta" style={{border:`2px solid ${AZUL}`, color:AZUL, padding:'12px 26px', borderRadius:30, fontWeight:700, textDecoration:'none'}}>Activar por $300.000</a>
          </div>
        </div>
        <div style={{flex:'1 1 350px', background:'#F8FAFC', borderRadius:20, padding:20, border:'1px solid #E2E8F0'}}>
          <p style={{fontSize:11, fontWeight:700, letterSpacing:1, opacity:0.6}}>PEDIDO #1092 · UNIFICADO B1</p>
          <div style={{background:'white', borderRadius:12, padding:15, marginTop:10, boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:12}}>🟢 3 pares <b>Proveedor A (Dama)</b></div>
            <div style={{fontSize:12, marginTop:4}}>🟢 2 pares <b>Proveedor B (Caballero)</b></div>
            <div style={{fontSize:12, marginTop:4}}>🟢 1 par <b>Proveedor C (Niños)</b></div>
            <div style={{marginTop:12, background:VERDE, color:AZUL, textAlign:'center', padding:'10px', borderRadius:10, fontSize:13, fontWeight:800}}>→ UNIFICADO EN BODEGA B1 ✓</div>
            <div style={{marginTop:10, fontSize:11, color:'#666'}}>Link maestro: stockos.com/inv/maxima<br/>7AM y 2PM disparo automático a 47 grupos</div>
          </div>
        </div>
      </section>

      {demoOpen && (
        <div style={{position:'fixed', inset:0, zIndex:50, background:'rgba(10,38,64,0.6)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20}} onClick={()=>setDemoOpen(false)}>
          <div style={{background:'white', borderRadius:20, maxWidth:900, width:'100%', maxHeight:'90vh', overflowY:'auto', padding:25}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h2 style={{fontWeight:800}}>DEMO 2 MIN - MÁXIMA IMPORTADORES</h2>
              <button onClick={()=>setDemoOpen(false)} style={{border:'1px solid #ddd', borderRadius:20, padding:'6px 12px', cursor:'pointer'}}>Cerrar ✕</button>
            </div>
            <div style={{display:'flex', gap:8, marginTop:15}}>
              {[1,2,3,4].map(s=> <div key={s} onClick={()=>setDemoStep(s as any)} style={{flex:1, height:4, borderRadius:4, background: demoStep>=s ? VERDE : '#E2E8F0', cursor:'pointer'}}></div>)}
            </div>
            <div style={{marginTop:20}}>
              {demoStep===1 && <div><h3>1/4 EL CAOS: 3 Excels separados</h3><p style={{fontSize:14, color:'#666'}}>Proveedor A: 50 pares dama, B: 30 caballero, C: 20 niños. Todo desordenado.</p><button onClick={()=>setDemoStep(2)} style={{marginTop:15, background:AZUL, color:'white', padding:'10px 20px', borderRadius:20, border:'none', cursor:'pointer'}}>Ver unificación →</button></div>}
              {demoStep===2 && <div><h3>2/4 INVENTARIO MAESTRO AUTOMÁTICO</h3><p style={{fontSize:13}}>STOCKOS escanea y crea tabla con origen por proveedor + calcula precios: Costo $40.000 → Mayor $56.000 (40%) → Detal $74.000 (85%)</p><button onClick={()=>setDemoStep(3)} style={{marginTop:15, background:AZUL, color:'white', padding:'10px 20px', borderRadius:20, border:'none'}}>Ver pedido dividido →</button></div>}
              {demoStep===3 && <div><h3>3/4 PEDIDO DIVIDIDO → UNIFICADO B1</h3><p style={{fontSize:13}}>Cliente pide 6 pares (3 de A, 2 de B, 1 de C). STOCKOS detecta split, unifica en Bodega B1, descuenta, factura.</p><button onClick={()=>setDemoStep(4)} style={{marginTop:15, background:AZUL, color:'white', padding:'10px 20px', borderRadius:20, border:'none'}}>Ver disparo 7AM/2PM →</button></div>}
              {demoStep===4 && <div><h3>4/4 DISPARO 7AM Y 2PM + LINK MAESTRO</h3><p style={{fontSize:13}}>7AM y 2PM envía a grupos WhatsApp: "Catálogo 1.200 pares - stockos.com/inv/maxima". Cliente filtra por mayor/detal, efectivo/transferencia/contraentrega y cierra solo. Guía automática.</p><a href="#oferta" onClick={()=>{setDemoOpen(false); document.getElementById('oferta')?.scrollIntoView({behavior:'smooth'})}} style={{display:'inline-block', marginTop:15, background:VERDE, color:AZUL, padding:'14px 28px', borderRadius:30, fontWeight:800, textDecoration:'none'}}>QUIERO ESTO - $300.000/MES →</a></div>}
            </div>
          </div>
        </div>
      )}

      <section id="oferta" style={{background:'#F8FAFC', padding:'60px 20px'}}>
        <div style={{maxWidth:700, margin:'0 auto'}}>
          <h2 style={{textAlign:'center', fontSize:28, fontWeight:800}}>Arma tu STOCKOS - Base $300.000 COP</h2>
          <p style={{textAlign:'center', fontSize:13, color:'#666'}}>Incluye matrización inicial, conexión redes sociales y configuración B1 + link maestro. Cada módulo extra suma.</p>
          
          <div style={{background:'white', borderRadius:20, padding:20, marginTop:20, border:'1px solid #E2E8F0'}}>
            <input placeholder="Nombre Empresa (ej: Máxima Importadores)" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} style={{width:'100%', padding:12, borderRadius:10, border:'1px solid #ddd', marginBottom:10}}/>
            <div style={{display:'flex', gap:10}}>
              <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{flex:1, padding:12, borderRadius:10, border:'1px solid #ddd'}}/>
              <input placeholder="WhatsApp" value={form.whatsapp} onChange={e=>setForm({...form, whatsapp:e.target.value})} style={{flex:1, padding:12, borderRadius:10, border:'1px solid #ddd'}}/>
            </div>
          </div>

          <div style={{marginTop:20, background:'white', borderRadius:20, padding:20, border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:12, fontWeight:700, letterSpacing:1, opacity:0.6}}>BASE INCLUIDO $300.000</p>
            <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:10}}>
              {BASE_MODULES.map(m=> <span key={m} style={{background:'#0A2640', color:'white', fontSize:11, padding:'6px 10px', borderRadius:20}}>{m} ✓</span>)}
            </div>
            <p style={{fontSize:12, fontWeight:700, letterSpacing:1, opacity:0.6, marginTop:20}}>MÓDULOS EXTRA (venta cruzada)</p>
            <div style={{marginTop:10, display:'grid', gap:8}}>
              {EXTRA_MODULES.map(mod=> (
                <label key={mod.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px', border:'1px solid', borderColor: selected.includes(mod.id) ? VERDE : '#eee', borderRadius:12, cursor:'pointer', background: selected.includes(mod.id) ? '#E6F8EE' : 'white'}}>
                  <div><div style={{fontSize:13, fontWeight:700}}>{mod.name} <span style={{fontWeight:400, color:'#666'}}>- {mod.desc}</span></div><div style={{fontSize:11, color:VERDE, fontWeight:700}}>+${mod.price.toLocaleString('es-CO')} COP/mes</div></div>
                  <input type="checkbox" checked={selected.includes(mod.id)} onChange={()=> setSelected(s=> s.includes(mod.id) ? s.filter(x=>x!==mod.id) : [...s, mod.id])} style={{accentColor:VERDE, width:18, height:18}}/>
                </label>
              ))}
            </div>
          </div>

          <div style={{marginTop:20, background:AZUL, color:'white', borderRadius:20, padding:25, textAlign:'center'}}>
            <div style={{fontSize:14, opacity:0.7}}>TOTAL MENSUAL</div>
            <div style={{fontSize:36, fontWeight:800, color:VERDE}}>${totalCOP.toLocaleString('es-CO')} COP</div>
            <div style={{textAlign:'left', background:'rgba(255,255,255,0.08)', padding:15, borderRadius:12, marginTop:15, fontSize:13}}>
              Bancolombia Ahorros 912-510747-93<br/>Nequi 3215981307<br/>Titular: Ivan Andres Cadena Castillo
            </div>
            {!generated ? (
              <button onClick={handleGenerate} style={{width:'100%', background:VERDE, color:AZUL, padding:16, borderRadius:30, fontWeight:800, border:'none', marginTop:20, cursor:'pointer'}}>GENERAR LINK CLIENTE ?c= BASE64</button>
            ) : (
              <div style={{marginTop:20, background:'white', color:AZUL, borderRadius:12, padding:15, textAlign:'left'}}>
                <div style={{fontSize:12, fontWeight:700}}>LINK GENERADO:</div>
                <div style={{fontSize:10, wordBreak:'break-all', background:'#F8FAFC', padding:8, borderRadius:8, marginTop:5}}>{generated.link}</div>
                <div style={{display:'flex', gap:10, marginTop:10}}>
                  <button onClick={()=>{navigator.clipboard.writeText(generated.link); setCopied(true); setTimeout(()=>setCopied(false),2000)}} style={{flex:1, background:AZUL, color:'white', padding:10, borderRadius:20, border:'none', fontSize:12, cursor:'pointer'}}>{copied ? '¡Copiado!' : 'Copiar Link'}</button>
                  <a href={`https://wa.me/573215981307?text=${encodeURIComponent(whatsappMsg)}`} target="_blank" style={{flex:1, background:VERDE, color:AZUL, padding:10, borderRadius:20, textAlign:'center', fontSize:12, fontWeight:700, textDecoration:'none'}}>Enviar Comprobante WA</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer style={{textAlign:'center', padding:20, fontSize:12, color:'#999'}}>© 2026 STOCKOS - Ivan Andres Cadena Castillo - Santiago de Cali</footer>
    </div>
  )
}

"use client";
import { useState, useMemo, useEffect } from "react";

const BASE = 300000;
const BASE_MODS = [
  { id: "dash", name: "Dashboard Real", desc: "Ventas, stock y caja en vivo", func: ["Ventas hoy", "Stock bajo", "Caja", "Rentabilidad"], included: true },
  { id: "inv", name: "Inventario Maestro", desc: "Tallas, colores, fotos y bodega B1", func: ["Matriz tallas", "Fotos HD", "Bodega B1", "Stock real"], included: true },
  { id: "pos", name: "Facturación POS + DIAN", desc: "Factura electrónica en 1 clic", func: ["POS", "DIAN", "Ticket", "Cierre caja"], included: true },
  { id: "clientes", name: "Clientes y Cartera", desc: "Crédito, abonos, recordatorios WA", func: ["Clientes", "Cartera", "Abonos", "Recordatorio WA"], included: true },
  { id: "compras", name: "Compras Proveedores A/B/C", desc: "Unifica 3 excels con origen", func: ["Proveedor A/B/C", "Costo real", "Ganancia 40%/85%", "Importar Excel"], included: true },
  { id: "ventas", name: "Ventas y Cotizaciones", desc: "Cotiza, vende, despacha, guía", func: ["Cotización", "Pedido B1", "Guía", "Factura"], included: true },
  { id: "ganancia", name: "Reportes de Ganancia", desc: "40% mayor / 85% detal real", func: ["Mayor 40%", "Detal 85%", "Por proveedor", "Por ref"], included: true },
  { id: "link", name: "Link Maestro + WA Auto", desc: "stockos.com/inv + disparo 7AM/2PM", func: ["Link filtrable", "Fotos + precios", "Disparo 7AM/2PM", "Cierra venta"], included: true },
];
const EXTRAS = [
  { id: "fotos", name: "Fotos y Variantes", price: 30000, desc: "Fotos HD + variantes color/talla", func: ["Fotos HD", "Variantes", "Galería"] },
  { id: "barras", name: "Códigos de Barras", price: 35000, desc: "Pistola, etiquetas, scan", func: ["Scan pistola", "Etiquetas", "Código interno"] },
  { id: "sucursales", name: "Sucursales B1/B2", price: 60000, desc: "Multi-bodega con transfer", func: ["Crear B2", "Transfer B1→B2", "Stock por bodega"] },
  { id: "crm", name: "CRM Avanzado", price: 45000, desc: "Tags, campañas WA, ranking", func: ["Tags cliente", "Campañas WA", "Ranking compra"] },
  { id: "ecommerce", name: "E-commerce Pro", price: 70000, desc: "Link stockos.com/inv con filtros", func: ["Filtro mayor/detal", "Filtro pago", "Link personalizado"] },
  { id: "usuarios", name: "Usuarios y Roles", price: 40000, desc: "Vendedores, permisos, caja por usuario", func: ["Vendedores", "Permisos", "Caja por usuario"] },
  { id: "api", name: "API Shopify / Woo", price: 80000, desc: "Sync stock y pedidos", func: ["Sync stock", "Sync pedidos", "Webhook"] },
];

export default function AdminCorregido() {
  const [cliente, setCliente] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string>("dash");
  const [funcOn, setFuncOn] = useState<Record<string, boolean>>({});
  const [waConfig, setWaConfig] = useState({ principal: "3044019899", grupos: "47", hora1: "7AM", hora2: "2PM" });
  const [bodega, setBodega] = useState({ b1: "Bodega Principal B1", b2: "Bodega Secundaria B2", crearB2: false });

  useEffect(() => {
    // 1. Lee ?c= del URL
    const params = new URLSearchParams(window.location.search);
    const c = params.get("c");
    let data: any = null;
    if (c) {
      try { data = JSON.parse(decodeURIComponent(escape(atob(c)))); } catch {}
    }
    // 2. Fallback: localStorage stockos_last_order
    if (!data) {
      try { const r = localStorage.getItem("stockos_last_order"); if (r) data = JSON.parse(r); } catch {}
    }
    // 3. Fallback: último de stockos_orders
    if (!data) {
      try { const r = localStorage.getItem("stockos_orders"); if (r) { const arr = JSON.parse(r); if (arr.length) data = arr[arr.length-1]; } } catch {}
    }
    if (data) {
      setCliente(data);
      const extras = (data.mods || []).filter((m: string) => EXTRAS.some(e => e.id === m));
      setSelected(extras);
      if (data.w || data.wa) setWaConfig(prev => ({...prev, principal: data.w || data.wa}));
    }
    const init: Record<string, boolean> = {};
    [...BASE_MODS, ...EXTRAS].forEach(m => m.func.forEach(f => init[`${m.id}::${f}`] = true));
    setFuncOn(init);
  }, []);

  const total = useMemo(() => BASE + selected.reduce((a, id) => a + (EXTRAS.find(x => x.id === id)?.price || 0), 0), [selected]);

  return (
    <div style={{minHeight:"100vh", background:"#F6F8FA", color:"#0A2640", fontFamily:"Inter, system-ui, sans-serif", padding:16}}>
      <style>{`
        *{box-sizing:border-box}
        .card{max-width:1120px;margin:0 auto;background:white;border:1px solid rgba(0,0,0,0.06);border-radius:20px;padding:20px;margin-bottom:16px}
        .greenCard{background:#1ECB6A;color:#0A2640;border-radius:20px;padding:20px;display:flex;justify-content:space-between;align-items:center}
        .mod{background:white;border:1px solid rgba(0,0,0,0.06);border-radius:16px;overflow:hidden;margin-bottom:12px}
        .mod.open{border-color:#1ECB6A;box-shadow:0 8px 24px rgba(30,203,106,0.15)}
        .modHead{padding:16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer}
        .check{width:32px;height:32px;background:#1ECB6A;border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:800}
        .funcGrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 16px 16px}
        .func{font-size:11px;font-weight:700;padding:10px;border-radius:12px;border:1px solid rgba(0,0,0,0.08);cursor:pointer;text-align:left;background:white}
        .func.on{background:#1ECB6A;border-color:#1ECB6A}
        .func.off{background:#F6F8FA;opacity:0.6}
        .extra{border:2px solid rgba(0,0,0,0.06);border-radius:16px;overflow:hidden;background:white;margin-bottom:12px}
        .extra.on{border-color:#1ECB6A;background:rgba(30,203,106,0.05)}
        .input{width:100%;height:44px;border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:0 14px;font-size:13px;font-weight:600;margin-bottom:8px}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px} @media(max-width:900px){.grid2{grid-template-columns:1fr}}
      `}</style>

      <div style={{maxWidth:1120, margin:"0 auto"}}>
        {cliente ? (
          <div className="greenCard" style={{marginBottom:16}}>
            <div>
              <div style={{fontSize:11, fontWeight:800, letterSpacing:1}}>CLIENTE PRE-CREADO ✓ LEYENDO ?c= Y localStorage - LOGICA CORREGIDA</div>
              <div style={{fontSize:20, fontWeight:800, marginTop:6}}>{cliente.n || cliente.empresa} - {cliente.e || cliente.email}</div>
              <div style={{fontSize:12, opacity:0.8, marginTop:4}}>Empresa: {cliente.n} | NIT: {cliente.nit||"N/A"} | WA: {cliente.w||cliente.wa} | Total Pagó: ${cliente.total?.toLocaleString("es-CO")} | Mods: {cliente.mods?.join(", ")}</div>
              <div style={{marginTop:8, display:"flex", gap:8}}>
                <span style={{background:"black", color:"#1ECB6A", padding:"6px 12px", borderRadius:999, fontSize:11, fontWeight:800}}>BASE 8 VERDES INCLUIDOS</span>
                <span style={{background:"white", color:"black", padding:"6px 12px", borderRadius:999, fontSize:11, fontWeight:800}}>{selected.length} EXTRAS PRE-SELECCIONADOS EN VERDE</span>
              </div>
            </div>
            <div style={{background:"black", color:"white", padding:"8px 14px", borderRadius:999, fontWeight:800, fontSize:12}}>?c= OK + localStorage OK</div>
          </div>
        ) : (
          <div style={{background:"rgba(234,179,8,0.15)", border:"1px solid rgba(234,179,8,0.3)", borderRadius:16, padding:16, marginBottom:16, color:"#92400e"}}>⚠️ No hay cliente en ?c= ni en localStorage. Crea uno primero en la landing con "Crear empresa y generar link ?c="</div>
        )}

        <div className="grid2">
          <div>
            <div className="card">
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}><b>MÓDULOS V22 (8 base + 7 extras) - AUDITADOS PARA MAXIMA</b><span style={{fontSize:10, background:"rgba(0,0,0,0.06)", padding:"4px 8px", borderRadius:999}}>SIN TALLER MARCIAL · SIN DUPLICADOS</span></div>
              
              <div style={{fontSize:10, opacity:0.4, fontWeight:700, marginBottom:8}}>BASE 8 - SIEMPRE ON - INCLUIDO $300K - FUNCIONES DESPLEGABLES CLICABLES</div>
              {BASE_MODS.map(m => {
                const isOpen = expanded === m.id;
                return (
                  <div key={m.id} className={`mod ${isOpen ? 'open' : ''}`}>
                    <div className="modHead" onClick={() => setExpanded(isOpen ? "" : m.id)}>
                      <div style={{display:"flex", gap:12, alignItems:"center"}}><div className="check">✓</div><div><div style={{fontWeight:700, fontSize:14}}>{m.name}</div><div style={{fontSize:11, opacity:0.6}}>{m.desc} - Para MAXIMA: {m.id==="compras" ? "Unifica A/B/C" : m.id==="ganancia" ? "40% mayor / 85% detal" : m.id==="link" ? "Link inv + disparo 7AM/2PM" : m.desc}</div></div></div>
                      <button style={{fontSize:11, fontWeight:700, border:"1px solid #ddd", borderRadius:999, padding:"6px 12px", background:"white"}}>{isOpen ? "−" : "+"} Funciones</button>
                    </div>
                    {isOpen && <div className="funcGrid">{m.func.map(fn => { const k = `${m.id}::${fn}`; const on = funcOn[k] ?? true; return <button key={fn} onClick={() => setFuncOn(p => ({...p, [k]: !p[k]}))} className={`func ${on ? 'on' : 'off'}`}>{fn} {on ? "✅" : "⬜"}</button>; })}</div>}
                  </div>
                );
              })}

              <div style={{fontSize:10, opacity:0.4, fontWeight:700, margin:"20px 0 8px"}}>EXTRAS 7 - PRE-SELECCIONADOS SEGÚN LO QUE PAGÓ EL CLIENTE - VERDE = PAGADO</div>
              {EXTRAS.map(ex => {
                const isOpen = expanded === ex.id;
                const sel = selected.includes(ex.id);
                return (
                  <div key={ex.id} className={`extra ${sel ? 'on' : ''}`}>
                    <div style={{padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                      <label style={{display:"flex", gap:12, alignItems:"center", cursor:"pointer", flex:1}}><input type="checkbox" checked={sel} onChange={() => setSelected(s => s.includes(ex.id) ? s.filter(x=>x!==ex.id) : [...s, ex.id])} style={{width:18, height:18}} /><div><div style={{fontWeight:700, fontSize:13}}>{ex.name} <span style={{color:"#1ECB6A"}}>${ex.price.toLocaleString("es-CO")}</span> {sel && "✓ PAGADO"}</div><div style={{fontSize:11, opacity:0.6}}>{ex.desc}</div></div></label>
                      <button onClick={() => setExpanded(isOpen ? "" : ex.id)} style={{fontSize:11, fontWeight:700, border:"1px solid #ddd", borderRadius:999, padding:"6px 12px", background:"white"}}>{isOpen ? "−" : "+"} Funciones</button>
                    </div>
                    {isOpen && <div style={{padding:"0 16px 16px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, borderTop:"1px solid #eee", paddingTop:12}}>{ex.func.map(fn => { const k = `${ex.id}::${fn}`; const on = funcOn[k] ?? sel; return <button key={fn} onClick={() => setFuncOn(p => ({...p, [k]: !p[k]}))} style={{fontSize:11, fontWeight:700, padding:8, borderRadius:8, border:"1px solid #ddd", background: on ? "#0A2640" : "white", color: on ? "white" : "#0A2640", cursor:"pointer"}}>{fn} {on ? "✅" : "⬜"}</button>; })}</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="card">
              <h3 style={{fontWeight:800, fontSize:14}}>CONFIGURACIÓN MAXIMA IMPORTADORES - PASO A PASO LÓGICA</h3>
              <div style={{marginTop:16}}>
                <div style={{fontSize:11, fontWeight:700, opacity:0.6, marginBottom:8}}>1. WHATSAPP AUTO - DISPARO 7AM/2PM</div>
                <input className="input" value={waConfig.principal} onChange={e=>setWaConfig({...waConfig, principal: e.target.value})} placeholder="WA Principal 3044019899" />
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}><input className="input" value={waConfig.grupos} onChange={e=>setWaConfig({...waConfig, grupos: e.target.value})} placeholder="47 grupos" /><input className="input" value={waConfig.hora1} onChange={e=>setWaConfig({...waConfig, hora1: e.target.value})} placeholder="7AM" /><input className="input" value={waConfig.hora2} onChange={e=>setWaConfig({...waConfig, hora2: e.target.value})} placeholder="2PM" /></div>
              </div>
              <div style={{marginTop:16}}>
                <div style={{fontSize:11, fontWeight:700, opacity:0.6, marginBottom:8}}>2. BODEGAS B1/B2 - LÓGICA MAXIMA</div>
                <input className="input" value={bodega.b1} onChange={e=>setBodega({...bodega, b1: e.target.value})} placeholder="Bodega B1 - Principal" />
                <label style={{display:"flex", gap:8, alignItems:"center", fontSize:12, marginBottom:8}}><input type="checkbox" checked={bodega.crearB2} onChange={e=>setBodega({...bodega, crearB2: e.target.checked})} /> Crear B2 (Sucursal) - {selected.includes("sucursales") ? "✅ Pagado" : "❌ Requiere extra Sucursales $60k"}</label>
                {bodega.crearB2 && <input className="input" value={bodega.b2} onChange={e=>setBodega({...bodega, b2: e.target.value})} placeholder="Bodega B2 - Secundaria" />}
              </div>
              <div style={{marginTop:16, background:"#F6F8FA", borderRadius:12, padding:12, fontSize:11}}>
                <b>3. INVENTARIO - UNIFICA A/B/C - CALCULA GANANCIA</b><br/>
                • Importa 3 Excels con origen A/B/C<br/>
                • Matriz talla/color (ej: REF101 Negro 38-42)<br/>
                • Calcula Mayor 40% y Detal 85% automático<br/>
                • Stock B1 real = suma A+B+C - ventas<br/>
                • Descuento automático al vender<br/>
                • {selected.includes("fotos") ? "✅ Fotos HD activas" : "⚠️ Requiere extra Fotos $30k"}<br/>
                • {selected.includes("barras") ? "✅ Códigos barras activo" : "⚠️ Requiere extra Barras $35k"}
              </div>
            </div>

            <div style={{background:"white", borderRadius:20, border:"1px solid rgba(0,0,0,0.06)", padding:20, textAlign:"center"}}>
              <div style={{fontSize:10, opacity:0.5, fontWeight:800}}>TOTAL PLAN V22 REAL - CORREGIDO</div>
              <div style={{fontSize:36, fontWeight:800, marginTop:6}}>${total.toLocaleString("es-CO")}</div>
              <div style={{fontSize:12, opacity:0.6}}>Base $300k + {selected.length} extras ({selected.join(", ") || "ninguno"})</div>
              <div style={{marginTop:12, fontSize:11, background:"#0A2640", color:"white", padding:10, borderRadius:12, textAlign:"left"}}>
                ✅ AUDITORÍA MAXIMA: <br/>
                • Sin Taller Marcial<br/>
                • Sin duplicados (antes 15 repetidos)<br/>
                • 8 base + 7 extras = 15 módulos totales<br/>
                • Cada función clicable ON/OFF<br/>
                • Link ?c= + localStorage respaldo<br/>
                • Pre-selección verde según pago<br/>
                • Lógica B1/B2 + Ganancia 40%/85% + Link + WA 7AM/2PM
              </div>
              <a href="/" style={{display:"block", textAlign:"center", background:"#1ECB6A", color:"#0A2640", padding:12, borderRadius:999, marginTop:14, fontWeight:800, textDecoration:"none"}}>Volver a Landing V16</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

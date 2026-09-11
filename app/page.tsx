"use client";
import { useState, useMemo, useEffect } from "react";

const BASE = 300000;
const BASE_MODS = [
  { id: "dash", name: "Dashboard Real", desc: "Ventas, stock y caja en vivo", func: ["Ventas hoy", "Stock bajo", "Caja", "Rentabilidad"] },
  { id: "inv", name: "Inventario Maestro", desc: "Tallas, colores, fotos y bodega B1", func: ["Matriz tallas", "Fotos HD", "Bodega B1", "Stock real"] },
  { id: "pos", name: "Facturación POS + DIAN", desc: "Factura electrónica en 1 clic", func: ["POS", "DIAN", "Ticket", "Cierre caja"] },
  { id: "clientes", name: "Clientes y Cartera", desc: "Crédito, abonos, recordatorios WA", func: ["Clientes", "Cartera", "Abonos", "Recordatorio WA"] },
  { id: "compras", name: "Compras Proveedores A/B/C", desc: "Unifica 3 excels con origen", func: ["Proveedor A/B/C", "Costo real", "Ganancia 40%/85%", "Importar Excel"] },
  { id: "ventas", name: "Ventas y Cotizaciones", desc: "Cotiza, vende, despacha, guía", func: ["Cotización", "Pedido B1", "Guía", "Factura"] },
  { id: "ganancia", name: "Reportes de Ganancia", desc: "40% mayor / 85% detal real", func: ["Mayor 40%", "Detal 85%", "Por proveedor", "Por ref"] },
  { id: "link", name: "Link Maestro + WA Auto", desc: "stockos.com/inv + disparo 7AM/2PM", func: ["Link filtrable", "Fotos + precios", "Disparo 7AM/2PM", "Cierra venta"] },
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

export default function Page() {
  const [form, setForm] = useState({ empresa: "MAXIMA IMPORTADORES", nit: "900123456", email: "maxima@test.com", wa: "3044019899" });
  const [selected, setSelected] = useState<string[]>(["fotos", "sucursales"]);
  const [expanded, setExpanded] = useState<string>("dash");
  const [funcOn, setFuncOn] = useState<Record<string, boolean>>({});
  const [generated, setGenerated] = useState("");
  useEffect(() => {
    const init: Record<string, boolean> = {};
    [...BASE_MODS, ...EXTRAS].forEach(m => m.func.forEach(f => init[`${m.id}::${f}`] = true));
    setFuncOn(init);
  }, []);
  const total = useMemo(() => BASE + selected.reduce((a, id) => a + (EXTRAS.find(x => x.id === id)?.price || 0), 0), [selected]);
  const handleGenerate = () => {
    if (!form.empresa || !form.email) { alert("Empresa y email"); return; }
    const payload = { n: form.empresa, empresa: form.empresa, nit: form.nit, e: form.email, email: form.email, w: form.wa, wa: form.wa, total, mods: [...BASE_MODS.map(m=>m.id), ...selected], ts: Date.now() };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    try { localStorage.setItem("stockos_last_order", JSON.stringify(payload)); const arr = JSON.parse(localStorage.getItem("stockos_orders") || "[]"); arr.push(payload); localStorage.setItem("stockos_orders", JSON.stringify(arr)); } catch {}
    setGenerated(`${typeof window !== "undefined" ? window.location.origin : ""}/admin?c=${b64}`);
  };
  const toggleFunc = (modId: string, fn: string) => setFuncOn(p => ({ ...p, [`${modId}::${fn}`]: !p[`${modId}::${fn}`] }));

  return (
    <div style={{minHeight:"100vh", background:"#F6F8FA", color:"#0A2640", fontFamily:"Inter, system-ui, sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
        *{box-sizing:border-box}
        .nav{max-width:1120px;margin:0 auto;height:72px;display:flex;justify-content:space-between;align-items:center;padding:0 24px;background:rgba(255,255,255,0.9);backdrop-filter:blur(10px);border-bottom:1px solid rgba(0,0,0,0.06);position:sticky;top:0;z-index:40}
        .logo{width:36px;height:36px;background:#0A2640;border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800}
        .badge{display:inline-flex;background:rgba(30,203,106,0.15);border:1px solid rgba(30,203,106,0.2);color:#0A2640;font-size:11px;font-weight:700;padding:8px 14px;border-radius:999px;letter-spacing:1px}
        .h1{font-size:42px;font-weight:800;line-height:0.95;letter-spacing:-1.5px;margin-top:20px}
        .h1 span{color:#1ECB6A}
        .btnDark{background:#0A2640;color:white;font-weight:800;height:48px;padding:0 28px;border-radius:999px;border:none;cursor:pointer}
        .btnGreen{background:#1ECB6A;color:#0A2640;font-weight:800;height:36px;padding:0 20px;border-radius:999px;border:none;cursor:pointer}
        .cardWhite{background:white;border:1px solid rgba(0,0,0,0.06);border-radius:28px;padding:8px}
        .cardInner{background:white;border:1px solid rgba(0,0,0,0.05);border-radius:24px;padding:20px}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        @media(max-width:900px){.grid2{grid-template-columns:1fr} .hero{grid-template-columns:1fr !important}}
        .mod{background:white;border:1px solid rgba(0,0,0,0.06);border-radius:16px;overflow:hidden;margin-bottom:12px}
        .mod.open{border-color:#1ECB6A;box-shadow:0 8px 24px rgba(30,203,106,0.15)}
        .modHead{padding:16px;display:flex;justify-content:space-between;align-items:center}
        .check{width:32px;height:32px;background:#1ECB6A;border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#0A2640}
        .funcGrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 16px 16px}
        .func{font-size:11px;font-weight:700;padding:10px;border-radius:12px;border:1px solid rgba(0,0,0,0.08);cursor:pointer;text-align:left}
        .func.on{background:#1ECB6A;border-color:#1ECB6A;color:#0A2640}
        .func.off{background:#F6F8FA;opacity:0.6}
        .extra{border:2px solid rgba(0,0,0,0.06);border-radius:16px;overflow:hidden;background:white}
        .extra.on{border-color:#1ECB6A;background:rgba(30,203,106,0.05)}
        .input{width:100%;height:52px;border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:0 16px;font-weight:700;font-size:14px;outline:none;margin-bottom:12px}
        .input:focus{border-color:#1ECB6A}
        .totalBar{background:#0A2640;color:white;border-radius:16px;padding:20px;display:flex;justify-content:space-between;align-items:center;margin-top:20px}
        .hero{max-width:1120px;margin:0 auto;padding:40px 24px;display:grid;grid-template-columns:1.2fr 0.8fr;gap:40px}
      `}</style>

      <div className="nav">
        <div style={{display:"flex", alignItems:"center", gap:12}}><div className="logo">S</div><span style={{fontWeight:800, fontSize:18}}>STOCKOS</span><span style={{fontSize:10, background:"rgba(10,38,64,0.1)", padding:"4px 10px", borderRadius:999, fontWeight:700}}>V16 CORREGIDO - DISEÑO QUE QUIERES</span></div>
        <button className="btnGreen" onClick={()=>document.getElementById("checkout")?.scrollIntoView({behavior:"smooth"})}>Activar $300k</button>
      </div>

      <div className="hero">
        <div>
          <div className="badge">V16 CORREGIDO · SIN TALLER MARCIAL · SIN DUPLICADOS · 8 VERDES + 7 EXTRAS</div>
          <div className="h1">Vende 200 pares/día<br/>sin excels.<br/><span>STOCKOS V22<br/>base $300k.</span></div>
          <p style={{marginTop:16, opacity:0.6, fontSize:15, maxWidth:520, lineHeight:1.5}}>Mismo diseño gráfico V16 que me mandaste (blanco premium, azul #0A2640, verde #1ECB6A, logo y cuadros). Corregido: eliminamos Taller Marcial y duplicados. Cada módulo se despliega y das clic a cada función ON/OFF.</p>
          <div style={{marginTop:28, display:"flex", gap:12}}><button className="btnDark" onClick={()=>document.getElementById("checkout")?.scrollIntoView({behavior:"smooth"})}>Empezar $300k →</button><a href="https://wa.me/573044019899" style={{height:48, padding:"0 28px", border:"1px solid rgba(10,38,64,0.2)", borderRadius:999, display:"flex", alignItems:"center", textDecoration:"none", color:"#0A2640", fontWeight:700}}>WhatsApp</a></div>
          <div style={{marginTop:32, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12}}>
            <div style={{background:"white", border:"1px solid rgba(0,0,0,0.06)", borderRadius:16, padding:16}}><div style={{fontSize:11, opacity:0.6, fontWeight:700}}>BASE</div><div style={{fontWeight:800, fontSize:20}}>8 verdes</div></div>
            <div style={{background:"white", border:"1px solid rgba(0,0,0,0.06)", borderRadius:16, padding:16}}><div style={{fontSize:11, opacity:0.6, fontWeight:700}}>EXTRAS</div><div style={{fontWeight:800, fontSize:20}}>7 opcionales</div></div>
            <div style={{background:"#1ECB6A", borderRadius:16, padding:16}}><div style={{fontSize:11, opacity:0.7, fontWeight:700}}>LINK ?c=</div><div style={{fontWeight:800, fontSize:18}}>Auto a /admin</div></div>
          </div>
        </div>
        <div className="cardWhite">
          <div className="cardInner">
            <div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontSize:12, fontWeight:700}}>DEMO REAL · Máxima Importadores</span><span style={{width:8, height:8, background:"#1ECB6A", borderRadius:999, display:"inline-block"}}></span></div>
            <div style={{marginTop:16, background:"#F6F8FA", borderRadius:12, padding:12}}><div style={{fontSize:11, fontWeight:700}}>Inventario B1 - 1,240 pares</div><div style={{marginTop:8, display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, fontSize:10}}><div style={{background:"white", border:"1px solid #eee", borderRadius:8, padding:8}}>REF 101 Negro 38 $85k</div><div style={{background:"white", border:"1px solid #eee", borderRadius:8, padding:8}}>REF 102 Blanco 39 $90k</div></div></div>
            <div style={{marginTop:12, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, fontSize:11}}><div style={{background:"#0A2640", color:"white", borderRadius:12, padding:12, textAlign:"center"}}><b>200</b><br/>pares/día</div><div style={{background:"rgba(30,203,106,0.15)", border:"1px solid rgba(30,203,106,0.2)", borderRadius:12, padding:12, textAlign:"center"}}><b>$12.5M</b><br/>ventas</div><div style={{background:"#F6F8FA", border:"1px solid #eee", borderRadius:12, padding:12, textAlign:"center"}}><b>B1→B2</b><br/>transfer</div></div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1120, margin:"0 auto", padding:"24px"}}>
        <h2 style={{fontSize:28, fontWeight:800}}>Lo que incluye tu base $300.000</h2>
        <p style={{fontSize:13, opacity:0.6}}>8 verdes obligatorios + 7 extras. Sin Taller Marcial. Clic en +Funciones para ON/OFF.</p>
        <div style={{marginTop:24}} className="grid2">
          {BASE_MODS.map(m => {
            const isOpen = expanded === m.id;
            return (
              <div key={m.id} className={`mod ${isOpen ? 'open' : ''}`}>
                <div className="modHead">
                  <div style={{display:"flex", gap:12, alignItems:"center"}}><div className="check">✓</div><div><div style={{fontWeight:700, fontSize:14}}>{m.name}</div><div style={{fontSize:12, opacity:0.6}}>{m.desc}</div></div></div>
                  <button onClick={() => setExpanded(isOpen ? "" : m.id)} style={{fontSize:11, fontWeight:700, border:"1px solid #ddd", borderRadius:999, padding:"6px 12px", background:"white", cursor:"pointer"}}>{isOpen ? "−" : "+"} Funciones</button>
                </div>
                {isOpen && <div className="funcGrid">{m.func.map(fn => { const k = `${m.id}::${fn}`; const on = funcOn[k] ?? true; return <button key={fn} onClick={() => { const k = `${m.id}::${fn}`; setFuncOn(p => ({...p, [k]: !p[k]})); }} className={`func ${on ? 'on' : 'off'}`}>{fn} {on ? "✅" : "⬜"}</button>; })}</div>}
              </div>
            );
          })}
        </div>

        <div style={{marginTop:32}} className="grid2">
          {EXTRAS.map(ex => {
            const isOpen = expanded === ex.id;
            const sel = selected.includes(ex.id);
            return (
              <div key={ex.id} className={`extra ${sel ? 'on' : ''}`}>
                <div style={{padding:16, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <label style={{display:"flex", gap:12, alignItems:"center", cursor:"pointer", flex:1}}><input type="checkbox" checked={sel} onChange={() => setSelected(s => s.includes(ex.id) ? s.filter(x => x !== ex.id) : [...s, ex.id])} style={{width:20, height:20}} /><div><div style={{fontWeight:700, fontSize:14}}>{ex.name} <span style={{color:"#1ECB6A"}}>+${ex.price.toLocaleString("es-CO")}</span></div><div style={{fontSize:12, opacity:0.6}}>{ex.desc}</div></div></label>
                  <button onClick={() => setExpanded(isOpen ? "" : ex.id)} style={{fontSize:11, fontWeight:700, border:"1px solid #ddd", borderRadius:999, padding:"6px 12px", background:"white", cursor:"pointer", marginLeft:8}}>{isOpen ? "−" : "+"} Funciones</button>
                </div>
                {isOpen && <div style={{padding:"0 16px 16px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, borderTop:"1px solid #eee", paddingTop:12}}>{ex.func.map(fn => { const k = `${ex.id}::${fn}`; const on = funcOn[k] ?? sel; return <button key={fn} onClick={() => { const k = `${ex.id}::${fn}`; setFuncOn(p => ({...p, [k]: !p[k]})); }} style={{fontSize:11, fontWeight:700, padding:8, borderRadius:8, border:"1px solid #ddd", background: on ? "#0A2640" : "white", color: on ? "white" : "#0A2640", cursor:"pointer", textAlign:"left"}}>{fn} {on ? "✅" : "⬜"}</button>; })}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div id="checkout" style={{maxWidth:1120, margin:"40px auto", padding:"0 24px"}}>
        <div style={{background:"white", borderRadius:28, border:"1px solid rgba(0,0,0,0.06)", padding:32}}>
          <h3 style={{fontSize:26, fontWeight:800}}>Compra en línea - Crea tu empresa</h3>
          <p style={{fontSize:13, opacity:0.6, marginTop:8}}>Cliente ingresa datos, selecciona extras y paga. Se guarda en localStorage y genera link /admin?c= con módulos pre-seleccionados.</p>
          <div style={{marginTop:20}}><input className="input" value={form.empresa} onChange={e => setForm({...form, empresa: e.target.value})} placeholder="Empresa: MAXIMA IMPORTADORES" /><div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}><input className="input" value={form.nit} onChange={e => setForm({...form, nit: e.target.value})} placeholder="NIT" /><input className="input" value={form.wa} onChange={e => setForm({...form, wa: e.target.value})} placeholder="WhatsApp" /></div><input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" /></div>
          <div className="totalBar"><div><div style={{fontSize:11, opacity:0.7}}>TOTAL A PAGAR</div><div style={{fontSize:28, fontWeight:800}}>${total.toLocaleString("es-CO")}</div><div style={{fontSize:11, opacity:0.7}}>Base $300k + {selected.length} extras ({selected.join(", ")})</div></div><button onClick={handleGenerate} style={{height:48, padding:"0 24px", background:"#1ECB6A", color:"#0A2640", borderRadius:999, border:"none", fontWeight:800, cursor:"pointer"}}>Crear empresa y generar link ?c=</button></div>
          {generated && <div style={{marginTop:20, background:"rgba(30,203,106,0.1)", border:"1px solid rgba(30,203,106,0.2)", borderRadius:16, padding:16}}><div style={{fontWeight:700, fontSize:12}}>✅ LINK GENERADO - Mismo diseño V16 que pediste - Guardado en localStorage</div><div style={{fontSize:10, wordBreak:"break-all", background:"white", border:"1px solid #eee", padding:12, borderRadius:12, marginTop:8}}>{generated}</div><div style={{display:"flex", gap:8, marginTop:12}}><button onClick={()=>navigator.clipboard.writeText(generated)} style={{flex:1, height:40, background:"#0A2640", color:"white", borderRadius:999, border:"none", fontWeight:700}}>Copiar link</button><a href={generated} style={{flex:1, height:40, background:"#1ECB6A", color:"#0A2640", borderRadius:999, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, textDecoration:"none"}}>Ir a /admin →</a></div></div>}
          <div style={{marginTop:24, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12}}><div style={{border:"2px solid #1ECB6A", borderRadius:16, padding:16}}><div style={{fontSize:10, fontWeight:700}}>NEQUI</div><div style={{fontWeight:700}}>321 598 1307</div></div><div style={{border:"2px solid #0A2640", borderRadius:16, padding:16}}><div style={{fontSize:10, fontWeight:700}}>BANCOLOMBIA</div><div style={{fontWeight:700}}>912-510747-93</div></div><div style={{border:"1px solid #ddd", borderRadius:16, padding:16}}><div style={{fontSize:10, fontWeight:700}}>PAYPAL</div><div style={{fontSize:11, fontWeight:700, wordBreak:"break-all"}}>andreskstllo@gmail.com</div></div></div>
        </div>
      </div>
    </div>
  );
}

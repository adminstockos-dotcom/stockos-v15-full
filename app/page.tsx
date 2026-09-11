"use client";
// @ts-nocheck
import { useState, useEffect } from "react";
const BASE = 300000;
export default function Home() {
  const [empresa, setEmpresa] = useState({ nombre: "Maxima Importadores", nit: "900.123.456-7", wa: "3215981307", email: "adminstockos@gmail.com", ciudad: "Cali" });
  const [proveedores, setProveedores] = useState([
    { id: "b1", nombre: "Proveedor A - Cali Centro", bodega: "B1", ciudad: "Cali" },
    { id: "b2", nombre: "Proveedor B - Mayorista Bogota", bodega: "B2", ciudad: "Bogota" },
    { id: "b3", nombre: "Proveedor C - Importador", bodega: "B3", ciudad: "Medellin" },
  ]);
  const [productos, setProductos] = useState([
    { id: "p1", nombre: "Tenis Runner X", costo: 80000, talla: "38", color: "Negro", stocks: { b1: 5, b2: 3, b3: 0 }, cat: "Tenis" },
    { id: "p2", nombre: "Tenis Runner X", costo: 80000, talla: "39", color: "Blanco", stocks: { b1: 2, b2: 0, b3: 4 }, cat: "Tenis" },
  ]);
  const [paso, setPaso] = useState(0);
  const [mods, setMods] = useState(["prov", "ganancia"]);
  const [linkGen, setLinkGen] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [filtro, setFiltro] = useState("detal");
  const MODULOS_22 = [
    { id: "prov", name: "Proveedores A/B/C a B-Infinito", desc: "B1,B2,B3 hasta B∞", price: 50000 },
    { id: "pedidos", name: "Pedidos divididos unificados", desc: "2 B1 +1 B3 = 1 despacho B1", price: 60000 },
    { id: "ganancia", name: "Ganancia 40% mayor / 85% detal auto", desc: "Calcula precio solo", price: 30000 },
    { id: "compras", name: "Compras a proveedores", desc: "Ordena stock", price: 50000 },
    { id: "multibodega", name: "Multi-bodega B1/B2/B3", desc: "Unifica 3 Excels en 1 Maestro", price: 40000 },
    { id: "link", name: "Link venta automatica ?c=", desc: "Base64 con todo", price: 45000 },
    { id: "filtros", name: "Filtros mayor/detal/pagos", desc: "Filtra link", price: 25000 },
    { id: "wa", name: "Disparo WA 7AM/2PM", desc: "Reporte auto", price: 60000 },
    { id: "paypal", name: "PayPal + Nequi + Bancolombia", desc: "paypal.me/andreskstllo", price: 20000 },
    { id: "factura", name: "Facturacion automatica", desc: "Factura + remision", price: 40000 },
    { id: "clientes", name: "Clientes mayor/detal", desc: "Historial", price: 35000 },
    { id: "tallas", name: "Tallas y colores matricial", desc: "Matriz", price: 30000 },
    { id: "alertas", name: "Alertas stock bajo", desc: "Avisa <5", price: 25000 },
    { id: "excel", name: "Importa 3 Excels desordenados", desc: "A,B,C -> 1 Maestro", price: 70000 },
    { id: "fotos", name: "Fotos por producto", desc: "Galeria WA", price: 20000 },
    { id: "devol", name: "Devoluciones", desc: "Control devol", price: 30000 },
    { id: "conta", name: "Contabilidad ganancia real", desc: "Costo vs venta", price: 50000 },
    { id: "rutas", name: "Rutas despacho B1", desc: "Optimiza", price: 40000 },
    { id: "multiuser", name: "Multi-usuario + roles", desc: "Vendedor,bodega,admin", price: 45000 },
    { id: "offline", name: "Modo offline", desc: "Vende sin internet", price: 35000 },
    { id: "catalogo", name: "Catalogo PDF automatico", desc: "PDF 40/85", price: 30000 },
    { id: "api", name: "API e-commerce", desc: "Shopify/Woo", price: 80000 },
  ];
  const total = BASE + mods.reduce((s, id) => s + (MODULOS_22.find(m => m.id === id)?.price || 0), 0);
  const toB64 = (str) => { if(typeof window==="undefined") return ""; try{ return window.btoa(unescape(encodeURIComponent(str))); }catch{ return window.btoa(str); } };
  const fromB64 = (str) => { if(typeof window==="undefined") return "{}"; try{ return decodeURIComponent(escape(window.atob(str))); }catch{ return window.atob(str); } };
  useEffect(() => { try{ const c=new URLSearchParams(window.location.search).get("c"); if(c){ const data=JSON.parse(fromB64(c)); if(data.empresa) setEmpresa(data.empresa); if(data.proveedores) setProveedores(data.proveedores); if(data.productos) setProductos(data.productos); if(data.mods) setMods(data.mods); } }catch{} }, []);
  const calcMayor=(c)=>Math.round(c*1.4); const calcDetal=(c)=>Math.round(c*1.85);
  const inventarioMaestro=productos.map(p=>{ const totalStock=Object.values(p.stocks).reduce((a,b)=>a+b,0); return {...p, totalStock, mayor: calcMayor(p.costo), detal: calcDetal(p.costo)}; });
  const generarLink=()=>{ const b64=toB64(JSON.stringify({ empresa, proveedores, productos, mods, total, base: BASE })); setLinkGen(window.location.origin+window.location.pathname+"?c="+b64); };
  return (
    <div style={{ fontFamily: "Arial", background: "#F8FFFE", minHeight: "100vh", color: "#0A2640" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, padding: "36px 0 20px" }}>
          <div>
            <div style={{ display: "inline-block", background: "#E6FFF3", color: "#0A7A42", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>STOCKOS V16 - VENTA AUTOMATIZADA</div>
            <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.05, marginTop: 12 }}>De <span style={{ color: "#1ECB6A" }}>3 Excels desordenados</span> a 1 Inventario Maestro que vende solo.</h1>
            <p style={{ marginTop: 12, color: "#475569", fontSize: 14 }}>Si su empresa tiene un caos y pierde ventas buscando quien tiene el producto que necesita vender, STOCKOS automatiza todo lo que hace manual y vende mas en automatico. 40% mayor / 85% detal, pedidos divididos unificados B1, WA 7AM/2PM.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}><button onClick={()=>setPaso(0)} style={{ background: "#1ECB6A", color: "white", padding: "12px 18px", borderRadius: 999, border: "none", fontWeight: 800 }}>Crear mi empresa</button><button onClick={generarLink} style={{ background: "white", padding: "12px 18px", borderRadius: 999, border: "1px solid #E2E8F0", fontWeight: 700 }}>Ver link ?c=</button></div>
          </div>
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", padding: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 12 }}>Inventario Maestro en vivo - Maxima</div>
            {inventarioMaestro.map(p=><div key={p.id} style={{ display: "flex", justifyContent: "space-between", background: "#F8FAFC", padding: "10px", borderRadius: 10, fontSize: 12, marginTop: 8 }}><div><b>{p.nombre}</b> T{p.talla}<br/><span style={{ fontSize: 10 }}>{proveedores.map(pr=>pr.bodega+":"+(p.stocks[pr.id]||0)).join(" ")}</span></div><div style={{ textAlign: "right" }}><div style={{ fontWeight: 800 }}>{p.totalStock} und</div><div>${p.detal.toLocaleString("es-CO")}</div></div></div>)}
            <div style={{ marginTop: 10, background: "#0A2640", color: "white", borderRadius: 10, padding: 10, fontSize: 11 }}>Total: ${total.toLocaleString("es-CO")} COP - Base ${BASE.toLocaleString("es-CO")}</div>
          </div>
        </div>
        <div style={{ background: "#F1F5F9", borderRadius: 16, padding: 16 }}><div style={{ fontWeight: 900, fontSize: 13 }}>BASE DEL PLAN 300.000 $ - 22 modulos totales.</div><div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginTop: 12 }}>{MODULOS_22.map(m=><label key={m.id} style={{ background: mods.includes(m.id)?"#0A2640":"white", color: mods.includes(m.id)?"white":"#0A2640", border: "1px solid #E2E8F0", borderRadius: 10, padding: "8px", fontSize: 10 }}><input type="checkbox" checked={mods.includes(m.id)} onChange={()=>setMods(prev=>prev.includes(m.id)?prev.filter(x=>x!==m.id):[...prev,m.id])} style={{ display: "none" }} /><div style={{ fontWeight: 800 }}>{m.name}</div><div style={{ fontSize: 9 }}>${m.price.toLocaleString("es-CO")}</div></label>)}</div></div>
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16, paddingBottom: 40 }}>
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", padding: 16 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["Empresa","Bodegas B∞","Productos 40/85","Inv Maestro","Link Venta","Prueba Venta Maxima"].map((s,i)=><button key={s} onClick={()=>setPaso(i)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid #E2E8F0", background: paso===i?"#0A2640":"white", color: paso===i?"white":"#0A2640", fontSize: 11 }}>{i+1}. {s}</button>)}</div>
            {paso===0 && <div style={{ marginTop: 16 }}><h3>Paso 1 - Datos de tu empresa</h3><input value={empresa.nombre} onChange={e=>setEmpresa({...empresa, nombre: e.target.value})} placeholder="Maxima Importadores" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} /><input value={empresa.wa} onChange={e=>setEmpresa({...empresa, wa: e.target.value})} placeholder="WhatsApp" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} /></div>}
            {paso===1 && <div style={{ marginTop: 16 }}><h3>Bodegas B1 a B-Infinito</h3>{proveedores.map(p=><div key={p.id} style={{ display: "flex", gap: 8, marginTop: 8 }}><span style={{ background: "#0A2640", color: "white", padding: "4px 8px", borderRadius: 6 }}>{p.bodega}</span><input value={p.nombre} onChange={e=>setProveedores(proveedores.map(x=>x.id===p.id?{...x, nombre: e.target.value}:x))} style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} /></div>)}<button onClick={()=>setProveedores([...proveedores,{ id: "b"+(proveedores.length+1), nombre: "Proveedor "+String.fromCharCode(65+proveedores.length), bodega: "B"+(proveedores.length+1) }])} style={{ marginTop: 10, padding: "8px 14px", borderRadius: 999, background: "#1ECB6A", border: "none" }}>+ Agregar B{proveedores.length+1} hasta B∞</button></div>}
            {paso===4 && <div style={{ marginTop: 16 }}><h3>Link venta automatica ?c=</h3><button onClick={generarLink} style={{ width: "100%", background: "#0A2640", color: "white", padding: 12, borderRadius: 10, fontWeight: 800 }}>GENERAR LINK CORTO</button>{linkGen && <div style={{ marginTop: 8, fontSize: 10, wordBreak: "break-all", background: "#F1F5F9", padding: 8 }}>{linkGen}</div>}</div>}
            {paso===5 && <div style={{ marginTop: 16 }}><h3>Prueba Venta Automatica Maxima</h3>{inventarioMaestro.map(p=><div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: 8, borderBottom: "1px solid #F1F5F9" }}><span>{p.nombre} Stock {p.totalStock} ${p.detal.toLocaleString("es-CO")}</span><button onClick={()=>setCarrito(prev=>{ const ex=prev.find(x=>x.prodId===p.id); if(ex) return prev.map(x=>x.prodId===p.id?{...x, qty: x.qty+1}:x); return [...prev,{ prodId: p.id, qty: 1 }]; })} style={{ padding: "4px 10px", borderRadius: 999, background: "#1ECB6A", border: "none" }}>+ Agregar</button></div>)}<div style={{ marginTop: 10, background: "#F8FAFC", padding: 10, borderRadius: 8 }}>Carrito: {carrito.length===0?"vacio":carrito.map(c=>{ const pr=productos.find(p=>p.id===c.prodId); return pr.nombre+" x"+c.qty; }).join(", ")}</div></div>}
          </div>
          <div style={{ background: "#0A2640", color: "white", borderRadius: 16, padding: 16, height: "fit-content" }}><div style={{ fontSize: 11, opacity: 0.7 }}>Arma tu STOCKOS $300k base + extras</div><div style={{ fontSize: 28, fontWeight: 900 }}>${total.toLocaleString("es-CO")}</div><a href="https://paypal.me/andreskstllo" target="_blank" style={{ display: "block", marginTop: 12, background: "#FFC439", color: "#003087", textAlign: "center", padding: 10, borderRadius: 10, fontWeight: 800, textDecoration: "none" }}>PayPal paypal.me/andreskstllo</a><button onClick={()=>{ const b64=toB64(JSON.stringify({ empresa, proveedores, productos, mods, total })); window.open("https://wa.me/573215981307?text="+encodeURIComponent("Hola STOCKOS soy "+empresa.nombre+" Plan $"+total+" Link: "+window.location.origin+"?c="+b64), "_blank"); }} style={{ width: "100%", marginTop: 10, background: "#25D366", color: "white", padding: 12, borderRadius: 10, fontWeight: 800, border: "none" }}>Enviar WA</button></div>
        </div>
      </div>
    </div>
  );
}

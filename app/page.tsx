"use client";
// @ts-nocheck
import { useState, useEffect } from "react";

const BASE = 300000;

export default function Home() {
  const [empresa, setEmpresa] = useState({ nombre: "Maxima Importadores", wa: "3215981307", email: "adminstockos@gmail.com" });
  const [proveedores, setProveedores] = useState([
    { id: "b1", nombre: "Proveedor A", bodega: "B1" },
    { id: "b2", nombre: "Proveedor B", bodega: "B2" },
    { id: "b3", nombre: "Proveedor C", bodega: "B3" },
  ]);
  const [productos] = useState([
    { id: "p1", nombre: "Tenis Runner X", costo: 80000, talla: "38", stocks: { b1: 5, b2: 3, b3: 0 } },
    { id: "p2", nombre: "Tenis Runner X", costo: 80000, talla: "39", stocks: { b1: 2, b2: 0, b3: 4 } },
  ]);
  const [paso, setPaso] = useState(0);
  const [mods, setMods] = useState([]);
  const [linkGen, setLinkGen] = useState("");

  const MODULES = [
    { id: "prov", name: "Proveedores B Infinito", price: 50000 },
    { id: "pedidos", name: "Pedidos unificados", price: 60000 },
    { id: "ganancia", name: "Ganancia 40pct/85pct", price: 30000 },
  ];

  const total = BASE + mods.reduce((s: any, id: any) => {
    const f: any = MODULES.find((m: any) => m.id === id);
    return s + (f? f.price : 0);
  }, 0);

  const toB64 = (str: string) => {
    if (typeof window === "undefined") return "";
    try { return window.btoa(unescape(encodeURIComponent(str))); } catch { return window.btoa(str); }
  };
  const fromB64 = (str: string) => {
    if (typeof window === "undefined") return "{}";
    try { return decodeURIComponent(escape(window.atob(str))); } catch { return window.atob(str); }
  };

  useEffect(() => {
    try {
      const c = new URLSearchParams(window.location.search).get("c");
      if (c) {
        const data = JSON.parse(fromB64(c));
        if (data.empresa) setEmpresa(data.empresa);
        if (data.proveedores) setProveedores(data.proveedores);
      }
    } catch {}
  }, []);

  const generarLink = () => {
    const b64 = toB64(JSON.stringify({ empresa, proveedores, productos, mods, total }));
    setLinkGen(window.location.origin + window.location.pathname + "?c=" + b64);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#F8FAFC", minHeight: "100vh", color: "#0A2640", padding: 20 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 26, fontWeight: 900 }}>Si su empresa tiene un caos y pierde ventas buscando quien tiene el producto que necesita vender, STOCKOS automatiza todo lo que hace manual y vende mas en automatico.</h1>
        <p style={{ color: "#64748B" }}>Base $300k - B1-B-Infinito - 40pct mayor / 85pct detal - PayPal paypal.me/andreskstllo</p>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button onClick={() => setPaso(0)} style={{ padding: "8px 12px", borderRadius: 999, background: paso===0?"#0A2640":"white", color: paso===0?"white":"#0A2640" }}>1. Empresa</button>
          <button onClick={() => setPaso(1)} style={{ padding: "8px 12px", borderRadius: 999, background: paso===1?"#0A2640":"white", color: paso===1?"white":"#0A2640" }}>2. Bodegas</button>
          <button onClick={() => setPaso(2)} style={{ padding: "8px 12px", borderRadius: 999, background: paso===2?"#0A2640":"white", color: paso===2?"white":"#0A2640" }}>3. Prueba Venta</button>
        </div>
        <div style={{ marginTop: 20, background: "white", padding: 16, borderRadius: 12, border: "1px solid #E2E8F0" }}>
          {paso===0 && <div><h3>Empresa Maxima</h3><input value={empresa.nombre} onChange={(e) => setEmpresa({...empresa, nombre: e.target.value })} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0" }} /></div>}
          {paso===1 && <div><h3>Bodegas B1-Infinito</h3>{proveedores.map((p: any) => <div key={p.id} style={{ marginTop: 8 }}><span style={{ background: "#0A2640", color: "white", padding: "4px 8px", borderRadius: 6 }}>{p.bodega}</span> {p.nombre}</div>)}<button onClick={() => setProveedores([...proveedores, { id: "b"+(proveedores.length+1), nombre: "Proveedor "+String.fromCharCode(65+proveedores.length), bodega: "B"+(proveedores.length+1) }])} style={{ marginTop: 12, padding: "8px 14px", borderRadius: 999, background: "#1ECB6A", border: "none" }}>+ Agregar B{proveedores.length+1}</button></div>}
          {paso===2 && <div><h3>Prueba Venta Automatica</h3><button onClick={generarLink} style={{ width: "100%", padding: 12, background: "#0A2640", color: "white", borderRadius: 10 }}>GENERAR LINK?c=</button>{linkGen && <div style={{ marginTop: 8, fontSize: 10, wordBreak: "break-all", background: "#F1F5F9", padding: 8 }}>{linkGen}</div>}</div>}
        </div>
        <div style={{ marginTop: 12, background: "#0A2640", color: "white", padding: 12, borderRadius: 12 }}>Total: ${total} COP | PayPal: paypal.me/andreskstllo | Bancolombia 912-510747-93</div>
      </div>
    </div>
  );
}

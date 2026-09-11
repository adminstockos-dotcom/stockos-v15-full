"use client";
import { useState, useEffect } from "react";

const BASE = 300000;

export default function Home() {
  const [empresa, setEmpresa] = useState({ nombre: "Maxima Importadores", wa: "3215981307", email: "adminstockos@gmail.com" });
  const [proveedores, setProveedores] = useState([
    { id: "b1", nombre: "Proveedor A", bodega: "B1" },
    { id: "b2", nombre: "Proveedor B", bodega: "B2" },
    { id: "b3", nombre: "Proveedor C", bodega: "B3" },
  ]);
  const [productos, setProductos] = useState([
    { id: "p1", nombre: "Tenis Runner X", costo: 80000, talla: "38", color: "Negro", stocks: { b1: 5, b2: 3, b3: 0 } },
    { id: "p2", nombre: "Tenis Runner X", costo: 80000, talla: "39", color: "Blanco", stocks: { b1: 2, b2: 0, b3: 4 } },
  ]);
  const [paso, setPaso] = useState(0);
  const [mods, setMods] = useState([]);
  const [linkGen, setLinkGen] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [filtro, setFiltro] = useState("detal");

  const MODULES = [
    { id: "prov", name: "Proveedores A/B/C (B Infinito)", price: 50000 },
    { id: "pedidos", name: "Pedidos divididos unificados", price: 60000 },
    { id: "ganancia", name: "Ganancia 40pct / 85pct auto", price: 30000 },
  ];

  const total = BASE + mods.reduce(function(s, id) {
    var f = MODULES.find(function(m) { return m.id === id; });
    return s + (f ? f.price : 0);
  }, 0);

  const addProveedor = function() {
    var n = proveedores.length + 1;
    setProveedores(proveedores.concat([{ id: "b" + n, nombre: "Proveedor " + String.fromCharCode(64 + n), bodega: "B" + n }]));
  };

  const calcMayor = function(costo) { return Math.round(costo * 1.4); };
  const calcDetal = function(costo) { return Math.round(costo * 1.85); };

  const toB64 = function(str) {
    if (typeof window === "undefined") return "";
    try { return window.btoa(unescape(encodeURIComponent(str))); }
    catch (e) { return window.btoa(str); }
  };

  const fromB64 = function(str) {
    if (typeof window === "undefined") return "{}";
    try { return decodeURIComponent(escape(window.atob(str))); }
    catch (e) { return window.atob(str); }
  };

  useEffect(function() {
    try {
      var params = new URLSearchParams(window.location.search);
      var c = params.get("c");
      if (c) {
        var data = JSON.parse(fromB64(c));
        if (data.empresa) setEmpresa(data.empresa);
        if (data.proveedores) setProveedores(data.proveedores);
        if (data.productos) setProductos(data.productos);
      }
    } catch (e) {}
  }, []);

  const generarLink = function() {
    var payload = { empresa: empresa, proveedores: proveedores, productos: productos, mods: mods, total: total };
    var b64 = toB64(JSON.stringify(payload));
    var link = window.location.origin + window.location.pathname + "?c=" + b64;
    setLinkGen(link);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#F8FAFC", minHeight: "100vh", color: "#0A2640", padding: 20 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900 }}>Si su empresa tiene un caos y pierde ventas buscando quien tiene el producto que necesita vender, STOCKOS automatiza todo lo que hace manual y vende mas en automatico.</h1>
        <p style={{ color: "#64748B", marginTop: 8 }}>Base $300.000 COP - B1 B2 B3 hasta B-Infinito - 40pct mayor / 85pct detal - PayPal paypal.me/andreskstllo</p>

        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          <button onClick={function() { setPaso(0); }} style={{ padding: "8px 12px", borderRadius: 999, background: paso === 0 ? "#0A2640" : "white", color: paso === 0 ? "white" : "#0A2640", border: "1px solid #E2E8F0" }}>1. Empresa</button>
          <button onClick={function() { setPaso(1); }} style={{ padding: "8px 12px", borderRadius: 999, background: paso === 1 ? "#0A2640" : "white", color: paso === 1 ? "white" : "#0A2640", border: "1px solid #E2E8F0" }}>2. Bodegas B-Infinito</button>
          <button onClick={function() { setPaso(2); }} style={{ padding: "8px 12px", borderRadius: 999, background: paso === 2 ? "#0A2640" : "white", color: paso === 2 ? "white" : "#0A2640", border: "1px solid #E2E8F0" }}>3. Productos 40/85</button>
          <button onClick={function() { setPaso(3); }} style={{ padding: "8px 12px", borderRadius: 999, background: paso === 3 ? "#0A2640" : "white", color: paso === 3 ? "white" : "#0A2640", border: "1px solid #E2E8F0" }}>4. Prueba Venta</button>
        </div>

        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          <div style={{ background: "white", borderRadius: 12, padding: 16, border: "1px solid #E2E8F0" }}>
            {paso === 0 && (
              <div>
                <h3>1. Crear Empresa Maxima</h3>
                <input value={empresa.nombre} onChange={function(e) { setEmpresa({ nombre: e.target.value, wa: empresa.wa, email: empresa.email }); }} placeholder="Nombre empresa" style={{ width: "100%", padding: 10, marginTop: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                <input value={empresa.wa} onChange={function(e) { setEmpresa({ nombre: empresa.nombre, wa: e.target.value, email: empresa.email }); }} placeholder="WhatsApp" style={{ width: "100%", padding: 10, marginTop: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                <input value={empresa.email} onChange={function(e) { setEmpresa({ nombre: empresa.nombre, wa: empresa.wa, email: e.target.value }); }} placeholder="Email" style={{ width: "100%", padding: 10, marginTop: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
              </div>
            )}
            {paso === 1 && (
              <div>
                <h3>2. Bodegas B1 hasta B-Infinito</h3>
                {proveedores.map(function(p) {
                  return (
                    <div key={p.id} style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <span style={{ background: "#0A2640", color: "white", padding: "4px 8px", borderRadius: 6 }}>{p.bodega}</span>
                      <input value={p.nombre} onChange={function(e) {
                        var nv = proveedores.map(function(x) { return x.id === p.id ? { id: x.id, bodega: x.bodega, nombre: e.target.value } : x; });
                        setProveedores(nv);
                      }} style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                    </div>
                  );
                })}
                <button onClick={addProveedor} style={{ marginTop: 12, padding: "8px 14px", borderRadius: 999, background: "#1ECB6A", border: "none", fontWeight: 700 }}>+ Agregar Proveedor B{proveedores.length + 1}</button>
              </div>
            )}
            {paso === 2 && (
              <div>
                <h3>3. Productos 40pct mayor / 85pct detal</h3>
                {productos.map(function(prod) {
                  return (
                    <div key={prod.id} style={{ border: "1px solid #E2E8F0", borderRadius: 10, padding: 10, marginTop: 8 }}>
                      <div>{prod.nombre} T{prod.talla} {prod.color} - Costo ${prod.costo} - Mayor ${calcMayor(prod.costo)} - Detal ${calcDetal(prod.costo)}</div>
                    </div>
                  );
                })}
              </div>
            )}
            {paso === 3 && (
              <div>
                <h3>4. Prueba Venta Automatica</h3>
                <button onClick={generarLink} style={{ width: "100%", marginTop: 12, background: "#0A2640", color: "white", padding: 12, borderRadius: 10, fontWeight: 800 }}>GENERAR LINK ?c= BASE64</button>
                {linkGen && <div style={{ marginTop: 8, fontSize: 10, wordBreak: "break-all", background: "#F1F5F9", padding: 8, borderRadius: 8 }}>{linkGen}</div>}
              </div>
            )}
          </div>

          <div style={{ background: "#0A2640", color: "white", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>TOTAL MENSUAL</div>
            <div style={{ fontSize: 26, fontWeight: 900 }}>${total} COP</div>
            <div style={{ marginTop: 12, fontSize: 11 }}>
              {MODULES.map(function(m) {
                return (
                  <label key={m.id} style={{ display: "flex", justifyContent: "space-between", padding: 8, background: "rgba(255,255,255,0.06)", borderRadius: 8, marginTop: 6 }}>
                    <span>{m.name} ${m.price}</span>
                    <input type="checkbox" checked={mods.indexOf(m.id) >= 0} onChange={function() {
                      if (mods.indexOf(m.id) >= 0) { setMods(mods.filter(function(x) { return x !== m.id; })); }
                      else { setMods(mods.concat([m.id])); }
                    }} />
                  </label>
                );
              })}
            </div>
            <div style={{ marginTop: 14, background: "rgba(255,255,255,0.08)", padding: 10, borderRadius: 10, fontSize: 11 }}>
              Bancolombia 912-510747-93<br />Nequi 3215981307<br />Ivan Andres Cadena<br />
              <a href="https://paypal.me/andreskstllo" target="_blank" style={{ display: "block", marginTop: 8, background: "#FFC439", color: "#003087", textAlign: "center", padding: 8, borderRadius: 8, fontWeight: 800, textDecoration: "none" }}>PayPal paypal.me/andreskstllo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

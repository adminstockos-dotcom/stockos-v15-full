"use client";
// @ts-nocheck
import { useState, useEffect } from "react";

const BASE = 300000;

function toB64(str) {
  try {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    bytes.forEach((b) => { bin += String.fromCharCode(b); });
    return btoa(bin);
  } catch {
    return btoa(unescape(encodeURIComponent(str)));
  }
}
function fromB64(b64) {
  try {
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return decodeURIComponent(escape(atob(b64)));
  }
}

export default function Home() {
  const [empresa, setEmpresa] = useState({ nombre: "Maxima Importadores", nit: "", wa: "3215981307", email: "adminstockos@gmail.com" });
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
  const [pago, setPago] = useState("efectivo");

  const MODULES = [
    { id: "prov", name: "Proveedores A/B/C (B Infinito)", price: 50000 },
    { id: "pedidos", name: "Pedidos divididos unificados", price: 60000 },
    { id: "ganancia", name: "Ganancia 40pct mayor / 85pct detal", price: 30000 },
    { id: "compras", name: "Compras a proveedores", price: 50000 },
    { id: "multibodega", name: "Multi-bodega B1/B2/B3", price: 40000 },
  ];

  const total = BASE + mods.reduce((s, id) => s + ((MODULES.find((m) => m.id === id) || {}).price || 0), 0);

  const addProveedor = () => {
    const n = proveedores.length + 1;
    setProveedores([...proveedores, { id: "b" + n, nombre: "Proveedor " + String.fromCharCode(64 + n), bodega: "B" + n }]);
  };

  const addProducto = () => {
    const id = "p" + Date.now();
    const newProd = { id, nombre: "Nuevo Producto", costo: 70000, talla: "38", color: "Negro", stocks: {} };
    proveedores.forEach((p) => { newProd.stocks[p.id] = 0; });
    setProductos([...productos, newProd]);
  };

  const calcMayor = (costo) => Math.round(costo * 1.4);
  const calcDetal = (costo) => Math.round(costo * 1.85);

  const inventarioMaestro = productos.map((p) => {
    const vals = Object.values(p.stocks);
    let sum = 0;
    for (let i = 0; i < vals.length; i++) sum += vals[i];
    return {...p, totalStock: sum, mayor: calcMayor(p.costo), detal: calcDetal(p.costo) };
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const c = params.get("c");
      if (c) {
        const data = JSON.parse(fromB64(c));
        if (data.empresa) setEmpresa(data.empresa);
        if (data.proveedores) setProveedores(data.proveedores);
        if (data.productos) setProductos(data.productos);
        if (data.mods) setMods(data.mods);
      }
    } catch {}
  }, []);

  const generarLinkEmpresa = () => {
    const payload = { empresa, proveedores, productos, mods, base: BASE, total, ts: Date.now() };
    const b64 = toB64(JSON.stringify(payload));
    const link = window.location.origin + window.location.pathname + "?c=" + b64;
    setLinkGen(link);
    return link;
  };

  const venderAutomatico = () => {
    let detalle = carrito.map((item) => {
      const prod = productos.find((p) => p.id === item.prodId);
      let restante = item.qty;
      let origen = [];
      for (let j = 0; j < proveedores.length; j++) {
        const prov = proveedores[j];
        const disp = prod.stocks[prov.id] || 0;
        if (disp > 0 && restante > 0) {
          const toma = disp < restante? disp : restante;
          origen.push(toma + " de " + prov.bodega);
          restante = restante - toma;
        }
      }
      return prod.nombre + " T" + prod.talla + " x" + item.qty + " -> " + origen.join(" + ") + (restante > 0? " (FALTAN " + restante + ")" : " (OK B1 unificado)");
    }).join("\n");

    let totalVenta = 0;
    for (let k = 0; k < carrito.length; k++) {
      const it = carrito[k];
      const prod = productos.find((p) => p.id === it.prodId);
      const precio = filtro === "mayor"? calcMayor(prod.costo) : calcDetal(prod.costo);
      totalVenta = totalVenta + precio * it.qty;
    }
    alert("VENTA AUTOMATICA PRUEBA\nEmpresa: " + empresa.nombre + "\nFiltro: " + filtro + " / " + pago + "\n\n" + detalle + "\n\nTotal: $" + totalVenta.toLocaleString("es-CO") + " COP");
  };

  const waBase = "Hola STOCKOS, soy " + empresa.nombre + ". Plan BASE $300k + extras $" + (total - BASE).toLocaleString("es-CO") + " = $" + total.toLocaleString("es-CO") + "/mes. Mods: " + mods.join(", ") + ". Link: " + linkGen + ". Envio comprobante Bancolombia 912-510747-93 / Nequi 3215981307 / PayPal paypal.me/andreskstllo";

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#F8FAFC", minHeight: "100vh", color: "#0A2640" }}>
      <div style={{ maxWidth: 1150, margin: "0 auto", padding: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1 }}>Si su empresa tiene un caos y pierde ventas buscando quien tiene el producto que necesita vender, STOCKOS automatiza todo lo que hace manual y vende mas en automatico.</h1>
        <p style={{ fontSize: 14, color: "#64748B", marginTop: 8 }}>Flujo completo para crear empresa y probar venta automatica. Base $300.000 COP. B1,B2,B3 hasta B-Infinito. 40pct mayor / 85pct detal. PayPal paypal.me/andreskstllo</p>
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {["Empresa", "Bodegas B1-Binf", "Productos 40/85", "Inv Maestro", "Link Venta", "Prueba Venta"].map((s, i) => (
            <button key={s} onClick={() => setPaso(i)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid #E2E8F0", background: paso === i? "#0A2640" : "white", color: paso === i? "white" : "#0A2640", fontWeight: 700, fontSize: 12 }}>{i + 1}. {s}</button>
          ))}
        </div>
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #E2E8F0" }}>
            {paso === 0 && (
              <div>
                <h2 style={{ fontWeight: 800 }}>1. Crear Empresa</h2>
                <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
                  <input value={empresa.nombre} onChange={(e) => setEmpresa({...empresa, nombre: e.target.value })} placeholder="Nombre empresa" style={{ padding: 10, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                  <input value={empresa.nit} onChange={(e) => setEmpresa({...empresa, nit: e.target.value })} placeholder="NIT" style={{ padding: 10, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                  <input value={empresa.wa} onChange={(e) => setEmpresa({...empresa, wa: e.target.value })} placeholder="WhatsApp" style={{ padding: 10, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                  <input value={empresa.email} onChange={(e) => setEmpresa({...empresa, email: e.target.value })} placeholder="Email" style={{ padding: 10, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                </div>
              </div>
            )}
            {paso === 1 && (
              <div>
                <h2 style={{ fontWeight: 800 }}>2. Bodegas B1 hasta B-Infinito</h2>
                <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                  {proveedores.map((p) => (
                    <div key={p.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ background: "#0A2640", color: "white", padding: "4px 8px", borderRadius: 6, fontSize: 11 }}>{p.bodega}</span>
                      <input value={p.nombre} onChange={(e) => setProveedores(proveedores.map((x) => x.id === p.id? {...x, nombre: e.target.value } : x))} style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                    </div>
                  ))}
                </div>
                <button onClick={addProveedor} style={{ marginTop: 10, padding: "8px 14px", borderRadius: 999, background: "#1ECB6A", border: "none", fontWeight: 700 }}>+ Agregar Proveedor (B{proveedores.length + 1})</button>
              </div>
            )}
            {paso === 2 && (
              <div>
                <h2 style={{ fontWeight: 800 }}>3. Productos Costo 40pct 85pct</h2>
                <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                  {productos.map((prod) => (
                    <div key={prod.id} style={{ border: "1px solid #E2E8F0", borderRadius: 10, padding: 10 }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <input value={prod.nombre} onChange={(e) => setProductos(productos.map((x) => x.id === prod.id? {...x, nombre: e.target.value } : x))} style={{ flex: 1, padding: 6, borderRadius: 6, border: "1px solid #E2E8F0" }} />
                        <input value={prod.talla} onChange={(e) => setProductos(productos.map((x) => x.id === prod.id? {...x, talla: e.target.value } : x))} style={{ width: 60, padding: 6, borderRadius: 6, border: "1px solid #E2E8F0" }} />
                        <input value={prod.color} onChange={(e) => setProductos(productos.map((x) => x.id === prod.id? {...x, color: e.target.value } : x))} style={{ width: 80, padding: 6, borderRadius: 6, border: "1px solid #E2E8F0" }} />
                        <input type="number" value={prod.costo} onChange={(e) => setProductos(productos.map((x) => x.id === prod.id? {...x, costo: parseInt(e.target.value) || 0 } : x))} style={{ width: 90, padding: 6, borderRadius: 6, border: "1px solid #E2E8F0" }} />
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 6, fontSize: 11 }}>
                        <span>Mayor: ${calcMayor(prod.costo).toLocaleString("es-CO")}</span>
                        <span style={{ fontWeight: 800 }}>Detal: ${calcDetal(prod.costo).toLocaleString("es-CO")}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                        {proveedores.map((prov) => (
                          <label key={prov.id} style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4, background: "#F1F5F9", padding: "4px 6px", borderRadius: 6 }}>
                            {prov.bodega}:
                            <input type="number" value={prod.stocks[prov.id] || 0} onChange={(e) => { const v = parseInt(e.target.value) || 0; setProductos(productos.map((x) => x.id === prod.id? {...x, stocks: {...x.stocks, [prov.id]: v } } : x)); }} style={{ width: 40, padding: 2, borderRadius: 4, border: "1px solid #E2E8F0" }} />
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={addProducto} style={{ marginTop: 10, padding: "8px 14px", borderRadius: 999, background: "#0A2640", color: "white", border: "none", fontWeight: 700 }}>+ Agregar Producto</button>
              </div>
            )}
            {paso === 3 && (
              <div>
                <h2 style={{ fontWeight: 800 }}>4. Inventario Maestro Unificado</h2>
                <table style={{ width: "100%", marginTop: 10, fontSize: 12, borderCollapse: "collapse" }}>
                  <thead><tr style={{ background: "#F1F5F9" }}><th style={{ padding: 6, textAlign: "left" }}>Producto</th><th>Total</th><th>Mayor</th><th>Detal</th><th>Detalle B</th></tr></thead>
                  <tbody>
                    {inventarioMaestro.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
                        <td style={{ padding: 6 }}>{p.nombre} T{p.talla} {p.color}</td>
                        <td style={{ padding: 6, fontWeight: 800 }}>{p.totalStock}</td>
                        <td style={{ padding: 6 }}>${p.mayor.toLocaleString("es-CO")}</td>
                        <td style={{ padding: 6, fontWeight: 700 }}>${p.detal.toLocaleString("es-CO")}</td>
                        <td style={{ padding: 6, fontSize: 10 }}>{proveedores.map((pr) => pr.bodega + ":" + (p.stocks[pr.id] || 0)).join(" ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {paso === 4 && (
              <div>
                <h2 style={{ fontWeight: 800 }}>5. Link Venta Automatica filtrable</h2>
                <button onClick={generarLinkEmpresa} style={{ marginTop: 10, width: "100%", background: "#0A2640", color: "white", padding: 12, borderRadius: 10, fontWeight: 800 }}>GENERAR LINK CORTO?c= BASE64</button>
                {linkGen && <div style={{ marginTop: 10, fontSize: 10, wordBreak: "break-all", background: "#F1F5F9", padding: 8, borderRadius: 8 }}>{linkGen}<br /><button onClick={() => navigator.clipboard.writeText(linkGen)} style={{ marginTop: 6, padding: "4px 8px", borderRadius: 999 }}>Copiar</button></div>}
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <select value={filtro} onChange={(e) => setFiltro(e.target.value)} style={{ padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }}><option value="detal">Detal</option><option value="mayor">Mayor</option></select>
                  <select value={pago} onChange={(e) => setPago(e.target.value)} style={{ padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }}><option value="efectivo">Efectivo</option><option value="transferencia">Transferencia</option><option value="contraentrega">Contraentrega</option></select>
                </div>
              </div>
            )}
            {paso === 5 && (
              <div>
                <h2 style={{ fontWeight: 800 }}>6. Prueba Venta Automatica - Maxima</h2>
                <div style={{ marginTop: 10 }}>
                  {inventarioMaestro.map((p) => (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: 6, borderBottom: "1px solid #F1F5F9", fontSize: 12 }}>
                      <span>{p.nombre} T{p.talla} - Stock {p.totalStock} - $ {(filtro === "mayor"? p.mayor : p.detal).toLocaleString("es-CO")}</span>
                      <button onClick={() => { setCarrito((prev) => { const ex = prev.find((x) => x.prodId === p.id); if (ex) return prev.map((x) => x.prodId === p.id? {...x, qty: x.qty + 1 } : x); return [...prev, { prodId: p.id, qty: 1 }]; }); }} style={{ padding: "4px 8px", borderRadius: 999, background: "#1ECB6A", border: "none", fontWeight: 700 }}>+ Agregar</button>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, background: "#F8FAFC", padding: 10, borderRadius: 10 }}>
                  <b>Carrito:</b> {carrito.length === 0? "vacio" : carrito.map((c) => { const pr = productos.find((p) => p.id === c.prodId); return pr?.nombre + " x" + c.qty; }).join(", ")}
                  {carrito.length > 0 && <button onClick={() => setCarrito([])} style={{ marginLeft: 10, fontSize: 10 }}>Limpiar</button>}
                </div>
                <button onClick={venderAutomatico} disabled={carrito.length === 0} style={{ marginTop: 12, width: "100%", background: carrito.length? "#0A2640" : "#CBD5E1", color: "white", padding: 12, borderRadius: 10, fontWeight: 800 }}>VENDER EN AUTOMATICO - PRUEBA</button>
              </div>
            )}
          </div>
          <div style={{ background: "#0A2640", color: "white", borderRadius: 14, padding: 16, height: "fit-content" }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>TOTAL MENSUAL EMPRESA</div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>${total.toLocaleString("es-CO")} COP</div>
            <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
              {MODULES.map((m) => (
                <label key={m.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, background: mods.includes(m.id)? "rgba(30,203,106,0.2)" : "rgba(255,255,255,0.06)", padding: "8px", borderRadius: 8 }}>
                  <span>{m.name}</span>
                  <input type="checkbox" checked={mods.includes(m.id)} onChange={() => { setMods((prev) => prev.includes(m.id)? prev.filter((x) => x!== m.id) : [...prev, m.id]); }} />
                </label>
              ))}
            </div>
            <div style={{ marginTop: 14, background: "rgba(255,255,255,0.08)", padding: 10, borderRadius: 10, fontSize: 11 }}>
              Bancolombia 912-510747-93<br />Nequi 3215981307<br />Ivan Andres Cadena Castillo<br />
              <a href="https://paypal.me/andreskstllo" target="_blank" style={{ display: "block", marginTop: 8, background: "#FFC439", color: "#003087", textAlign: "center", padding: 8, borderRadius: 8, fontWeight: 800, textDecoration: "none" }}>PayPal / Tarjeta</a>
            </div>
            <button onClick={() => { const l = generarLinkEmpresa(); const url = "https://wa.me/573215981307?text=" + encodeURIComponent(waBase + " Link: " + l); window.open(url, "_blank"); }} style={{ marginTop: 12, width: "100%", background: "#25D366", color: "white", padding: 12, borderRadius: 10, fontWeight: 800, border: "none" }}>Enviar comprobante WA</button>
          </div>
        </div>
      </div>
    </div>
  );
}

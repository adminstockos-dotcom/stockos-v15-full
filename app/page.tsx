// @ts-nocheck
"use client";
import { useState, useEffect } from "react";

const BASE = 300000;

const CORE_MODULES = ["Inventario Maestro", "Productos y precios", "Clientes", "Pedidos", "Reportes", "Usuarios", "Soporte", "Panel principal"];
const MODULOS_22 = [
  { id: "prov", name: "Proveedor B-Infinito", price: 30000 },
  { id: "pedidos", name: "Pedidos Unificados B1-B∞", price: 40000 },
  { id: "ganancia", name: "Ganancia 40/85", price: 20000 },
  { id: "compras", name: "Compras", price: 25000 },
  { id: "multibodega", name: "Multibodega", price: 35000 },
  { id: "link", name: "Link ?c=", price: 15000 },
  { id: "filtros", name: "Filtros Mayor/Detal/Efectivo/Transferencia/Contraentrega", price: 20000 },
  { id: "wa", name: "Disparo WA 7AM/2PM", price: 30000 },
  { id: "paypal", name: "PayPal/Nequi/Bancolombia", price: 15000 },
  { id: "factura", name: "Facturación", price: 25000 },
  { id: "clientes", name: "Clientes", price: 15000 },
  { id: "tallas", name: "Taller Marcial", price: 20000 },
  { id: "alertas", name: "Alertas Stock Bajo", price: 15000 },
  { id: "excel", name: "Importa 3 Excels", price: 20000 },
  { id: "fotos", name: "Fotos", price: 15000 },
  { id: "devol", name: "Devoluciones", price: 15000 },
  { id: "conta", name: "Contabilidad", price: 30000 },
  { id: "rutas", name: "Bodegas B1", price: 20000 },
  { id: "multiuser", name: "Multiuser", price: 25000 },
  { id: "offline", name: "Offline", price: 20000 },
  { id: "catalogo", name: "Catálogo PDF", price: 15000 },
  { id: "api", name: "API Shopify/Woo", price: 40000 },
];

const toB64 = (str) => {
  if (typeof window === "undefined") return "";
  try { return window.btoa(unescape(encodeURIComponent(str))); }
  catch { return window.btoa(str); }
};

const fromB64 = (str) => {
  if (typeof window === "undefined") return "{}";
  try { return decodeURIComponent(escape(window.atob(str))); }
  catch { return window.atob(str); }
};

function getTodayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function getOrders() {
  try { return JSON.parse(localStorage.getItem("stockos_orders") || "[]"); }
  catch { return []; }
}

function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem("stockos_orders", JSON.stringify(orders));
}

function getOrdersToday() {
  const today = getTodayStr();
  return getOrders().filter((o) => o.fecha && o.fecha.slice(0, 10) === today);
}

function buildConsolidado() {
  const today = getTodayStr();
  const orders = getOrdersToday();
  const sumToday = orders.reduce((s, o) => s + (o.total || 0), 0);
  let detalle = "";
  orders.forEach((o, i) => {
    const modNames = (o.mods || []).map((id) => MODULOS_22.find((m) => m.id === id)?.name || id).join(", ");
    detalle += `${i + 1}. ${o.empresa} - $${(o.total || 0).toLocaleString("es-CO")} - ${o.metodo} - Mods: ${modNames}\n`;
  });
  return `📊 CONSOLIDADO VENTAS STOCKOS ${today}\nTotal pedidos hoy: ${orders.length}\nTotal recaudado: $${sumToday.toLocaleString("es-CO")}\nDetalle:\n${detalle || "Sin pedidos hoy."}`;
}

export default function Home() {
  const [empresa, setEmpresa] = useState({
    nombre: "", nit: "", direccion: "", wa: "", email: "", ciudad: "",
  });
  const [proveedores, setProveedores] = useState([
    { id: "b1", nombre: "Proveedor A - Cali Centro", bodega: "B1", ciudad: "Cali" },
    { id: "b2", nombre: "Proveedor B - Mayorista Bogota", bodega: "B2", ciudad: "Bogota" },
    { id: "b3", nombre: "Proveedor C - Importador", bodega: "B3", ciudad: "Medellin" },
  ]);
  const [productos, setProductos] = useState([
    { id: "p1", nombre: "Tenis Runner X", costo: 80000, talla: "38", color: "Negro", stocks: { b1: 5, b2: 3, b3: 0 }, cat: "Tenis" },
    { id: "p2", nombre: "Tenis Runner X", costo: 80000, talla: "39", color: "Blanco", stocks: { b1: 2, b2: 0, b3: 4 }, cat: "Tenis" },
    { id: "p3", nombre: "Camiseta Pro", costo: 30000, talla: "M", color: "Azul", stocks: { b1: 8, b2: 6, b3: 2 }, cat: "Ropa" },
  ]);
  const [paso, setPaso] = useState(0);
  const [mods, setMods] = useState([]);
  const [comprobante, setComprobante] = useState(null);
  const [linkGen, setLinkGen] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [filtro, setFiltro] = useState("detal");
  const [ventaMsg, setVentaMsg] = useState("");
  const [copiado, setCopiado] = useState(false);
  const isClientComplete = Boolean(empresa.nombre && empresa.nit && empresa.direccion && empresa.email && empresa.wa && empresa.ciudad);

  const total = BASE + mods.reduce((s, id) => s + (MODULOS_22.find((m) => m.id === id)?.price || 0), 0);

  useEffect(() => {
    try {
      const c = new URLSearchParams(window.location.search).get("c");
      if (c) {
        const data = JSON.parse(fromB64(c));
        if (data.empresa) setEmpresa(data.empresa);
        if (data.proveedores) setProveedores(data.proveedores);
        if (data.productos) setProductos(data.productos);
        if (data.mods) setMods(data.mods);
      }
    } catch {}
  }, []);

  // Daily report at 8PM
  useEffect(() => {
    const checkDailyReport = () => {
      const now = new Date();
      const hour = now.getHours();
      const today = getTodayStr();
      const lastReport = localStorage.getItem("lastDailyReportDate");
      if (hour >= 20 && lastReport !== today) {
        const consolidado = buildConsolidado();
        localStorage.setItem("lastDailyReportDate", today);
        window.open("https://wa.me/573044019899?text=" + encodeURIComponent(consolidado), "_blank");
        fetch("/api/send-daily-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: "adminstockos@gmail.com", report: consolidado }),
        }).catch(() => {});
      }
    };
    checkDailyReport();
    const interval = setInterval(checkDailyReport, 60000);
    return () => clearInterval(interval);
  }, []);

  const calcMayor = (c) => Math.round(c * 1.4);
  const calcDetal = (c) => Math.round(c * 1.85);

  const inventarioMaestro = productos.map((p) => {
    const totalStock = Object.values(p.stocks).reduce((a, b) => a + b, 0);
    return { ...p, totalStock, mayor: calcMayor(p.costo), detal: calcDetal(p.costo) };
  });

  const generarLink = () => {
    const b64 = toB64(JSON.stringify({ empresa, proveedores, productos, mods, total, base: BASE }));
    setLinkGen(window.location.origin + window.location.pathname + "?c=" + b64);
  };

  const copiarLink = () => {
    if (linkGen && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(linkGen).then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      });
    }
  };

  const simularVenta = () => {
    if (carrito.length === 0) {
      setVentaMsg("Carrito vacio. Agrega productos para simular venta.");
      return;
    }
    const ciudadBase = empresa.ciudad || "Cali";
    const lineas = [];
    for (const item of carrito) {
      const prod = productos.find((p) => p.id === item.prodId);
      if (!prod) continue;
      let rest = item.qty;
      const parts = [];
      for (const prov of proveedores) {
        const stock = prod.stocks[prov.id] || 0;
        if (stock <= 0) continue;
        const taken = Math.min(rest, stock);
        if (taken > 0) {
          parts.push(taken + " de " + prov.bodega);
          rest -= taken;
        }
        if (rest <= 0) break;
      }
      lineas.push("VENTA: " + prod.nombre + " x" + item.qty + " -> " + parts.join(" + ") + " = 1 despacho " + ciudadBase + " OK" + (rest > 0 ? " / FALTAN " + rest : ""));
    }
    setVentaMsg(lineas.join("\n"));
  };

  const addToCarrito = (p) => {
    setCarrito((prev) => {
      const ex = prev.find((x) => x.prodId === p.id);
      if (ex) return prev.map((x) => (x.prodId === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { prodId: p.id, qty: 1 }];
    });
  };

  const procesarPago = (metodo) => {
    if (!isClientComplete) {
      setPaso(0);
      alert("Completa todos los datos de la empresa antes de pagar.");
      return;
    }
    const modsSeleccionados = mods.map((id) => MODULOS_22.find((m) => m.id === id)?.name || id).filter(Boolean);
    const order = {
      id: Date.now(),
      empresa: empresa.nombre,
      nit: empresa.nit,
      dir: empresa.direccion,
      wa: empresa.wa,
      email: empresa.email,
      ciudad: empresa.ciudad,
      mods: mods,
      modsNames: modsSeleccionados,
      total,
      metodo,
      fecha: new Date().toISOString(),
    };
    saveOrder(order);
    const message = `✅ NUEVO PAGO STOCKOS\nEmpresa: ${empresa.nombre}\nNIT: ${empresa.nit}\nDir: ${empresa.direccion}\nEmail: ${empresa.email}\nWA Cliente: ${empresa.wa}\nCiudad: ${empresa.ciudad}\nMódulos: ${modsSeleccionados.join(", ")}\nTotal: $${total.toLocaleString("es-CO")}\nMedio: ${metodo}\nHora: ${new Date().toLocaleString("es-CO")}\nComprobante: adjunto`;
    window.open("https://wa.me/573044019899?text=" + encodeURIComponent(message), "_blank");
  };

  const addProveedor = () => {
    const n = proveedores.length + 1;
    setProveedores([...proveedores, { id: "b" + n, nombre: "Proveedor " + String.fromCharCode(65 + proveedores.length) + " - Nueva", bodega: "B" + n, ciudad: "Cali" }]);
  };

  const addProducto = () => {
    const n = productos.length + 1;
    const stocksInit = {};
    proveedores.forEach((p) => (stocksInit[p.id] = 0));
    setProductos([...productos, { id: "p" + n, nombre: "Producto " + n, costo: 50000, talla: "U", color: "Negro", stocks: stocksInit, cat: "General" }]);
  };

  const updateStock = (prodId, provId, val) => {
    setProductos(productos.map((p) => (p.id === prodId ? { ...p, stocks: { ...p.stocks, [provId]: parseInt(val) || 0 } } : p)));
  };

  const productosFiltrados = inventarioMaestro.filter((p) => {
    if (filtro === "detal") return p.detal > 0;
    if (filtro === "mayor") return p.mayor > 0;
    if (filtro === "efectivo") return p.totalStock > 0;
    if (filtro === "transferencia") return p.totalStock > 0;
    if (filtro === "contraentrega") return p.totalStock > 0;
    return true;
  });

  const tabs = ["Empresa", "Bodegas B∞", "Productos 40/85", "Inv Maestro", "Link Venta", "Prueba Venta"];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#F8FFFE", minHeight: "100vh", color: "#0A2640" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}>
        <header style={{ background: "white", borderBottom: "1px solid #E2E8F0", margin: "0 -20px", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src="/logo.png" height="48" style={{ background: "white", padding: 6, borderRadius: 10 }} />
          <a href="/admin" style={{ color: "#0A2640", fontSize: 12, fontWeight: 800, textDecoration: "none" }}>ADMIN</a>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, padding: "36px 0 20px" }}>
          <div>
            <div style={{ display: "inline-block", background: "#E6FFF3", color: "#0A7A42", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
              STOCKOS V19 - VENTA AUTOMATIZADA
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.05, marginTop: 12 }}>
              De <span style={{ color: "#1ECB6A" }}>3 Excels desordenados</span> a 1 Inventario Maestro que vende solo.
            </h1>
            <p style={{ marginTop: 12, color: "#475569", fontSize: 14, lineHeight: 1.5 }}>
              Si su empresa tiene un caos y pierde ventas buscando quien tiene el producto que necesita vender, STOCKOS automatiza todo lo que hace manual y vende mas en automatico. 40% mayor / 85% detal, pedidos divididos unificados B1, WA 7AM/2PM.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => setPaso(0)} style={{ background: "#1ECB6A", color: "white", padding: "12px 18px", borderRadius: 999, border: "none", fontWeight: 800, cursor: "pointer" }}>Crear mi empresa</button>
              <button onClick={generarLink} style={{ background: "white", padding: "12px 18px", borderRadius: 999, border: "1px solid #E2E8F0", fontWeight: 700, cursor: "pointer" }}>Ver link ?c=</button>
            </div>
          </div>
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", padding: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 12 }}>Inventario Maestro en vivo{empresa.nombre ? " - " + empresa.nombre : ""}</div>
            {inventarioMaestro.map((p) => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", background: "#F8FAFC", padding: "10px", borderRadius: 10, fontSize: 12, marginTop: 8 }}>
                <div>
                  <b>{p.nombre}</b> T{p.talla}<br />
                  <span style={{ fontSize: 10 }}>{proveedores.map((pr) => pr.bodega + ":" + (p.stocks[pr.id] || 0)).join(" ")}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800 }}>{p.totalStock} und</div>
                  <div>${p.detal.toLocaleString("es-CO")}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 10, background: "#0A2640", color: "white", borderRadius: 10, padding: 10, fontSize: 11 }}>
              Total: ${total.toLocaleString("es-CO")} COP - Base ${BASE.toLocaleString("es-CO")}
            </div>
          </div>
        </div>

        <div style={{ background: "#F1F5F9", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 13 }}>BASE DEL PLAN $300.000 - incluye 8 módulos verdes + 22 adicionales opcionales.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
            {CORE_MODULES.map((name) => (
              <label key={name} style={{ background: "#E6FFF3", color: "#0A7A42", border: "1px solid #1ECB6A", borderRadius: 10, padding: 8, fontSize: 10, fontWeight: 800 }}>
                <input type="checkbox" checked disabled style={{ marginRight: 5 }} />{name}
              </label>
            ))}
            {MODULOS_22.map((m) => (
              <label key={m.id} style={{ background: mods.includes(m.id) ? "#0A2640" : "white", color: mods.includes(m.id) ? "white" : "#0A2640", border: "1px solid #E2E8F0", borderRadius: 10, padding: "8px", fontSize: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={mods.includes(m.id)} onChange={() => setMods((prev) => prev.includes(m.id) ? prev.filter((x) => x !== m.id) : [...prev, m.id])} style={{ display: "none" }} />
                <div style={{ fontWeight: 800 }}>{m.name}</div>
                <div style={{ fontSize: 9 }}>${m.price.toLocaleString("es-CO")}</div>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16, paddingBottom: 40 }}>
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", padding: 16 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {tabs.map((s, i) => (
                <button key={s} onClick={() => setPaso(i)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid #E2E8F0", background: paso === i ? "#0A2640" : "white", color: paso === i ? "white" : "#0A2640", fontSize: 11, cursor: "pointer" }}>{i + 1}. {s}</button>
              ))}
            </div>

            {paso === 0 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 8 }}>Paso 1 - Datos de tu empresa</h3>
                <input value={empresa.nombre} onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })} placeholder="Nombre empresa" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} />
                <input value={empresa.nit} onChange={(e) => setEmpresa({ ...empresa, nit: e.target.value })} placeholder="NIT" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} />
                <input value={empresa.direccion} onChange={(e) => setEmpresa({ ...empresa, direccion: e.target.value })} placeholder="Dirección" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} />
                <input value={empresa.wa} onChange={(e) => setEmpresa({ ...empresa, wa: e.target.value })} placeholder="WhatsApp" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} />
                <input value={empresa.email} onChange={(e) => setEmpresa({ ...empresa, email: e.target.value })} placeholder="Email" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} />
                <input value={empresa.ciudad} onChange={(e) => setEmpresa({ ...empresa, ciudad: e.target.value })} placeholder="Ciudad" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} />
              </div>
            )}

            {paso === 1 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 8 }}>Bodegas B1 a B-Infinito</h3>
                {proveedores.map((p) => (
                  <div key={p.id} style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
                    <span style={{ background: "#0A2640", color: "white", padding: "4px 8px", borderRadius: 6, fontWeight: 800 }}>{p.bodega}</span>
                    <input value={p.nombre} onChange={(e) => setProveedores(proveedores.map((x) => (x.id === p.id ? { ...x, nombre: e.target.value } : x)))} style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                    <input value={p.ciudad} onChange={(e) => setProveedores(proveedores.map((x) => (x.id === p.id ? { ...x, ciudad: e.target.value } : x)))} style={{ width: 100, padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                  </div>
                ))}
                <button onClick={addProveedor} style={{ marginTop: 10, padding: "8px 14px", borderRadius: 999, background: "#1ECB6A", border: "none", color: "white", fontWeight: 700, cursor: "pointer" }}>+ Agregar B{proveedores.length + 1} hasta B∞</button>
              </div>
            )}

            {paso === 2 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 8 }}>Productos - Ganancia 40% mayor / 85% detal auto</h3>
                {productos.map((p) => (
                  <div key={p.id} style={{ background: "#F8FAFC", borderRadius: 10, padding: 10, marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input value={p.nombre} onChange={(e) => setProductos(productos.map((x) => (x.id === p.id ? { ...x, nombre: e.target.value } : x)))} style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                      <input value={p.talla} onChange={(e) => setProductos(productos.map((x) => (x.id === p.id ? { ...x, talla: e.target.value } : x)))} placeholder="Talla" style={{ width: 60, padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                      <input type="number" value={p.costo} onChange={(e) => setProductos(productos.map((x) => (x.id === p.id ? { ...x, costo: parseInt(e.target.value) || 0 } : x)))} placeholder="Costo" style={{ width: 90, padding: 8, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 6, fontSize: 12 }}>
                      <span style={{ color: "#0A7A42", fontWeight: 700 }}>Mayor 40%: ${calcMayor(p.costo).toLocaleString("es-CO")}</span>
                      <span style={{ color: "#1ECB6A", fontWeight: 700 }}>Detal 85%: ${calcDetal(p.costo).toLocaleString("es-CO")}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                      {proveedores.map((pr) => (
                        <div key={pr.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 700 }}>{pr.bodega}:</span>
                          <input type="number" value={p.stocks[pr.id] || 0} onChange={(e) => updateStock(p.id, pr.id, e.target.value)} style={{ width: 50, padding: 4, borderRadius: 6, border: "1px solid #E2E8F0", fontSize: 11 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={addProducto} style={{ marginTop: 10, padding: "8px 14px", borderRadius: 999, background: "#1ECB6A", border: "none", color: "white", fontWeight: 700, cursor: "pointer" }}>+ Agregar Producto</button>
              </div>
            )}

            {paso === 3 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 8 }}>Inventario Maestro - 3 Excels unificados</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#0A2640", color: "white" }}>
                      <th style={{ padding: 8, textAlign: "left" }}>Producto</th>
                      <th style={{ padding: 8 }}>Total Stock</th>
                      <th style={{ padding: 8 }}>Mayor 40%</th>
                      <th style={{ padding: 8 }}>Detal 85%</th>
                      {proveedores.map((pr) => (<th key={pr.id} style={{ padding: 8 }}>{pr.bodega}</th>))}
                    </tr>
                  </thead>
                  <tbody>
                    {inventarioMaestro.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                        <td style={{ padding: 8 }}>{p.nombre} T{p.talla} {p.color}</td>
                        <td style={{ padding: 8, textAlign: "center", fontWeight: 800 }}>{p.totalStock}</td>
                        <td style={{ padding: 8, textAlign: "center" }}>${p.mayor.toLocaleString("es-CO")}</td>
                        <td style={{ padding: 8, textAlign: "center" }}>${p.detal.toLocaleString("es-CO")}</td>
                        {proveedores.map((pr) => (<td key={pr.id} style={{ padding: 8, textAlign: "center" }}>{p.stocks[pr.id] || 0}</td>))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {paso === 4 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 8 }}>Link venta automatica ?c=</h3>
                <button onClick={generarLink} style={{ width: "100%", background: "#0A2640", color: "white", padding: 12, borderRadius: 10, fontWeight: 800, border: "none", cursor: "pointer" }}>GENERAR LINK CORTO</button>
                {linkGen && (
                  <>
                    <div style={{ marginTop: 8, fontSize: 10, wordBreak: "break-all", background: "#F1F5F9", padding: 8, borderRadius: 8 }}>{linkGen}</div>
                    <button onClick={copiarLink} style={{ marginTop: 8, width: "100%", background: "#1ECB6A", color: "white", padding: 10, borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer" }}>{copiado ? "COPIADO!" : "Copiar Link"}</button>
                  </>
                )}
              </div>
            )}

            {paso === 5 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 8 }}>Prueba Venta Automatica Maxima</h3>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                  {["detal", "mayor", "efectivo", "transferencia", "contraentrega"].map((f) => (
                    <button key={f} onClick={() => setFiltro(f)} style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid #E2E8F0", background: filtro === f ? "#1ECB6A" : "white", color: filtro === f ? "white" : "#0A2640", fontSize: 10, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
                  ))}
                </div>
                {productosFiltrados.map((p) => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: 8, borderBottom: "1px solid #F1F5F9", alignItems: "center" }}>
                    <span style={{ fontSize: 12 }}>{p.nombre} T{p.talla} Stock {p.totalStock} ${p.detal.toLocaleString("es-CO")}</span>
                    <button onClick={() => addToCarrito(p)} style={{ padding: "4px 10px", borderRadius: 999, background: "#1ECB6A", border: "none", color: "white", fontWeight: 700, cursor: "pointer" }}>+ Agregar</button>
                  </div>
                ))}
                <div style={{ marginTop: 10, background: "#F8FAFC", padding: 10, borderRadius: 8, fontSize: 12 }}>
                  <b>Carrito:</b> {carrito.length === 0 ? "vacio" : carrito.map((c) => { const pr = productos.find((p) => p.id === c.prodId); return pr.nombre + " x" + c.qty; }).join(", ")}
                </div>
                <button onClick={simularVenta} style={{ marginTop: 10, width: "100%", background: "#0A2640", color: "white", padding: 12, borderRadius: 10, fontWeight: 800, border: "none", cursor: "pointer" }}>SIMULAR VENTA AUTOMATICA</button>
                {ventaMsg && (<div style={{ marginTop: 10, background: "#E6FFF3", border: "1px solid #1ECB6A", padding: 12, borderRadius: 10, fontSize: 12, whiteSpace: "pre-wrap" }}>{ventaMsg}</div>)}
              </div>
            )}
          </div>

          {/* SIDEBAR - Checkout */}
          <div style={{ background: "#0A2640", color: "white", borderRadius: 16, padding: 16, height: "fit-content" }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>CHECKOUT STOCKOS V19</div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>${total.toLocaleString("es-CO")}</div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>Base $300.000 + {mods.length} adicionales</div>
            <button disabled={!isClientComplete} onClick={() => procesarPago("PayPal")} style={{ width: "100%", marginTop: 12, background: "#FFC439", color: "#003087", padding: 11, borderRadius: 10, fontWeight: 800, border: "none", cursor: isClientComplete ? "pointer" : "not-allowed", opacity: isClientComplete ? 1 : 0.6 }}>Paga con Tarjeta Débito/Crédito PayPal</button>
            <button disabled={!isClientComplete} onClick={() => procesarPago("Nequi 3215981307")} style={{ width: "100%", marginTop: 10, background: "#1ECB6A", color: "white", padding: 11, borderRadius: 10, fontWeight: 800, border: "none", cursor: isClientComplete ? "pointer" : "not-allowed", opacity: isClientComplete ? 1 : 0.6 }}>Paga con Nequi</button>
            <div style={{ fontSize: 10, marginTop: 5, opacity: 0.8 }}>Nequi: 3215981307</div>
            <button disabled={!isClientComplete} onClick={() => procesarPago("Bancolombia 912-510747-93")} style={{ width: "100%", marginTop: 10, background: "white", color: "#0A2640", padding: 11, borderRadius: 10, fontWeight: 800, border: "none", cursor: isClientComplete ? "pointer" : "not-allowed", opacity: isClientComplete ? 1 : 0.6 }}>Paga con Bancolombia</button>
            <div style={{ fontSize: 10, marginTop: 5, opacity: 0.8 }}>Ahorros 912-510747-93</div>
            <label style={{ display: "block", marginTop: 14, fontSize: 11, opacity: 0.9 }}>Subir comprobante<input type="file" accept="image/*,.pdf" onChange={(e) => setComprobante(e.target.files?.[0] || null)} style={{ display: "block", marginTop: 6, width: "100%" }} /></label>
            {comprobante && <div style={{ marginTop: 5, fontSize: 10, color: "#B7FFD5" }}>{comprobante.name}</div>}
            <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 12, fontSize: 10, opacity: 0.8 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>PAGOS:</div>
              <div>Bancolombia 912-510747-93 Ivan Andres Cadena</div><div>Nequi 3215981307</div><div>PayPal paypal.me/andreskstllo</div>
            </div>
          </div>
        </div>
        <a href="/admin" aria-label="Administración" style={{ position: "fixed", right: 10, bottom: 8, color: "#0A2640", opacity: 0.15, textDecoration: "none", fontWeight: 900 }}>.</a>
      </div>
    </div>
  );
}

// @ts-nocheck
"use client";
import { useState, useEffect } from "react";

const BASE = 300000;
const ADMIN_EMAIL = "adminstockos@gmail.com";
const ADMIN_PASS = "Sep7imo@ngel";

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

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [mods, setMods] = useState([]);
  const [linkGen, setLinkGen] = useState("");
  const [copiado, setCopiado] = useState(false);

  const total = BASE + mods.reduce((s, id) => s + (MODULOS_22.find((m) => m.id === id)?.price || 0), 0);

  const login = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setLogged(true);
      setError("");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const generarLink = () => {
    const cliente = {
      empresa: {
        nombre: "MAXIMA IMPORTADORES",
        nit: "14836265-4",
        direccion: "CL 7 14 57 SAN BOSCO CALI",
        email: "adminstockos@gmail.com",
        wa: "3186411851",
        ciudad: "Cali",
      },
      mods,
      total,
    };
    const b64 = toB64(JSON.stringify(cliente));
    setLinkGen(window.location.origin + "/?c=" + b64);
  };

  const copiarLink = () => {
    if (linkGen && navigator.clipboard) {
      navigator.clipboard.writeText(linkGen).then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      });
    }
  };

  if (!logged) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", background: "#F8FFFE", minHeight: "100vh", color: "#0A2640", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, background: "white", borderBottom: "1px solid #E2E8F0", padding: "14px 20px", display: "flex", alignItems: "center" }}>
          <img src="/logo.png" height="48" style={{ background: "white", padding: 6, borderRadius: 10 }} />
        </header>
        <form onSubmit={login} style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", padding: 32, width: 340, maxWidth: "90vw" }}>
          <h2 style={{ marginTop: 0, textAlign: "center" }}>ADMIN STOCKOS V17</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E2E8F0", marginTop: 8 }} />
          {error && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 8 }}>{error}</div>}
          <button type="submit" style={{ width: "100%", marginTop: 16, background: "#1ECB6A", color: "white", padding: 12, borderRadius: 10, fontWeight: 800, border: "none", cursor: "pointer" }}>INGRESAR</button>
          <a href="/" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, color: "#0A2640", textDecoration: "none" }}>← Volver</a>
        </form>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#F8FFFE", minHeight: "100vh", color: "#0A2640" }}>
      <header style={{ background: "white", borderBottom: "1px solid #E2E8F0", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src="/logo.png" height="48" style={{ background: "white", padding: 6, borderRadius: 10 }} />
        <span style={{ fontWeight: 800, fontSize: 13 }}>PANEL ADMIN V17</span>
      </header>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
        <h2 style={{ marginTop: 0 }}>Crear Cliente: MAXIMA IMPORTADORES</h2>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Datos del cliente</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <b>Empresa:</b> MAXIMA IMPORTADORES<br />
            <b>NIT:</b> 14836265-4<br />
            <b>Dirección:</b> CL 7 14 57 SAN BOSCO CALI<br />
            <b>Email:</b> adminstockos@gmail.com<br />
            <b>WA:</b> 3186411851<br />
            <b>Ciudad:</b> Cali
          </div>
        </div>

        <div style={{ background: "#F1F5F9", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 12 }}>Selecciona módulos adicionales (22 disponibles)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {MODULOS_22.map((m) => (
              <label key={m.id} style={{ background: mods.includes(m.id) ? "#0A2640" : "white", color: mods.includes(m.id) ? "white" : "#0A2640", border: "1px solid #E2E8F0", borderRadius: 10, padding: 10, fontSize: 11, cursor: "pointer" }}>
                <input type="checkbox" checked={mods.includes(m.id)} onChange={() => setMods((prev) => prev.includes(m.id) ? prev.filter((x) => x !== m.id) : [...prev, m.id])} style={{ marginRight: 6 }} />
                {m.name} <span style={{ fontSize: 10, opacity: 0.8 }}>${m.price.toLocaleString("es-CO")}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ background: "#0A2640", color: "white", borderRadius: 12, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>TOTAL PLAN</div>
          <div style={{ fontSize: 32, fontWeight: 900 }}>${total.toLocaleString("es-CO")}</div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>Base $300.000 + {mods.length} módulos</div>
          <button onClick={generarLink} style={{ marginTop: 14, width: "100%", background: "#1ECB6A", color: "white", padding: 12, borderRadius: 10, fontWeight: 800, border: "none", cursor: "pointer" }}>GENERAR LINK ?c=</button>
          {linkGen && (
            <>
              <div style={{ marginTop: 10, fontSize: 10, wordBreak: "break-all", background: "rgba(255,255,255,0.1)", padding: 8, borderRadius: 8 }}>{linkGen}</div>
              <button onClick={copiarLink} style={{ marginTop: 8, width: "100%", background: "white", color: "#0A2640", padding: 10, borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer" }}>{copiado ? "COPIADO!" : "Copiar Link"}</button>
            </>
          )}
        </div>

        <a href="/" style={{ display: "block", textAlign: "center", marginTop: 20, fontSize: 12, color: "#0A2640", textDecoration: "none" }}>← Volver al inicio</a>
      </div>
    </div>
  );
}

"use client";
import { useState, useMemo, useEffect } from "react";

const BASE_PRICE = 300000;
const BASE_MODULES = [
  "Dashboard Real",
  "Inventario Maestro",
  "Facturación POS + DIAN",
  "Clientes y Cartera",
  "Compras A/B/C",
  "Ventas y Cotizaciones",
  "Reportes Ganancia",
  "Link Maestro + WA Auto"
];

// SOLO MODULOS EXTRA VALIDOS - SIN DUPLICADOS Y SIN TALLER MARCIAL
const EXTRA_MODULES = [
  { id: "fotos", name: "Fotos y Variantes", price: 30000, desc: "Tallas, colores, fotos HD" },
  { id: "barras", name: "Códigos de Barras", price: 35000, desc: "Pistola y etiquetas" },
  { id: "sucursales", name: "Sucursales", price: 60000, desc: "Multi-bodega B1/B2" },
  { id: "crm", name: "CRM Avanzado", price: 45000, desc: "Mayorista vs Detal pro" },
  { id: "ecommerce", name: "E-commerce Pro", price: 70000, desc: "stockos.com/inv/..." },
  { id: "usuarios", name: "Usuarios y Roles", price: 40000, desc: "Vendedores y permisos" },
  { id: "api-shopify", name: "API Shopify/Woo", price: 80000, desc: "Sync automático" },
];

export default function AdminPage() {
  const [form, setForm] = useState({ empresa: "MAXIMA IMPORTADORES", nit: "NIT", direccion: "CL 7 14 57 SAN BOSCO CALI", email: "admin@stockos.com", wa: "3138841851", metodo: "Nequi" });
  const [selected, setSelected] = useState<string[]>([]);
  const [generated, setGenerated] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const totalCOP = useMemo(() => {
    const extra = selected.reduce((a,id)=> a + (EXTRA_MODULES.find(x=>x.id===id)?.price||0),0);
    return BASE_PRICE + extra;
  },[selected]);

  const handleGenerate = () => {
    const payload = { n: form.empresa, nit: form.nit, dir: form.direccion, e: form.email, w: form.wa, metodo: form.metodo, total: totalCOP, mods: selected, base: BASE_PRICE, ts: Date.now() };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    // FIX V22: va a /admin/cliente?c= NO a "/" 
    const link = `${window.location.origin}/admin/cliente?c=${b64}`;
    setGenerated({ link, payload });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#0f172a] text-white rounded-2xl p-6">
          <div className="text-xs opacity-60">Reporte consolidado</div>
          <div className="mt-2 bg-[#22c55e] text-black text-center py-2 rounded-full text-xs font-bold">Enviar consolidado ahora a 304-401-9899 y admin@stockos.com</div>
          <div className="mt-4 text-[10px] opacity-70">© CONSOLIDADO VENTAS STOCKOS 2026-09-11<br/>NIT: {form.nit} Empresa: {form.empresa} - Base $300.000 + {selected.length} extras = ${totalCOP.toLocaleString("es-CO")} - Modo: Proveedor A/B/C, Pedidos Unificados B1-Gen, Ganancia 40%/85%, Link 7s, Filtros Mayor/Detal/Efectivo/Transferencia/Contraentrega<br/>Modulos: {BASE_MODULES.join(", ")} {selected.length>0 ? "+ " + selected.join(", ") : ""}</div>
          <div className="mt-4 bg-white/10 rounded-xl p-2 text-center text-xs">Copiar email</div>
        </div>

        <div className="mt-4 bg-[#dcfce7] border border-[#22c55e]/30 rounded-xl p-4 text-xs">
          <div className="font-bold">Cliente pre-creado (del ultimo pedido)</div>
          <div className="mt-1">Empresa: {form.empresa}<br/>NIT: {form.nit}<br/>Direccion: {form.direccion}<br/>Email: {form.email}<br/>WA: {form.wa}<br/>Metodo pago: {form.metodo}</div>
        </div>

        <div className="mt-4 bg-white rounded-xl p-4">
          <div className="text-[10px] font-bold tracking-widest">MÓDULOS ADICIONALES (7 disponibles) - V22 LIMPIO SIN TALLER MARCIAL Y SIN DUPLICADOS</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {EXTRA_MODULES.map(m=>(
              <label key={m.id} className={`border rounded-lg p-2 text-[10px] cursor-pointer ${selected.includes(m.id) ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white border-slate-200'}`}>
                <input type="checkbox" className="mr-1" checked={selected.includes(m.id)} onChange={()=> setSelected(s=> s.includes(m.id) ? s.filter(x=>x!==m.id) : [...s, m.id])} />
                {m.name} ${m.price.toLocaleString("es-CO")}
              </label>
            ))}
          </div>
          <div className="mt-4 text-[10px] bg-red-50 border border-red-200 p-2 rounded text-red-700">
            ✅ V22: Eliminados: Taller Marcial, Proveedor B 5 infinito duplicado, Multibodega duplicado, Compras duplicado, Importa 3 excels duplicado, Filtros duplicado, Catalogo PDF duplicado, Offline duplicado.<br/>
            Base incluye: {BASE_MODULES.join(" · ")}
          </div>
        </div>

        <div className="mt-4 bg-[#0f172a] text-white rounded-xl p-6 text-center">
          <div className="text-[10px] opacity-60">TOTAL PLAN</div>
          <div className="text-3xl font-black">${totalCOP.toLocaleString("es-CO")}</div>
          <div className="text-[10px] opacity-60">Base $300.000 + {selected.length} modulos</div>
          {!generated ? (
            <button onClick={handleGenerate} className="w-full mt-4 bg-[#22c55e] text-black font-black py-3 rounded-full text-sm">Aprobar y generar link ?c=</button>
          ) : (
            <div className="mt-4 bg-white text-black rounded-xl p-3 text-left">
              <div className="text-[10px] font-bold">LINK GENERADO V22 - YA VA A /admin/cliente NO A LANDING:</div>
              <div className="text-[9px] break-all bg-slate-100 p-2 rounded mt-1">{generated.link}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>{navigator.clipboard.writeText(generated.link); setCopied(true); setTimeout(()=>setCopied(false),2000)}} className="flex-1 bg-black text-white py-2 rounded-full text-xs">{copied ? '¡Copiado!' : 'Copiar Link'}</button>
                <a href={generated.link} target="_blank" className="flex-1 bg-[#22c55e] text-black py-2 rounded-full text-xs font-bold text-center">Abrir Panel Cliente</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client";
import { useState, useEffect, useMemo } from "react";

const BASE = 300000;
const BASE_MODS = [
  { id: "dash", name: "Dashboard Real", desc: "Ventas, stock y caja" },
  { id: "inv", name: "Inventario Maestro", desc: "Tallas, colores, B1" },
  { id: "pos", name: "Facturación POS + DIAN", desc: "Factura en 1 clic" },
  { id: "clientes", name: "Clientes y Cartera", desc: "Crédito y abonos" },
  { id: "compras", name: "Compras A/B/C", desc: "Unifica excels" },
  { id: "ventas", name: "Ventas y Cotizaciones", desc: "Cotiza y despacha" },
  { id: "ganancia", name: "Reportes Ganancia", desc: "40% mayor real" },
  { id: "link", name: "Link + WA Auto", desc: "stockos.com/inv" },
];
const EXTRAS = [
  { id: "fotos", name: "Fotos y Variantes", price: 30000, func: ["Fotos HD", "Talla/Color", "Variantes"] },
  { id: "barras", name: "Códigos Barras", price: 35000, func: ["Pistola", "Etiquetas", "Scan"] },
  { id: "sucursales", name: "Sucursales B1/B2", price: 60000, func: ["Crear B2", "Transfer", "Stock"] },
  { id: "crm", name: "CRM Avanzado", price: 45000, func: ["Tags", "Campañas WA", "Ranking"] },
  { id: "ecommerce", name: "E-commerce Pro", price: 70000, func: ["Link", "Filtro mayor/detal", "Filtro pago"] },
  { id: "usuarios", name: "Usuarios y Roles", price: 40000, func: ["Vendedores", "Permisos", "Caja"] },
  { id: "api", name: "API Shopify/Woo", price: 80000, func: ["Sync stock", "Sync pedidos", "Webhook"] },
];

export default function AdminV22Visual() {
  const [cliente, setCliente] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<string>("");
  const [funcOn, setFuncOn] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let data: any = null;
    const c = params.get("c");
    if (c) { try { data = JSON.parse(decodeURIComponent(escape(atob(c)))); } catch {} }
    if (!data) { try { const raw = localStorage.getItem("stockos_last_order"); if (raw) data = JSON.parse(raw); } catch {} }
    if (!data) { try { const raw = localStorage.getItem("stockos_orders"); if (raw) { const arr = JSON.parse(raw); if (arr.length) data = arr[arr.length-1]; } } catch {} }
    if (data) {
      setCliente(data);
      if (data.mods) {
        const extrasDelCliente = data.mods.filter((m: string) => EXTRAS.some(e => e.id === m));
        setSelected(extrasDelCliente);
        const init: Record<string, boolean> = {};
        [...BASE_MODS, ...EXTRAS].forEach(mod => { (mod as any).func?.forEach?.((f: string) => init[`${mod.id}::${f}`] = true); BASE_MODS.forEach(mm=> init[`${mm.id}::base`] = true); });
        setFuncOn(init);
      }
    }
  }, []);

  const total = useMemo(() => BASE + selected.reduce((a, id) => a + (EXTRAS.find(x => x.id === id)?.price || 0), 0), [selected]);
  const toggleExtra = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleFunc = (modId: string, f: string) => { const k = `${modId}::${f}`; setFuncOn(p => ({ ...p, [k]: !p[k] })); };

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 h-[72px] border-b border-white/5">
        <div className="flex items-center gap-3"><div className="w-9 h-9 bg-[#22c55e] rounded-xl flex items-center justify-center font-black text-black">S</div><span className="font-black">STOCKOS V22 ADMIN</span><span className="text-[10px] bg-white/10 px-2 py-1 rounded-full">MAXIMA IMPORTADORES</span></div>
        <div className="text-xs bg-[#22c55e] text-black px-3 py-1 rounded-full font-black">${total.toLocaleString("es-CO")}</div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-4">
        {cliente ? (
          <div className="bg-[#22c55e] text-black rounded-[20px] p-5 flex justify-between">
            <div><div className="font-black text-xs tracking-widest">CLIENTE PRE-CREADO ✓ LEYENDO ?c= Y localStorage</div><div className="text-xl font-black mt-1">{cliente.n || cliente.empresa} - {cliente.e || cliente.email}</div><div className="text-sm opacity-80">Empresa: {cliente.n} | NIT: {cliente.nit || "N/A"} | WA: {cliente.w || cliente.wa} | Método: {cliente.metodo || "Nequi"}</div><div className="mt-2 bg-black text-[#22c55e] inline-block px-3 py-1 rounded-full text-xs font-bold">Módulos cliente: {cliente.mods?.join(", ")} - Pagó: ${cliente.total?.toLocaleString("es-CO")}</div></div>
            <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold h-fit">?c= OK</div>
          </div>
        ) : <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 p-4 rounded-xl text-sm">⚠️ No hay cliente. Crea uno en la landing. Se lee de ?c= y localStorage</div>}

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-[#111] border border-white/5 rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-4"><h2 className="font-black">MÓDULOS V22 (8 base + 7 extras)</h2><span className="text-[10px] bg-white/10 px-2 py-1 rounded-full">SIN TALLER MARCIAL</span></div>
            <div className="text-[10px] font-bold opacity-40 mb-2">BASE 8 - SIEMPRE ON - INCLUIDO $300K</div>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {BASE_MODS.map(m => <div key={m.id} className="bg-[#22c55e] text-black rounded-xl p-3"><div className="font-black text-xs">{m.name} ✓</div><div className="text-[10px] opacity-70">{m.desc}</div></div>)}
            </div>
            <div className="text-[10px] font-bold opacity-40 mb-2">EXTRAS - Se pre-seleccionan según lo que pagó el cliente</div>
            <div className="space-y-2">
              {EXTRAS.map(ex => {
                const isSel = selected.includes(ex.id);
                return (
                  <div key={ex.id} className={`border rounded-xl overflow-hidden transition ${isSel ? 'border-[#22c55e] bg-[#22c55e]/10' : 'border-white/10 bg-white/[0.03]'}`}>
                    <div className="flex justify-between items-center p-3">
                      <label className="flex items-center gap-3 cursor-pointer flex-1">
                        <input type="checkbox" checked={isSel} onChange={() => toggleExtra(ex.id)} className="w-5 h-5 accent-[#22c55e]" />
                        <div><div className="font-bold text-sm">{ex.name} <span className="text-[#22c55e]">${ex.price.toLocaleString("es-CO")}</span></div><div className="text-[10px] opacity-50">{ex.func.join(" · ")}</div></div>
                      </label>
                      <button onClick={() => setOpen(open === ex.id ? "" : ex.id)} className="text-xs bg-white/10 px-3 py-1.5 rounded-full">{open === ex.id ? "−" : "+"} Funciones</button>
                    </div>
                    {open === ex.id && (
                      <div className="p-3 grid grid-cols-3 gap-2 bg-black/50 border-t border-white/5">
                        {ex.func.map(f => {
                          const k = `${ex.id}::${f}`; const on = funcOn[k] ?? isSel;
                          return <button key={f} onClick={() => toggleFunc(ex.id, f)} className={`text-[10px] p-2 rounded-lg border text-left font-bold ${on ? 'bg-[#22c55e] text-black border-[#22c55e]' : 'bg-white/5 border-white/10'}`}>{f} {on ? "✅" : "⬜"}</button>;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white text-black rounded-[24px] p-6 h-fit sticky top-6">
            <div className="text-[10px] font-black tracking-widest opacity-50">TOTAL PLAN V22 REAL</div>
            <div className="text-4xl font-black mt-2">${total.toLocaleString("es-CO")}</div>
            <div className="text-xs opacity-60 mt-1">Base $300.000 + {selected.length} extras</div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between"><span>Base 8 verdes</span><span className="font-bold">$300.000</span></div>
              {selected.map(id => { const ex = EXTRAS.find(x=>x.id===id); return <div key={id} className="flex justify-between"><span>{ex?.name}</span><span>${ex?.price.toLocaleString("es-CO")}</span></div>; })}
            </div>
            <div className="mt-6 bg-black text-white p-3 rounded-xl text-[10px]">Si el cliente pagó $445.000, aquí ves {selected.length} checks activos en verde. Ya funciona ?c= y localStorage.</div>
            <a href="/" className="mt-4 block text-center bg-[#22c55e] font-black py-3 rounded-full">Volver a Landing</a>
          </div>
        </div>
      </div>
    </div>
  );
}

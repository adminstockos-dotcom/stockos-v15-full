"use client";
import { useState, useEffect, useMemo } from "react";

const BASE = 300000;

// V22 REAL - 8 BASE
const BASE_MODS = [
  { id: "dash", name: "Dashboard Real" },
  { id: "inv", name: "Inventario Maestro" },
  { id: "pos", name: "Facturación POS + DIAN" },
  { id: "clientes", name: "Clientes y Cartera" },
  { id: "compras", name: "Compras A/B/C" },
  { id: "ventas", name: "Ventas y Cotizaciones" },
  { id: "ganancia", name: "Reportes Ganancia" },
  { id: "link", name: "Link Maestro + WA Auto" },
];

// SOLO 7 EXTRAS VALIDOS - SIN TALLER MARCIAL - SIN DUPLICADOS
const EXTRAS = [
  { id: "fotos", name: "Fotos y Variantes", price: 30000, func: ["Fotos HD", "Talla/Color", "Variantes"] },
  { id: "barras", name: "Códigos de Barras", price: 35000, func: ["Pistola", "Etiquetas", "Scan"] },
  { id: "sucursales", name: "Sucursales B1/B2", price: 60000, func: ["Crear B2", "Transfer B1->B2", "Stock sucursal"] },
  { id: "crm", name: "CRM Avanzado", price: 45000, func: ["Tags", "Campañas WA", "Ranking"] },
  { id: "ecommerce", name: "E-commerce Pro", price: 70000, func: ["Link stockos.com/inv", "Filtro mayor/detal", "Filtro pago"] },
  { id: "usuarios", name: "Usuarios y Roles", price: 40000, func: ["Vendedores", "Permisos", "Caja por usuario"] },
  { id: "api", name: "API Shopify/Woo", price: 80000, func: ["Sync stock", "Sync pedidos", "Webhook"] },
];

export default function AdminPageFixed() {
  const [cliente, setCliente] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<string>("");
  const [funcOn, setFuncOn] = useState<Record<string, boolean>>({});

  // LEE CLIENTE DESDE ?c= O DESDE localStorage (lo que guarda la landing)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let data: any = null;
    const c = params.get("c");
    if (c) {
      try { data = JSON.parse(decodeURIComponent(escape(atob(c)))); } catch {}
    }
    if (!data) {
      try {
        const raw = localStorage.getItem("stockos_last_order");
        if (raw) data = JSON.parse(raw);
      } catch {}
    }
    if (!data) {
      try {
        const raw = localStorage.getItem("stockos_orders");
        if (raw) {
          const arr = JSON.parse(raw);
          if (arr.length) data = arr[arr.length - 1];
        }
      } catch {}
    }
    if (data) {
      setCliente(data);
      // PRE-SELECCIONA LO QUE EL CLIENTE CONTRATO
      if (data.mods && Array.isArray(data.mods)) {
        const extrasDelCliente = data.mods.filter((m: string) => EXTRAS.some(e => e.id === m));
        setSelected(extrasDelCliente);
        // activa funciones por defecto
        const init: Record<string, boolean> = {};
        [...BASE_MODS, ...EXTRAS].forEach(mod => {
          (mod as any).func?.forEach?.((f: string) => init[`${mod.id}::${f}`] = true);
        });
        // tambien marca funciones de base
        BASE_MODS.forEach(mod => init[`${mod.id}::base`] = true);
        setFuncOn(init);
      }
    }
  }, []);

  const total = useMemo(() => BASE + selected.reduce((a, id) => a + (EXTRAS.find(x => x.id === id)?.price || 0), 0), [selected]);

  const toggleExtra = (id: string) => {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const toggleFunc = (modId: string, f: string) => {
    const k = `${modId}::${f}`;
    setFuncOn(p => ({ ...p, [k]: !p[k] }));
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-3">
      <div className="max-w-3xl mx-auto space-y-3">
        {cliente ? (
          <div className="bg-[#dcfce7] border-2 border-[#22c55e] rounded-xl p-4 text-xs">
            <div className="font-black text-sm text-green-900">✅ Cliente pre-creado (del último pedido) - LEYENDO ?c= Y localStorage</div>
            <div className="mt-2 grid grid-cols-2 gap-1">
              <div>Empresa: <b>{cliente.n || cliente.empresa}</b></div>
              <div>NIT: {cliente.nit || "N/A"}</div>
              <div>Dirección: {cliente.dir || cliente.direccion || "N/A"}</div>
              <div>Email: {cliente.e || cliente.email}</div>
              <div>WA: {cliente.w || cliente.wa}</div>
              <div>Método: {cliente.metodo || cliente.metodo_pago || "Nequi"}</div>
            </div>
            <div className="mt-2 bg-white p-2 rounded text-[10px]">Módulos que el CLIENTE seleccionó: <b>{cliente.mods?.join(", ") || "base 8"}</b> - Total que pagó: <b>${cliente.total?.toLocaleString("es-CO")}</b></div>
          </div>
        ) : (
          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-3 text-xs">⚠️ No hay cliente. Entra desde la landing con ?c= o crea un pedido. Se lee de localStorage stockos_last_order.</div>
        )}

        <div className="bg-white rounded-xl p-4 border">
          <div className="flex justify-between items-center">
            <div className="font-black text-xs tracking-widest">MÓDULOS V22 (8 base incluidos + {EXTRAS.length} extras válidos) - V15 con 22 duplicados ELIMINADO</div>
            <div className="text-[10px] bg-black text-white px-2 py-1 rounded-full">SIN TALLER MARCIAL</div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="text-[10px] font-bold opacity-60">BASE 8 (siempre ON)</div>
            {BASE_MODS.map(m => (
              <div key={m.id} className="bg-[#22c55e] text-black rounded-lg p-2 flex justify-between items-center text-xs font-bold">
                <span>{m.name} ✓</span><span className="text-[10px] opacity-60">INCLUIDO $300k</span>
              </div>
            ))}

            <div className="text-[10px] font-bold opacity-60 mt-4">EXTRAS - Se pre-seleccionan según lo que pagó el cliente</div>
            {EXTRAS.map(ex => {
              const isSel = selected.includes(ex.id);
              return (
                <div key={ex.id} className={`border rounded-xl overflow-hidden ${isSel ? 'border-[#22c55e] bg-[#f0fdf4]' : 'border-slate-200 bg-white'}`}>
                  <div className="flex justify-between items-center p-3">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input type="checkbox" checked={isSel} onChange={() => toggleExtra(ex.id)} className="w-4 h-4" />
                      <div>
                        <div className="font-bold text-xs">{ex.name} ${ex.price.toLocaleString("es-CO")}</div>
                        <div className="text-[10px] opacity-60">{ex.func.join(" · ")}</div>
                      </div>
                    </label>
                    <button onClick={() => setOpen(open === ex.id ? "" : ex.id)} className="text-xs bg-slate-100 px-3 py-1 rounded-full">{open === ex.id ? "−" : "+"} Funciones</button>
                  </div>
                  {open === ex.id && (
                    <div className="p-3 grid grid-cols-3 gap-2 bg-white">
                      {ex.func.map(f => {
                        const k = `${ex.id}::${f}`;
                        const on = funcOn[k] ?? isSel;
                        return (
                          <button key={f} onClick={() => toggleFunc(ex.id, f)} className={`text-[10px] p-2 rounded border text-left ${on ? 'bg-black text-white' : 'bg-slate-100'}`}>{f} {on ? "✅" : "⬜"}</button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#0f172a] text-white rounded-2xl p-5 text-center">
          <div className="text-[10px] opacity-60">TOTAL PLAN V22 REAL</div>
          <div className="text-3xl font-black text-[#22c55e]">${total.toLocaleString("es-CO")}</div>
          <div className="text-[10px] opacity-60">Base $300.000 + {selected.length} extras (pre-seleccionados del cliente)</div>
          <div className="mt-2 text-[9px] opacity-40">Si el cliente pagó $465.000, aquí debes ver {selected.length} checks activos. Si no los ves, es porque tu app/page.tsx vieja no guardaba en localStorage. Actualiza también la landing.</div>
        </div>
      </div>
    </div>
  );
}

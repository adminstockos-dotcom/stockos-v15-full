"use client";
import { useState, useMemo, useEffect } from "react";

const BASE_PRICE = 300000;

// V22 LIMPIO - 8 BASE OBLIGATORIOS - SIN TALLER MARCIAL
const MODULOS_V22 = [
  { id: "dash", name: "Dashboard Real", desc: "Ventas, stock y caja", included: true, funciones: ["Ventas hoy", "Stock crítico en rojo", "Caja abierta/cierre", "Pedidos pendientes B1"] },
  { id: "inv", name: "Inventario Maestro", desc: "Unifica A/B/C + fotos", included: true, funciones: ["Importar 3 Excels con origen A/B/C", "Fotos y variantes talla/color", "Código barras + etiquetas", "Descuento automático al vender"] },
  { id: "pos", name: "Facturación POS + DIAN", desc: "Factura 1 clic", included: true, funciones: ["POS 5 seg", "Factura electrónica DIAN", "Tirilla 80mm", "Arqueo y cierre"] },
  { id: "clientes", name: "Clientes y Cartera", desc: "Crédito y abonos", included: true, funciones: ["Mayorista vs Detal", "Crédito y abonos Nequi/Bancolombia", "Recordatorio WA automático", "Historial compras"] },
  { id: "compras", name: "Compras A/B/C", desc: "Costo y proveedor", included: true, funciones: ["Registrar compra A $40.000", "Calcula Mayor 40% = $56.000", "Calcula Detal 85% = $74.000", "Deuda por proveedor"] },
  { id: "ventas", name: "Ventas y Cotizaciones", desc: "Pedido dividido B1", included: true, funciones: ["Detecta pedido dividido 3A+2B+1C", "Unifica en Bodega B1", "Genera guía Inter Rapidísimo", "Cotización WA"] },
  { id: "ganancia", name: "Reportes Ganancia", desc: "Rentabilidad real", included: true, funciones: ["Ganancia por par", "Rentabilidad por proveedor A/B/C", "Producto que más deja", "Vendedor top"] },
  { id: "link", name: "Link Maestro + WA Auto", desc: "stockos.com/inv + 7AM/2PM", included: true, funciones: ["Link filtrable mayor/detal", "Filtro efectivo/transfer/CE", "Disparo auto 7AM", "Disparo auto 2PM a 47 grupos"] },
];

const EXTRAS_V22 = [
  { id: "sucursales", name: "Sucursales", price: 60000, desc: "B1/B2 multi", funciones: ["Crear B2", "Transferencia B1->B2", "Stock por sucursal"] },
  { id: "crm", name: "CRM Avanzado", price: 45000, desc: "Pro", funciones: ["Tags cliente", "Campañas WA", "Ranking compra"] },
  { id: "api", name: "API Shopify/Woo", price: 80000, desc: "Sync", funciones: ["Sync stock", "Sync pedidos", "Webhook"] },
];

export default function AdminV22() {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [openMod, setOpenMod] = useState<string>("dash");
  const [funcActivas, setFuncActivas] = useState<Record<string, boolean>>({});
  const [cliente, setCliente] = useState<any>(null);
  const [generated, setGenerated] = useState<string>("");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c) {
      try { setCliente(JSON.parse(decodeURIComponent(escape(atob(c))))); } catch {}
    }
  }, []);

  const total = useMemo(() => BASE_PRICE + selectedExtras.reduce((a, id) => a + (EXTRAS_V22.find(x => x.id === id)?.price || 0), 0), [selectedExtras]);

  const toggleFunc = (modId: string, func: string) => {
    const key = `${modId}::${func}`;
    setFuncActivas(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenLink = () => {
    const payload = { n: cliente?.n || "MAXIMA IMPORTADORES", total, mods: [...MODULOS_V22.filter(m=>m.included).map(m=>m.id), ...selectedExtras], ts: Date.now() };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const link = `${window.location.origin}/admin/cliente?c=${b64}`;
    setGenerated(link);
  };

  const todosModulos = [...MODULOS_V22, ...EXTRAS_V22.map(e => ({ ...e, included: selectedExtras.includes(e.id) }))].filter(m => (m as any).included !== false || selectedExtras.includes(m.id) || (m as any).included === true);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-3">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* HEADER CLIENTE */}
        {cliente && (
          <div className="bg-[#dcfce7] border border-[#22c55e] rounded-xl p-4 text-sm">
            <div className="font-black">Cliente pre-creado ?c= OK: {cliente.n}</div>
            <div className="text-xs opacity-70">{cliente.e} - {cliente.w} - Total ${cliente.total?.toLocaleString("es-CO")} - {cliente.mods?.join(", ")}</div>
          </div>
        )}

        <div className="bg-[#0f172a] text-white rounded-2xl p-5">
          <div className="text-[10px] tracking-widest opacity-60">PANEL ADMIN V22 - SIN BUCLE - SIN TALLER MARCIAL - SIN DUPLICADOS</div>
          <div className="mt-3 text-lg font-black">Base $300.000 incluye 8 verdes obligatorios</div>
          <div className="text-xs opacity-60 mt-1">V20 build d08c83f restaurado. Link cliente va a /admin/cliente?c= no a landing.</div>
        </div>

        {/* MODULOS CON DESPLIEGUE */}
        <div className="bg-white rounded-2xl p-4 border">
          <div className="font-black text-sm mb-3">Módulos V22 (8 base + {selectedExtras.length} extras) - Click para desplegar funciones</div>
          <div className="space-y-2">
            {MODULOS_V22.map(mod => (
              <div key={mod.id} className="border rounded-xl overflow-hidden">
                <button onClick={() => setOpenMod(openMod === mod.id ? "" : mod.id)} className="w-full flex justify-between items-center p-3 bg-[#22c55e] text-black text-left">
                  <div><div className="font-black text-sm">{mod.name} ✓ INCLUIDO</div><div className="text-[11px] opacity-70">{mod.desc}</div></div>
                  <div className="text-xl">{openMod === mod.id ? "−" : "+"}</div>
                </button>
                {openMod === mod.id && (
                  <div className="p-3 bg-[#f0fdf4] grid grid-cols-2 gap-2">
                    {mod.funciones.map(f => {
                      const key = `${mod.id}::${f}`;
                      const active = funcActivas[key] ?? true;
                      return (
                        <button key={f} onClick={() => toggleFunc(mod.id, f)} className={`text-left text-[11px] p-2 rounded-lg border flex justify-between ${active ? 'bg-white border-[#22c55e] text-black' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
                          <span>{f}</span><span>{active ? "✅" : "⬜"}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {EXTRAS_V22.map(mod => {
              const isSelected = selectedExtras.includes(mod.id);
              return (
                <div key={mod.id} className="border rounded-xl overflow-hidden">
                  <div className="w-full flex justify-between items-center p-3 bg-white text-left">
                    <label className="flex gap-2 items-center flex-1 cursor-pointer">
                      <input type="checkbox" checked={isSelected} onChange={() => setSelectedExtras(s => s.includes(mod.id) ? s.filter(x => x !== mod.id) : [...s, mod.id])} />
                      <div><div className="font-bold text-sm">{mod.name} +${mod.price.toLocaleString("es-CO")}</div><div className="text-[11px] opacity-60">{mod.desc}</div></div>
                    </label>
                    <button onClick={() => setOpenMod(openMod === mod.id ? "" : mod.id)} className="px-3 py-1 bg-slate-100 rounded-full text-xs">{openMod === mod.id ? "−" : "+"}</button>
                  </div>
                  {openMod === mod.id && isSelected && (
                    <div className="p-3 bg-slate-50 grid grid-cols-2 gap-2">
                      {mod.funciones.map(f => {
                        const key = `${mod.id}::${f}`;
                        const active = funcActivas[key] ?? true;
                        return (
                          <button key={f} onClick={() => toggleFunc(mod.id, f)} className={`text-left text-[11px] p-2 rounded-lg border flex justify-between ${active ? 'bg-white border-black' : 'bg-slate-100'}`}>
                            <span>{f}</span><span>{active ? "✅" : "⬜"}</span>
                          </button>
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
          <div className="text-[10px] opacity-60">TOTAL PLAN V22 LIMPIO</div>
          <div className="text-3xl font-black text-[#22c55e]">${total.toLocaleString("es-CO")}</div>
          <div className="text-[10px] opacity-60">Base $300k + {selectedExtras.length} extras - 0 duplicados - 0 Taller Marcial</div>
          <button onClick={handleGenLink} className="w-full mt-4 bg-[#22c55e] text-black font-black py-3 rounded-full">Aprobar y generar link /admin/cliente?c=</button>
          {generated && (
            <div className="mt-3 bg-white text-black rounded-xl p-3 text-left">
              <div className="text-[10px] font-bold">LINK FINAL - YA NO VA A LANDING:</div>
              <div className="text-[8px] break-all bg-slate-100 p-2 rounded mt-1">{generated}</div>
              <a href={generated} target="_blank" className="mt-2 block bg-black text-white text-center py-2 rounded-full text-xs">Abrir panel cliente</a>
            </div>
          )}
        </div>

        <div className="text-[9px] text-center opacity-40">Verificado: sin useRouter, sin supabase, sin Taller Marcial, sin Proveedor B infinito, sin Multibodega duplicado, sin Compras duplicado, sin Importa 3 duplicado, sin Filtros duplicado, sin Catalogo PDF duplicado, sin Offline duplicado. No genera bucle porque link va a /admin/cliente.</div>
      </div>
    </div>
  );
}

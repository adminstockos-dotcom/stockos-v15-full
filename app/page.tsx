"use client";
import { useState, useEffect, useMemo } from "react";

const BASE = 300000;
const BASE_MODS = [
  { id: "dash", name: "Dashboard Real", desc: "Ventas, stock y caja en vivo" },
  { id: "inv", name: "Inventario Maestro", desc: "Tallas, colores, fotos, B1" },
  { id: "pos", name: "Facturación POS + DIAN", desc: "Factura electrónica 1 clic" },
  { id: "clientes", name: "Clientes y Cartera", desc: "Crédito, abonos, WA" },
  { id: "compras", name: "Compras A/B/C", desc: "Unifica 3 excels con origen" },
  { id: "ventas", name: "Ventas y Cotizaciones", desc: "Cotiza, vende, despacha" },
  { id: "ganancia", name: "Reportes Ganancia", desc: "40% mayor / 85% detal" },
  { id: "link", name: "Link Maestro + WA", desc: "stockos.com/inv + 7AM/2PM" },
];
const EXTRAS = [
  { id: "fotos", name: "Fotos y Variantes", price: 30000, desc: "HD + Variantes" },
  { id: "barras", name: "Códigos Barras", price: 35000, desc: "Pistola + Etiquetas" },
  { id: "sucursales", name: "Sucursales B1/B2", price: 60000, desc: "Multi-bodega" },
  { id: "crm", name: "CRM Avanzado", price: 45000, desc: "Tags + Campañas" },
  { id: "ecommerce", name: "E-commerce Pro", price: 70000, desc: "Filtro mayor/detal" },
  { id: "usuarios", name: "Usuarios y Roles", price: 40000, desc: "Vendedores + Caja" },
  { id: "api", name: "API Shopify/Woo", price: 80000, desc: "Sync automático" },
];

export default function LandingPremioOscuro() {
  const [form, setForm] = useState({ empresa: "MAXIMA IMPORTADORES", nit: "", email: "", wa: "" });
  const [selected, setSelected] = useState<string[]>(["fotos", "sucursales"]);
  const [generated, setGenerated] = useState<string>("");
  const [showCheckout, setShowCheckout] = useState(false);

  const total = useMemo(() => BASE + selected.reduce((a, id) => a + (EXTRAS.find(x => x.id === id)?.price || 0), 0), [selected]);

  const handleGenerate = () => {
    if (!form.empresa || !form.email) { alert("Escribe empresa y email"); return; }
    const payload = { n: form.empresa, empresa: form.empresa, nit: form.nit, e: form.email, email: form.email, w: form.wa, wa: form.wa, total, mods: [...BASE_MODS.map(m=>m.id), ...selected], ts: Date.now() };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    try {
      localStorage.setItem("stockos_last_order", JSON.stringify(payload));
      const orders = JSON.parse(localStorage.getItem("stockos_orders") || "[]");
      orders.push(payload);
      localStorage.setItem("stockos_orders", JSON.stringify(orders));
    } catch {}
    const link = `${window.location.origin}/admin?c=${b64}`;
    setGenerated(link);
    setShowCheckout(true);
  };

  const wa = "573044019899";
  const msg = encodeURIComponent(`Hola quiero STOCKOS V22 $300.000 para ${form.empresa} - Total $${total.toLocaleString("es-CO")} - ya tengo comprobante`);

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased selection:bg-[#22c55e] selection:text-black">
      {/* NAV */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 h-[72px] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#22c55e] rounded-xl flex items-center justify-center font-black text-black text-lg">S</div>
          <span className="font-black tracking-tight">STOCKOS</span>
          <span className="text-[#22c55e] font-black">V22</span>
          <span className="hidden md:inline text-[10px] bg-white/10 px-3 py-1 rounded-full tracking-widest ml-3">MAXIMA IMPORTADORES · PREMIO OSCURO</span>
        </div>
        <button onClick={()=>document.getElementById("checkout-form")?.scrollIntoView({behavior:"smooth"})} className="bg-[#22c55e] text-black font-black px-6 py-2.5 rounded-full text-sm hover:bg-white transition">Activar $300.000</button>
      </nav>

      {/* HERO CON IMAGEN A LA DERECHA */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-block bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 text-[11px] font-bold px-4 py-2 rounded-full tracking-widest">V22 · SIN TALLER MARCIAL · SIN DUPLICADOS · PREMIO OSCURO</div>
          <h1 className="mt-6 text-5xl md:text-[68px] font-black leading-[0.85] tracking-tighter">
            VENDE 200<br/>PARES/DÍA<br/><span className="text-[#22c55e]">SIN EXCELS.</span>
          </h1>
          <p className="mt-5 text-white/50 max-w-xl text-[15px] leading-relaxed">Sistema oscuro premium que usan las importadoras de Cali. 8 módulos verdes incluidos + 7 extras opcionales. El cliente paga en línea, selecciona módulos y a ti te llega pre-seleccionado en /admin para configurar WhatsApp, bodegas B1/B2 e inventario.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={()=>document.getElementById("checkout-form")?.scrollIntoView({behavior:"smooth"})} className="bg-[#22c55e] text-black font-black px-7 py-3.5 rounded-full text-sm hover:scale-[1.02] transition">EMPEZAR $300.000 →</button>
            <a href={`https://wa.me/${wa}?text=${msg}`} target="_blank" className="border border-white/15 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/10">WhatsApp 304-401-9899</a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-[10px]">
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3"><div className="font-black text-[#22c55e]">8 VERDES</div><div className="opacity-50">Base incluida</div></div>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3"><div className="font-black">7 EXTRAS</div><div className="opacity-50">Opcionales pago</div></div>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3"><div className="font-black">?c= LINK</div><div className="opacity-50">Auto a /admin</div></div>
          </div>
        </div>

        {/* IMAGEN DERECHA - Mockup del sistema */}
        <div className="relative">
          <div className="bg-gradient-to-br from-[#22c55e]/20 to-transparent rounded-[32px] p-[1px]">
            <div className="bg-[#111] rounded-[31px] p-4 md:p-6 border border-white/5">
              <div className="flex justify-between items-center mb-4"><div className="flex gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><div className="w-3 h-3 bg-yellow-500 rounded-full"></div><div className="w-3 h-3 bg-green-500 rounded-full"></div></div><div className="text-[10px] opacity-40">stockos.com/inv - MAXIMA IMPORTADORES</div></div>
              <div className="bg-[#080808] rounded-2xl p-4">
                <div className="flex justify-between mb-3"><div className="text-xs font-black">Inventario B1 - 1,240 pares</div><div className="text-[10px] bg-[#22c55e] text-black px-2 py-1 rounded-full">En vivo</div></div>
                <div className="grid grid-cols-4 gap-2 text-[9px]">
                  {["REF 101 - Negro 38 $85k","REF 102 - Blanco 39 $90k","REF 103 - Azul 40 $88k","REF 104 - Rojo 37 $92k","REF 105 - Café 38 $85k","REF 106 - Gris 41 $95k","REF 107 - Negro 40 $87k","REF 108 - Beige 39 $89k"].map(r=>(
                    <div key={r} className="bg-white/[0.05] border border-white/5 rounded-lg p-2"><div className="w-full h-8 bg-white/10 rounded mb-1"></div><div className="opacity-60">{r}</div></div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-[#22c55e] text-black rounded-xl p-3 text-center"><div className="text-lg font-black">200</div><div className="text-[9px]">Pares/día</div></div>
                  <div className="bg-white text-black rounded-xl p-3 text-center"><div className="text-lg font-black">$12.5M</div><div className="text-[9px]">Ventas hoy</div></div>
                  <div className="bg-white/10 rounded-xl p-3 text-center"><div className="text-lg font-black">B1→B2</div><div className="text-[9px]">Transfer</div></div>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-center opacity-30">Vista cliente - Link stockos.com/inv + WA Auto 7AM/2PM</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[#22c55e] text-black rounded-2xl p-4 shadow-2xl hidden md:block"><div className="text-[10px] font-black">TOTAL</div><div className="text-xl font-black">${total.toLocaleString("es-CO")}</div><div className="text-[9px]">Base + {selected.length} extras</div></div>
        </div>
      </section>

      {/* 8 BASE VERDES */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-6"><h2 className="text-2xl font-black">Lo que incluye tu base <span className="text-[#22c55e]">$300.000</span></h2><span className="text-xs text-white/40">8 MÓDULOS VERDES · OBLIGATORIOS</span></div>
        <div className="grid md:grid-cols-4 gap-4">
          {BASE_MODS.map(m=>(
            <div key={m.id} className="bg-[#22c55e] text-black p-5 rounded-[20px] hover:scale-[1.02] transition">
              <div className="text-[10px] font-black tracking-widest opacity-60">INCLUIDO</div>
              <div className="font-black text-[16px] mt-2 leading-tight">{m.name}</div>
              <div className="text-xs font-medium opacity-70 mt-1">{m.desc}</div>
              <div className="mt-3 text-[10px] bg-black text-white inline-block px-2 py-1 rounded-full">ON ✓</div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + EXTRAS - CHECKOUT REAL */}
      <section id="checkout-form" className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-6">
        {/* FORM */}
        <div className="md:col-span-3 bg-white text-black rounded-[32px] p-8 md:p-10">
          <h3 className="text-3xl font-black">Compra en línea - Crea tu empresa</h3>
          <p className="text-black/60 mt-2 text-sm">El cliente ingresa datos, selecciona extras, paga y tú lo ves pre-seleccionado en /admin para configurar WA, bodegas e inventario.</p>
          
          <div className="mt-6 space-y-3">
            <input placeholder="Empresa ej: MAXIMA IMPORTADORES" value={form.empresa} onChange={e=>setForm({...form, empresa:e.target.value})} className="w-full border-2 border-black/10 focus:border-[#22c55e] p-4 rounded-2xl text-sm font-bold outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="NIT" value={form.nit} onChange={e=>setForm({...form, nit:e.target.value})} className="border-2 border-black/10 p-4 rounded-2xl text-sm outline-none focus:border-[#22c55e]" />
              <input placeholder="WhatsApp" value={form.wa} onChange={e=>setForm({...form, wa:e.target.value})} className="border-2 border-black/10 p-4 rounded-2xl text-sm outline-none focus:border-[#22c55e]" />
            </div>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border-2 border-black/10 p-4 rounded-2xl text-sm outline-none focus:border-[#22c55e]" />
          </div>

          <div className="mt-8">
            <div className="font-black text-xs tracking-widest">EXTRAS OPCIONALES (7) - El cliente selecciona lo que paga</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {EXTRAS.map(ex=>{
                const sel = selected.includes(ex.id);
                return (
                  <label key={ex.id} className={`border-2 p-4 rounded-2xl cursor-pointer flex justify-between items-center transition ${sel ? 'border-[#22c55e] bg-[#f0fdf4]' : 'border-black/10 hover:border-black/20'}`}>
                    <div><div className="font-black text-sm">{ex.name} <span className="text-[#22c55e]">+${ex.price.toLocaleString("es-CO")}</span></div><div className="text-[11px] opacity-60">{ex.desc}</div></div>
                    <input type="checkbox" checked={sel} onChange={()=>setSelected(s=> s.includes(ex.id) ? s.filter(x=>x!==ex.id) : [...s, ex.id])} className="w-5 h-5 accent-[#22c55e]" />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-6 bg-[#0f172a] text-white rounded-2xl p-5 flex justify-between items-center">
            <div><div className="text-[10px] opacity-60">TOTAL A PAGAR</div><div className="text-3xl font-black text-[#22c55e]">${total.toLocaleString("es-CO")}</div><div className="text-[10px] opacity-60">Base $300k + {selected.length} extras</div></div>
            <button onClick={handleGenerate} className="bg-[#22c55e] text-black font-black px-8 py-4 rounded-full hover:bg-white transition">Crear empresa y generar link ?c=</button>
          </div>

          {generated && (
            <div className="mt-6 bg-[#22c55e]/10 border-2 border-[#22c55e] rounded-2xl p-4">
              <div className="font-black text-xs">✅ LINK GENERADO - Guardado en localStorage</div>
              <div className="text-[9px] break-all bg-white p-2 rounded-lg mt-2 border">{generated}</div>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>navigator.clipboard.writeText(generated)} className="flex-1 bg-black text-white py-3 rounded-full text-xs font-bold">Copiar link</button>
                <a href={generated} className="flex-1 bg-[#22c55e] text-black py-3 rounded-full text-xs font-black text-center">Ir a /admin →</a>
              </div>
              <div className="text-[10px] mt-2 text-green-800">Ahora en /admin verás: {selected.join(", ")} pre-seleccionados. Listo para configurar WA, bodegas B1/B2, inventario.</div>
            </div>
          )}

          <div className="mt-8 grid md:grid-cols-3 gap-3">
            <div className="border-2 border-[#22c55e] rounded-2xl p-4 flex justify-between"><div><div className="font-black text-xs">NEQUI</div><div className="font-mono font-black">321 598 1307</div><div className="text-xs opacity-60">Andrés Castillo</div></div><div className="w-8 h-8 bg-[#22c55e] rounded-full flex items-center justify-center font-black">N</div></div>
            <div className="border-2 border-black rounded-2xl p-4 flex justify-between"><div><div className="font-black text-xs">BANCOLOMBIA</div><div className="font-mono font-black">912-510747-93</div><div className="text-xs opacity-60">Ahorros</div></div><div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-black">B</div></div>
            <div className="border rounded-2xl p-4 flex justify-between"><div><div className="font-black text-xs">PAYPAL</div><div className="text-[11px] font-mono font-black break-all">andreskstllo@gmail.com</div></div><div className="w-8 h-8 bg-[#0070BA] text-white rounded-full flex items-center justify-center font-black">P</div></div>
          </div>
        </div>

        {/* COLUMNA DERECHA - CONFIGURACION */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-[#111] border border-white/10 rounded-[24px] p-6">
            <h4 className="font-black">Después en /admin configuras:</h4>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex gap-3"><div className="w-8 h-8 bg-[#22c55e] rounded-full flex items-center justify-center text-black font-black">1</div><div><div className="font-bold">WhatsApp</div><div className="text-xs opacity-60">Número para disparos 7AM/2PM, recordatorios cartera</div></div></div>
              <div className="flex gap-3"><div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-black">2</div><div><div className="font-bold">Bodegas B1/B2</div><div className="text-xs opacity-60">Crear B2, transfer B1→B2, stock por sucursal</div></div></div>
              <div className="flex gap-3"><div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-black">3</div><div><div className="font-bold">Inventario</div><div className="text-xs opacity-60">Carga masiva, tallas/colores, fotos HD, códigos barras</div></div></div>
              <div className="flex gap-3"><div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-black">4</div><div><div className="font-bold">Funciones</div><div className="text-xs opacity-60">Activar/desactivar funciones por módulo (ON/OFF por cliente)</div></div></div>
            </div>
            <div className="mt-6 bg-[#22c55e] text-black rounded-xl p-3 text-xs font-bold">✅ Cuando el cliente paga $445.000 con 3 extras, en /admin los verás ya marcados en verde, listos para activar.</div>
          </div>
          <div className="bg-[#22c55e] text-black rounded-[24px] p-6 text-center">
            <div className="text-xs font-black tracking-widest opacity-60">TOTAL PLAN V22</div>
            <div className="text-4xl font-black mt-1">${total.toLocaleString("es-CO")}</div>
            <div className="text-xs mt-1">Base $300k + {selected.length} extras pre-seleccionados</div>
            <a href={`https://wa.me/${wa}?text=${msg}`} target="_blank" className="mt-4 block bg-black text-white font-black py-3 rounded-full">Enviar comprobante WA →</a>
          </div>
        </div>
      </section>

      <footer className="text-center py-10 text-[10px] opacity-30 tracking-widest">STOCKOS V22 PREMIO OSCURO · SANTIAGO DE CALI · 2026 · SIN TALLER MARCIAL</footer>
      <a href={`https://wa.me/${wa}?text=${msg}`} target="_blank" className="fixed bottom-6 right-6 bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl font-black text-white text-xl">W</a>
    </div>
  );
}

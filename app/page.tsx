"use client";
import { useState, useEffect } from "react";

const MODULOS_BASE = [
  { name: "Dashboard Real", desc: "Ventas, stock y caja en vivo" },
  { name: "Inventario Maestro", desc: "Tallas, colores, fotos y bodega B1" },
  { name: "Facturación POS + DIAN", desc: "Factura electrónica en 1 clic" },
  { name: "Clientes y Cartera", desc: "Crédito, abonos, recordatorios WA" },
  { name: "Compras Proveedores A/B/C", desc: "Unifica 3 excels con origen" },
  { name: "Ventas y Cotizaciones", desc: "Cotiza, vende, despacha, guía" },
  { name: "Reportes de Ganancia", desc: "40% mayor / 85% detal real" },
  { name: "Link Maestro + WA Auto", desc: "stockos.com/inv + disparo 7AM/2PM" },
];

export default function Page() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [clienteData, setClienteData] = useState<any>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("c");
    if (c) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(c))));
        setClienteData(decoded);
        console.log("CLIENTE STOCKOS:", decoded);
      } catch (e) { console.log("link c invalido") }
    }
  }, []);
  const wa = "573044019899";
  const msg = encodeURIComponent("Hola quiero STOCKOS V22 $300.000 para MAXIMA IMPORTADORES - ya tengo comprobante");

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased selection:bg-[#22c55e] selection:text-black">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 h-[72px] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#22c55e] rounded-xl flex items-center justify-center font-black text-black">S</div>
          <span className="font-black tracking-tight">STOCKOS V22</span>
          <span className="hidden md:inline text-[10px] bg-white/10 px-2 py-1 rounded-full tracking-widest">MAXIMA IMPORTADORES · LIMPIO</span>
        </div>
        <button onClick={()=>setShowCheckout(true)} className="bg-[#22c55e] text-black font-black px-6 py-2.5 rounded-full text-sm hover:bg-white transition">Activar $300.000</button>
      </nav>

      {clienteData && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="bg-[#22c55e] text-black rounded-2xl p-5 flex justify-between items-center">
            <div><div className="font-black text-xs">PANEL CLIENTE ACTIVADO</div><div className="text-lg font-black">{clienteData.n} - {clienteData.e}</div><div className="text-sm">Total: ${clienteData.total?.toLocaleString("es-CO")} - Mods: {clienteData.mods?.join(", ")}</div></div>
            <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold">?c= OK</div>
          </div>
        </div>
      )}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <div className="inline-block bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 text-xs font-bold px-4 py-2 rounded-full tracking-widest">V22 · SIN TALLER MARCIAL · SIN DUPLICADOS · BUILD d08c83f</div>
        <h1 className="mt-8 text-5xl md:text-[72px] font-black leading-[0.9] tracking-tighter">
          STOCKOS <span className="text-[#22c55e]">V22</span><br/>BASE $300K<br/>8 VERDES.
        </h1>
        <p className="mt-6 text-white/50 max-w-2xl mx-auto text-lg">Diseño oscuro premium V20 restaurado. Eliminamos Taller Marcial y módulos repetidos. Solo lo esencial para vender 200 pares/día. Tailwind puro, cero errores TSX.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={()=>setShowCheckout(true)} className="bg-[#22c55e] text-black font-black px-8 py-4 rounded-full text-lg hover:scale-[1.02] transition">EMPEZAR AHORA $300.000</button>
          <a href={`https://wa.me/${wa}?text=${msg}`} target="_blank" className="border border-white/15 px-8 py-4 rounded-full font-bold hover:bg-white/10">WhatsApp 304-401-9899</a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-black">Lo que incluye tu base <span className="text-[#22c55e]">$300.000</span></h2>
          <span className="text-xs text-white/40">8 MÓDULOS VERDES · OBLIGATORIOS</span>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {MODULOS_BASE.map(m=>(
            <div key={m.name} className="bg-[#22c55e] text-black p-6 rounded-[20px]">
              <div className="text-[10px] font-black tracking-widest opacity-60">INCLUIDO</div>
              <div className="font-black text-[18px] mt-2 leading-tight">{m.name}</div>
              <div className="text-sm font-medium opacity-70 mt-1">{m.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-3 text-xs">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">❌ Eliminado: Taller Marcial</div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">❌ Eliminado: Duplicados Finanzas/Reportes</div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white/60">✅ Código base V20 d08c83f limpio · Tailwind</div>
        </div>
      </section>

      <section id="checkout" className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white text-black rounded-[32px] p-8 md:p-10 shadow-[0_0_80px_rgba(34,197,94,0.2)]">
          <h3 className="text-3xl font-black">Checkout Real V22</h3>
          <p className="text-black/60 mt-2 text-sm">Paga y envía comprobante al WhatsApp para activación inmediata en menos de 2 horas.</p>
          <div className="mt-8 space-y-4">
            <div className="border-2 border-[#22c55e] rounded-2xl p-5 flex justify-between items-center">
              <div><div className="font-black text-xs tracking-widest">NEQUI</div><div className="text-2xl font-mono font-black mt-1">321 598 1307</div><div className="text-xs text-black/60">Andrés Castillo</div></div>
              <div className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center font-black">N</div>
            </div>
            <div className="border-2 border-black rounded-2xl p-5 flex justify-between items-center">
              <div><div className="font-black text-xs tracking-widest">BANCOLOMBIA AHORROS</div><div className="text-2xl font-mono font-black mt-1">912-510747-93</div><div className="text-xs text-black/60">Andrés Castillo</div></div>
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black">B</div>
            </div>
            <div className="border rounded-2xl p-5 flex justify-between items-center">
              <div><div className="font-black text-xs tracking-widest">PAYPAL</div><div className="text-base font-mono font-black mt-1 break-all">andreskstllo@gmail.com</div><div className="text-xs text-black/60">Internacional</div></div>
              <div className="w-10 h-10 bg-[#0070BA] text-white rounded-full flex items-center justify-center font-black">P</div>
            </div>
          </div>
          <a href={`https://wa.me/${wa}?text=${msg}`} target="_blank" className="mt-8 w-full bg-black text-white font-black py-4 rounded-full flex justify-center hover:bg-[#22c55e] hover:text-black transition">ENVIÉ COMPROBANTE → WA 304-401-9899</a>
          <div className="text-center text-[10px] text-black/40 mt-3 tracking-widest">STOCKOS V22 · SANTIAGO DE CALI · 2026</div>
        </div>
      </section>

      <a href={`https://wa.me/${wa}?text=${msg}`} target="_blank" className="fixed bottom-6 right-6 bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl font-black text-white text-xl">W</a>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center p-6 z-50">
          <div className="bg-white text-black rounded-[24px] p-8 max-w-sm w-full">
            <h4 className="font-black text-xl">Activar V22 por $300.000?</h4>
            <p className="text-sm text-black/60 mt-2">8 módulos verdes, sin Taller Marcial, checkout real.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={()=>setShowCheckout(false)} className="flex-1 border py-3 rounded-full font-bold">Cerrar</button>
              <a href={`https://wa.me/${wa}?text=${msg}`} className="flex-1 bg-[#22c55e] text-black py-3 rounded-full font-black text-center">WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

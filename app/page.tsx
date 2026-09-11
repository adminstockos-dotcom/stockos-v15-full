"use client";
import { useState, useEffect, useMemo } from "react";

const BASE = 300000;
const BASE_MODS = [
  { id: "dash", name: "Dashboard Real", desc: "Ventas, stock y caja" },
  { id: "inv", name: "Inventario Maestro", desc: "Unifica A/B/C" },
  { id: "pos", name: "Facturación POS + DIAN", desc: "1 clic" },
  { id: "clientes", name: "Clientes y Cartera", desc: "Crédito y abonos" },
  { id: "compras", name: "Compras A/B/C", desc: "Costo real" },
  { id: "ventas", name: "Ventas y Cotizaciones", desc: "Pedido dividido B1" },
  { id: "ganancia", name: "Reportes Ganancia", desc: "40%/85%" },
  { id: "link", name: "Link Maestro + WA", desc: "7AM/2PM auto" },
];

const EXTRAS = [
  { id: "fotos", name: "Fotos y Variantes", price: 30000 },
  { id: "barras", name: "Códigos Barras", price: 35000 },
  { id: "sucursales", name: "Sucursales B1/B2", price: 60000 },
  { id: "crm", name: "CRM Avanzado", price: 45000 },
  { id: "ecommerce", name: "E-commerce Pro", price: 70000 },
  { id: "usuarios", name: "Usuarios y Roles", price: 40000 },
  { id: "api", name: "API Shopify/Woo", price: 80000 },
];

export default function Page() {
  const [form, setForm] = useState({ empresa: "", nit: "", email: "", wa: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [generated, setGenerated] = useState<string>("");

  const total = useMemo(() => BASE + selected.reduce((a, id) => a + (EXTRAS.find(x => x.id === id)?.price || 0), 0), [selected]);

  const handleGenerate = () => {
    if (!form.empresa || !form.email) { alert("Escribe empresa y email"); return; }
    const payload = { 
      n: form.empresa, 
      empresa: form.empresa,
      nit: form.nit, 
      e: form.email, 
      email: form.email,
      w: form.wa, 
      wa: form.wa,
      total, 
      mods: [...BASE_MODS.map(m=>m.id), ...selected],
      ts: Date.now() 
    };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    // GUARDA EN LOCALSTORAGE PARA QUE /admin LO LEA
    localStorage.setItem("stockos_last_order", JSON.stringify(payload));
    const orders = JSON.parse(localStorage.getItem("stockos_orders") || "[]");
    orders.push(payload);
    localStorage.setItem("stockos_orders", JSON.stringify(orders));
    const link = `${window.location.origin}/admin?c=${b64}`;
    setGenerated(link);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-10">
          <h1 className="text-4xl font-black">STOCKOS V22 <span className="text-[#22c55e]">$300K BASE</span></h1>
          <p className="text-white/60 text-sm mt-2">8 verdes incluidos + 7 extras opcionales - Sin Taller Marcial - Sin duplicados</p>
        </div>

        <div className="bg-white text-black rounded-2xl p-5">
          <input placeholder="Empresa ej: MAXIMA IMPORTADORES" value={form.empresa} onChange={e=>setForm({...form, empresa:e.target.value})} className="w-full border p-3 rounded-xl mb-2 text-sm" />
          <div className="flex gap-2 mb-2">
            <input placeholder="NIT" value={form.nit} onChange={e=>setForm({...form, nit:e.target.value})} className="flex-1 border p-3 rounded-xl text-sm" />
            <input placeholder="WhatsApp" value={form.wa} onChange={e=>setForm({...form, wa:e.target.value})} className="flex-1 border p-3 rounded-xl text-sm" />
          </div>
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border p-3 rounded-xl text-sm" />
        </div>

        <div className="mt-4 bg-white text-black rounded-2xl p-5">
          <div className="font-black text-xs">BASE 8 INCLUIDOS $300.000</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {BASE_MODS.map(m=> <div key={m.id} className="bg-[#22c55e] text-black text-xs font-bold p-2 rounded-lg">{m.name} ✓</div>)}
          </div>
          <div className="font-black text-xs mt-4">EXTRAS OPCIONALES (7) - Selecciona lo que el cliente paga</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {EXTRAS.map(ex=>(
              <label key={ex.id} className={`border p-2 rounded-lg text-xs cursor-pointer flex justify-between ${selected.includes(ex.id) ? 'bg-black text-white' : 'bg-white'}`}>
                <span>{ex.name} +${ex.price.toLocaleString("es-CO")}</span>
                <input type="checkbox" checked={selected.includes(ex.id)} onChange={()=> setSelected(s=> s.includes(ex.id) ? s.filter(x=>x!==ex.id) : [...s, ex.id])} />
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-[#0f172a] text-white rounded-2xl p-5 text-center">
          <div className="text-xs opacity-60">TOTAL</div>
          <div className="text-3xl font-black text-[#22c55e]">${total.toLocaleString("es-CO")}</div>
          <button onClick={handleGenerate} className="w-full mt-4 bg-[#22c55e] text-black font-black py-3 rounded-full">Crear empresa y generar link ?c=</button>
          {generated && (
            <div className="mt-4 bg-white text-black rounded-xl p-3 text-left">
              <div className="text-[10px] font-bold">LINK GENERADO - Llévalo a /admin:</div>
              <div className="text-[8px] break-all bg-slate-100 p-2 rounded mt-1">{generated}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>navigator.clipboard.writeText(generated)} className="flex-1 bg-black text-white py-2 rounded-full text-xs">Copiar</button>
                <a href={generated} className="flex-1 bg-[#22c55e] text-black py-2 rounded-full text-xs font-bold text-center">Ir a /admin</a>
              </div>
              <div className="text-[9px] mt-2 text-green-700">✅ Guardado en localStorage stockos_last_order. Ahora /admin leerá lo que el cliente seleccionó.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// @ts-nocheck
"use client";
import { useState } from "react";
const BASE_PRICE = 300000;
const MODULOS = [
  {id:"core1", nombre:"Inventario", precio:0, base:true, desc:"Control de stock básico"},
  {id:"core2", nombre:"Ventas POS", precio:0, base:true, desc:"Punto de venta rápido"},
  {id:"core3", nombre:"Clientes", precio:0, base:true, desc:"Base de clientes"},
  {id:"core4", nombre:"Reportes", precio:0, base:true, desc:"Reportes diarios"},
  {id:"core5", nombre:"Caja", precio:0, base:true, desc:"Cierre de caja"},
  {id:"core6", nombre:"Usuarios", precio:0, base:true, desc:"Usuarios y permisos"},
  {id:"core7", nombre:"Productos", precio:0, base:true, desc:"Catálogo"},
  {id:"core8", nombre:"Soporte", precio:0, base:true, desc:"Soporte"},
  {id:"multibodega", nombre:"Multibodega", precio:15000, base:false, desc:"Controla San Bosco + Bodega 2. Traslados automáticos y stock mínimo por bodega. Ideal para MAXIMA IMPORTADORES."},
  {id:"facturacion", nombre:"Facturación Electrónica DIAN", precio:20000, base:false, desc:"Factura ilimitada con validación DIAN, envío automático al email."},
  {id:"proveedores", nombre:"Proveedores y Compras", precio:15000, base:false, desc:"Órdenes de compra, cuentas por pagar y evaluación de proveedores."},
  {id:"contabilidad", nombre:"Contabilidad", precio:20000, base:false, desc:"Libro diario, balance y exportación a tu contador."},
  {id:"cotizaciones", nombre:"Cotizaciones", precio:12000, base:false, desc:"Cotiza en segundos y convierte a venta con un clic."},
  {id:"barras", nombre:"Códigos de Barras", precio:10000, base:false, desc:"Imprime etiquetas y lee con pistola."},
  {id:"online", nombre:"Tienda Online", precio:25000, base:false, desc:"Sincroniza stock con tu web."},
];
export default function Page(){
  const [empresa,setEmpresa]=useState({nombre:"",nit:"",dir:"",wa:"",email:"",ciudad:""});
  const [mods,setMods]=useState(MODULOS.filter(m=>m.base).map(m=>m.id));
  const [expanded,setExpanded]=useState(null);
  const [showComp,setShowComp]=useState(false);
  const [metodo,setMetodo]=useState("");
  const [file,setFile]=useState(null);
  const total = BASE_PRICE + MODULOS.filter(m=>mods.includes(m.id) && !m.base).reduce((s,m)=>s+m.precio,0);
  const toggleMod=(id,base)=>{ if(base) return; if(mods.includes(id)) setMods(mods.filter(m=>m!==id)); else setMods([...mods,id]); }
  return(
  <div className="min-h-screen bg-white text-black">
    <header className="flex justify-between p-4 border-b"><div className="flex items-center gap-2"><img src="/logo.png" className="h-8" onError={e=>e.currentTarget.style.display='none'} /><span className="font-bold">STOCKOS V21</span></div><div className="w-2 h-2 bg-black rounded-full cursor-pointer" onClick={()=>location.href='/admin'}>.</div></header>
    <section className="p-8 bg-gray-50 text-center"><h1 className="text-3xl font-bold">Tu empresa en orden con STOCKOS</h1><p className="mt-2">Base $300.000 - 8 módulos incluidos</p><button onClick={()=>document.getElementById('form-empresa')?.scrollIntoView({behavior:'smooth'})} className="mt-4 bg-green-600 text-white px-8 py-4 rounded-xl font-bold">Crear mi empresa →</button></section>
    <div id="form-empresa" className="max-w-2xl mx-auto p-6 border rounded-xl mt-6"><h2 className="font-bold text-xl">Datos de tu empresa</h2><p className="text-sm text-gray-600">Ej: MAXIMA IMPORTADORES - 14836265-4 - CL 7 14 57 SAN BOSCO CALI - 3186411851</p>
      <input placeholder="Nombre empresa * MAXIMA IMPORTADORES" className="w-full border p-3 rounded mt-3" value={empresa.nombre} onChange={e=>setEmpresa({...empresa,nombre:e.target.value})} />
      <input placeholder="NIT * 14836265-4" className="w-full border p-3 rounded mt-2" value={empresa.nit} onChange={e=>setEmpresa({...empresa,nit:e.target.value})} />
      <input placeholder="Dirección CL 7 14 57 SAN BOSCO CALI" className="w-full border p-3 rounded mt-2" value={empresa.dir} onChange={e=>setEmpresa({...empresa,dir:e.target.value})} />
      <input placeholder="WhatsApp * 3186411851" className="w-full border p-3 rounded mt-2" value={empresa.wa} onChange={e=>setEmpresa({...empresa,wa:e.target.value})} />
      <input placeholder="Email * maxima@importadores.com" className="w-full border p-3 rounded mt-2" value={empresa.email} onChange={e=>setEmpresa({...empresa,email:e.target.value})} />
      <input placeholder="Ciudad Cali" className="w-full border p-3 rounded mt-2" value={empresa.ciudad} onChange={e=>setEmpresa({...empresa,ciudad:e.target.value})} />
      <button onClick={()=>{if(!empresa.nombre||!empresa.nit||!empresa.email||!empresa.wa){alert('Completa Empresa, NIT, Email y WA');return;} localStorage.setItem('stockos_cliente',JSON.stringify(empresa)); document.getElementById('modulos-section')?.scrollIntoView({behavior:'smooth'});}} className="w-full bg-black text-white py-4 rounded-xl font-bold mt-4">✅ Guardar datos y ver módulos</button>
    </div>
    <div id="modulos-section" className="max-w-3xl mx-auto p-6 mt-6"><h2 className="font-bold text-xl">Elige módulos - Total: ${total.toLocaleString()} COP</h2>
      <div className="grid gap-2 mt-4">{MODULOS.map(m=>{const active=mods.includes(m.id); const isExp=expanded===m.id; return (<div key={m.id} className={`border rounded-xl p-4 cursor-pointer ${active?'bg-green-50 border-green-500':'bg-white'}`} onClick={()=>{if(!m.base){setExpanded(isExp?null:m.id); toggleMod(m.id,m.base);}}}><div className="flex justify-between"><span className="font-bold">{m.nombre} {m.base?'(BASE INCLUIDO)':`+ $${m.precio.toLocaleString()}`}</span><span>{active?'✅':'+'}</span></div>{isExp && <div className="mt-3 text-sm bg-white p-3 rounded border">{m.desc}<br/><b>→ Actívalo por ${m.precio.toLocaleString()} extra.</b></div>}</div>)})}</div>
    </div>
    <div className="max-w-2xl mx-auto p-6 border rounded-xl mt-6"><h2 className="font-bold text-xl">Pagar - Total ${total.toLocaleString()} COP</h2>
      <button onClick={()=>{setMetodo('PayPal Tarjeta - COP'); setShowComp(true); window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=andreskstllo@gmail.com&amount=${total}&currency_code=COP&item_name=STOCKOS ${empresa.nombre}`, '_blank');}} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-3">Paga con Tarjeta por PayPal - ${total.toLocaleString()} COP</button>
      <button onClick={()=>{setMetodo('Nequi'); setShowComp(true); navigator.clipboard.writeText('3215981307'); window.open('https://www.nequi.com.co/', '_blank'); alert('Nequi 3215981307 copiado + Valor $'+total);}} className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold mt-3">Paga con Nequi 3215981307 - ${total.toLocaleString()} COP (copia auto)</button>
      <div className="bg-purple-100 p-3 rounded mt-2 text-sm">Nequi: 3215981307 | Valor: ${total.toLocaleString()} COP</div>
      <button onClick={()=>{setMetodo('Bancolombia'); setShowComp(true); navigator.clipboard.writeText('912-510747-93'); window.open('https://sucursalpersonas.transaccionesbancolombia.com/', '_blank'); alert('Bancolombia 912-510747-93 copiada + Valor $'+total);}} className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold mt-3">Paga con Bancolombia Ahorros 912-510747-93 - ${total.toLocaleString()} COP</button>
      <div className="bg-yellow-100 p-3 rounded mt-2 text-sm">Ahorros: 912-510747-93 | Valor: ${total.toLocaleString()} COP</div>
      {showComp && (<div className="border-2 border-green-600 p-6 bg-green-50 rounded-xl mt-6"><h3 className="font-bold text-lg">✅ Paso 2: Ya pagaste por {metodo}?</h3><input type="file" accept="image/*,application/pdf" onChange={e=>setFile(e.target.files[0])} className="mt-4 w-full border p-2 bg-white rounded" /><div className="text-xs mt-2">Archivo: {file?.name||'Ninguno'}</div><button onClick={()=>{const nuevo={id:Date.now(), empresa:empresa.nombre, nit:empresa.nit, dir:empresa.dir, email:empresa.email, wa:empresa.wa, ciudad:empresa.ciudad||'Cali', mods, total, metodo, comp:file?.name||'sin archivo', fecha:new Date().toISOString()}; const orders=JSON.parse(localStorage.getItem('stockos_orders')||'[]'); localStorage.setItem('stockos_orders', JSON.stringify([...orders,nuevo])); localStorage.setItem('lastOrder', JSON.stringify(nuevo)); const msg=`✅ PAGO STOCKOS\nEmpresa:${empresa.nombre}\nNIT:${empresa.nit}\nDir:${empresa.dir}\nEmail:${empresa.email}\nWA:${empresa.wa}\nCiudad:${empresa.ciudad}\nMods:${mods.join(',')}\nTotal:$${total}\nMedio:${metodo}\nComp:${file?.name||'verificar'}\nHora:${new Date().toLocaleString()}`; window.open(`https://wa.me/573044019899?text=${encodeURIComponent(msg)}`, '_blank'); alert('Enviado a 304-401-9899');}} className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg mt-4">📤 YA PAGUÉ - ENVIAR COMPROBANTE AHORA A 304-401-9899</button></div>)}
    </div><div className="h-20"></div></div>
  )
}

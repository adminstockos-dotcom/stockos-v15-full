"use client";
import { useState, useEffect } from "react";

const BASE = 300000;
type Proveedor = { id: string; nombre: string; bodega: string };
type Producto = { id: string; nombre: string; costo: number; talla: string; color: string; stocks: Record<string, number> };

const STEPS = ["Empresa", "Bodegas B1→B∞", "Productos + 40%/85%", "Inventario Maestro", "Link Venta Automática", "Prueba Venta"];

export default function Home() {
  const [empresa, setEmpresa] = useState({ nombre: "Máxima Importadores", nit: "", wa: "3215981307", email: "adminstockos@gmail.com" });
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    { id: "b1", nombre: "Proveedor A", bodega: "B1" },
    { id: "b2", nombre: "Proveedor B", bodega: "B2" },
    { id: "b3", nombre: "Proveedor C", bodega: "B3" },
  ]);
  const [productos, setProductos] = useState<Producto[]>([
    { id: "p1", nombre: "Tenis Runner X", costo: 80000, talla: "38", color: "Negro", stocks: { b1: 5, b2: 3, b3: 0 } },
    { id: "p2", nombre: "Tenis Runner X", costo: 80000, talla: "39", color: "Blanco", stocks: { b1: 2, b2: 0, b3: 4 } },
  ]);
  const [paso, setPaso] = useState(0);
  const [mods, setMods] = useState<string[]>([]);
  const [linkGen, setLinkGen] = useState<string>("");
  const [carrito, setCarrito] = useState<{prodId:string, qty:number}[]>([]);
  const [filtro, setFiltro] = useState<"mayor"|"detal">("detal");
  const [pago, setPago] = useState<"efectivo"|"transferencia"|"contraentrega">("efectivo");

  const MODULES = [
    { id: "prov", name: "Proveedores A/B/C (B∞)", price: 50000 },
    { id: "pedidos", name: "Pedidos divididos unificados", price: 60000 },
    { id: "ganancia", name: "Ganancia 40%/85% auto", price: 30000 },
    { id: "compras", name: "Compras a proveedores", price: 50000 },
    { id: "multibodega", name: "Multi-bodega B1/B2/B3", price: 40000 },
  ];

  const total = BASE + mods.reduce((s,id)=> s + (MODULES.find(m=>m.id===id)?.price||0),0);

  const addProveedor = () => {
    const n = proveedores.length + 1;
    setProveedores([...proveedores, { id: `b${n}`, nombre: `Proveedor ${String.fromCharCode(64+n)}`, bodega: `B${n}` }]);
  };

  const addProducto = () => {
    const id = `p${Date.now()}`;
    const newProd: Producto = { id, nombre: "Nuevo Producto", costo: 70000, talla: "38", color: "Negro", stocks: {} };
    proveedores.forEach(p=> newProd.stocks[p.id]=0);
    setProductos([...productos, newProd]);
  };

  const calcMayor = (costo:number) => Math.round(costo*1.4);
  const calcDetal = (costo:number) => Math.round(costo*1.85);

  const inventarioMaestro = productos.map(p=>{
    const totalStock = Object.values(p.stocks).reduce((a,b)=>a+b,0);
    return { ...p, totalStock, mayor: calcMayor(p.costo), detal: calcDetal(p.costo) };
  });

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const c = params.get("c");
    if(c){
      try{
        const data = JSON.parse(decodeURIComponent(escape(atob(c))));
        if(data.empresa) setEmpresa(data.empresa);
        if(data.proveedores) setProveedores(data.proveedores);
        if(data.productos) setProductos(data.productos);
        if(data.mods) setMods(data.mods);
      }catch{}
    }
  },[]);

  const generarLinkEmpresa = () => {
    const payload = { empresa, proveedores, productos, mods, base: BASE, total, ts: Date.now() };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const link = `${window.location.origin}${window.location.pathname}?c=${b64}`;
    setLinkGen(link);
    return link;
  };

  const venderAutomatico = () => {
    let detalle = carrito.map(item=>{
      const prod = productos.find(p=>p.id===item.prodId)!;
      let restante = item.qty;
      let origen: string[] = [];
      for(const prov of proveedores){
        const disp = prod.stocks[prov.id]||0;
        if(disp>0 && restante>0){
          const toma = Math.min(disp, restante);
          origen.push(`${toma} de ${prov.bodega}`);
          restante -= toma;
        }
      }
      return `${prod.nombre} T${prod.talla} x${item.qty} → ${origen.join(" + ")} ${restante>0 ? `(FALTAN ${restante})` : "(OK B1 unificado)"}`;
    }).join("\n");

    const totalVenta = carrito.reduce((sum,it)=>{
      const prod = productos.find(p=>p.id===it.prodId)!;
      const precio = filtro==="mayor" ? calcMayor(prod.costo) : calcDetal(prod.costo);
      return sum + precio*it.qty;
    },0);

    alert(`VENTA AUTOMÁTICA PRUEBA\nEmpresa: ${empresa.nombre}\nFiltro: ${filtro} / ${pago}\n\n${detalle}\n\nTotal: $${totalVenta.toLocaleString("es-CO")} COP\nLink: ${linkGen || "genera link primero"}\n\nSTOCKOS unifica 2 B1 +1 B3 en un solo despacho B1, calcula ganancia auto y dispara WA 7AM/2PM`);
  };

  const waMsg = `Hola STOCKOS, soy ${empresa.nombre}. Plan BASE $300k + extras $${(total-BASE).toLocaleString("es-CO")} = $${total.toLocaleString("es-CO")}/mes. Mods: ${mods.join(",")}. Empresa: ${empresa.nombre}. Link config: ${linkGen}. Envio comprobante Bancolombia 912-510747-93 / Nequi 3215981307 / PayPal paypal.me/andreskstllo`;

  return (
    <div style={{fontFamily:'Arial', background:'#F8FAFC', minHeight:'100vh', color:'#0A2640'}}>
      <div style={{maxWidth:1150, margin:'0 auto', padding:20}}>
        <h1 style={{fontSize:30, fontWeight:900, lineHeight:1.05}}>

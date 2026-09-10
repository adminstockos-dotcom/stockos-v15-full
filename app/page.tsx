import { ROLES_V9, CONFIG_V9 } from "../lib/v9-roles.js";

export default function Home() {
  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>STOCKOS V9 - PROCESO MAESTRO</h1>
      <p style={{background:'#d4edda', padding:10, borderRadius:5}}>
        ✅ FASE 0 CREADA: lib/v9-roles.js - Deploy OK
      </p>
      
      <h2>Roles Bloqueados:</h2>
      <ul>
        <li><b>Super Admin:</b> Iván 3044019899 - Control Total Stock OS</li>
        <li><b>Admin Máxima:</b> Carlos - Aprueba pagos</li>
        <li><b>Encargados B1...N:</b> WhatsApp personal por bodega - Solo ve su bodega</li>
        <li><b>Mensajero:</b> Recibe dinero y lleva a bodega</li>
      </ul>

      <h2>Config V9:</h2>
      <p>Escaneo: {CONFIG_V9.escaneo.join(' y ')}</p>
      <p>Publicación: {CONFIG_V9.publicacion.join(', ')}</p>
      <p>Trazabilidad: {CONFIG_V9.trazabilidad_devolucion_dias} días</p>
      <p>{CONFIG_V9.plataforma}</p>

      <p style={{marginTop:20, color:'blue'}}>Vercel va a desplegar esto en 1 min - No se borró nada, solo se agregó</p>
    </div>
  )
}

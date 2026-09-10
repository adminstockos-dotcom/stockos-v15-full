// V9 FASE 1 - BODEGAS B1...N ILIMITADAS - WHATSAPP DIRIGIDO
export let BODEGAS_DB = [
  {
    id: "B1",
    nombre: "Bodega La 8va",
    tipo: "WEB", // WEB, DRIVE, WAFOTOS, FISICA
    encargado: "Pendiente",
    whatsapp_encargado: "3000000000", // WhatsApp personal registrado
    link: "https://...",
    user: "",
    pass: "",
    activa: true,
    saldo_efectivo: 0
  }
];

export function agregarBodega(nueva) {
  BODEGAS_DB.push(nueva);
}

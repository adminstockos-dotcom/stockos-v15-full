// FASE 2 - WHATSAPP DIRIGIDO POR BODEGA V9
export function enviarWhatsAppBodega(bodega, pedido) {
  const mensaje = `*NUEVO PEDIDO ${bodega.id}*%0A` +
  `Bodega: ${bodega.nombre}%0A` +
  `Pedido: ${pedido.id}%0A` +
  `Cliente: ${pedido.cliente}%0A` +
  `Total: $${pedido.total}%0A%0A` +
  `*SOLO LLEGA A ENCARGADO ${bodega.id}*`;

  const link = `https://wa.me/${bodega.whatsapp_encargado}?text=${mensaje}`;
  
  return {
    enviado_a: bodega.encargado,
    whatsapp: bodega.whatsapp_encargado,
    link_whatsapp: link,
    mensaje: mensaje
  };
}

export function entregarDineroMensajero(bodega, monto, mensajero) {
  return {
    bodega: bodega.id,
    mensajero: mensajero,
    monto_recibido: monto,
    nuevo_saldo: bodega.saldo_efectivo + monto,
    fecha: new Date().toISOString()
  };
}

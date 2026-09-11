// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WA_VERIFY_TOKEN || "stockos_v16";
const PHONE_ID = process.env.WA_PHONE_ID || "";
const ACCESS_TOKEN = process.env.WA_ACCESS_TOKEN || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const INVENTARIO_MAESTRO = [
  { id: "p1", nombre: "Tenis Runner X", talla: "38", color: "Negro", stocks: { B1: 5, B2: 3, B3: 0 }, mayor: 112000, detal: 148000 },
  { id: "p2", nombre: "Tenis Runner X", talla: "39", color: "Blanco", stocks: { B1: 2, B2: 0, B3: 4 }, mayor: 112000, detal: 148000 },
  { id: "p3", nombre: "Camiseta Pro", talla: "M", color: "Azul", stocks: { B1: 8, B2: 6, B3: 2 }, mayor: 42000, detal: 55500 },
];

function buscarProducto(texto: string) {
  const t = texto.toLowerCase();
  return INVENTARIO_MAESTRO.filter((p) => t.includes(p.nombre.toLowerCase()) || t.includes(p.id));
}

function generarRespuesta(texto: string): string {
  const t = texto.toLowerCase();
  if (t.includes("stock") || t.includes("inventario") || t.includes("precio") || t.includes("producto")) {
    const encontrados = buscarProducto(texto);
    if (encontrados.length === 0) {
      return "STOCKOS V16 - Inventario Maestro disponible. Pregunta por producto, talla o color. Ej: 'stock Tenis Runner X'";
    }
    let msg = "STOCKOS V16 - Inventario Maestro:\n";
    for (const p of encontrados) {
      const total = Object.values(p.stocks).reduce((a, b) => a + b, 0);
      msg += `${p.nombre} T${p.talla} ${p.color} - Total: ${total} und - Mayor: $${p.mayor} - Detal: $${p.detal}\n`;
      msg += "  B1:" + (p.stocks.B1 || 0) + " B2:" + (p.stocks.B2 || 0) + " B3:" + (p.stocks.B3 || 0) + "\n";
    }
    return msg.trim();
  }
  if (t.includes("hola") || t.includes("buenas") || t.includes("info")) {
    return "Hola! Soy STOCKOS V16. Puedo ayudarte con: stock, precios, productos, pedidos. Escribe 'stock' + nombre del producto.";
  }
  return "STOCKOS V16 - Escribe 'stock' + nombre del producto para ver inventario. Ej: 'stock Tenis Runner X'";
}

async function sendWhatsApp(phone: string, message: string) {
  if (!PHONE_ID || !ACCESS_TOKEN) {
    console.log("[WA] No PHONE_ID or ACCESS_TOKEN configured - message not sent to", phone);
    return;
  }
  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message },
      }),
    });
    const data = await res.json();
    console.log("[WA] Send result:", JSON.stringify(data));
  } catch (err) {
    console.error("[WA] Send error:", err);
  }
}

async function getAIResponse(message: string): Promise<string | null> {
  if (!OPENAI_API_KEY) return null;
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Eres el asistente de STOCKOS V16, un sistema de inventario maestro. Responde brevemente en español sobre stock, precios mayor/detal y productos." },
          { role: "user", content: message },
        ],
        max_tokens: 200,
      }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object) {
      const entries = body.entry || [];
      for (const entry of entries) {
        const changes = entry.changes || [];
        for (const change of changes) {
          const messages = change.value?.messages || [];
          for (const msg of messages) {
            const from = msg.from;
            const text = msg.text?.body || "";
            if (text) {
              let reply = generarRespuesta(text);
              const aiReply = await getAIResponse(text);
              if (aiReply) reply = aiReply;
              await sendWhatsApp(from, reply);
            }
          }
        }
      }
      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (err) {
    console.error("[WA] Webhook error:", err);
    return new NextResponse("ERROR", { status: 500 });
  }
}

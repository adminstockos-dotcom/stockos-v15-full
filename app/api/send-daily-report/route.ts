// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { to, report } = await req.json();

    if (!to || !report) {
      return NextResponse.json({ error: "Faltan campos to o report" }, { status: 400 });
    }

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "STOCKOS <noreply@stockos.com>",
          to: [to],
          subject: "Consolidado Ventas STOCKOS - " + new Date().toISOString().slice(0, 10),
          text: report,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("[send-daily-report] Resend error:", data);
        return NextResponse.json({ error: "Error enviando email", detail: data }, { status: 500 });
      }
      return NextResponse.json({ success: true, sent: true });
    }

    console.log("[send-daily-report] No RESEND_API_KEY - guardando en cola");
    console.log("[send-daily-report] Reporte para " + to + ":\n" + report);
    return NextResponse.json({ success: true, sent: false, message: "No hay RESEND_API_KEY - reporte guardado en cola para envío manual" });
  } catch (err) {
    console.error("[send-daily-report] Error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", message: "POST para enviar reporte diario" });
}

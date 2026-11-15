import { NextResponse } from "next/server";
import { obtenerProductos } from "@/lib/productos";

// GET /api/productos -> { productos: Producto[] }
export async function GET() {
  return NextResponse.json({ productos: obtenerProductos() });
}

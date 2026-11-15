export type Categoria = "Bodys" | "Conjuntos" | "Accesorios";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  tallas: string[];
  /** Precio de venta en USD. null = por confirmar (se muestra "Consultar precio"). */
  precio: number | null;
  /** Foto en public/productos/. Si el archivo no existe se muestra un icono. */
  imagen: string;
}

export const categorias: Categoria[] = ["Bodys", "Conjuntos", "Accesorios"];

const productos: Producto[] = [
  {
    id: "set-5-bodys-manga-corta",
    nombre: "Set de 5 bodys manga corta",
    descripcion: "Set de 5 bodys de manga corta para bebé.",
    categoria: "Conjuntos",
    tallas: ["0-3M", "3-6M"],
    precio: 17.99,
    imagen: "/productos/set-5-bodys-manga-corta.jpg",
  },
  {
    id: "set-5-baberos",
    nombre: "Set de 5 baberos",
    descripcion: "Set de 5 baberos.",
    categoria: "Accesorios",
    tallas: ["Única"],
    precio: 15.99,
    imagen: "/productos/set-5-baberos.jpg",
  },
  {
    id: "body-mi-primera-navidad",
    nombre: "Body navideño “My 1st Christmas”",
    descripcion: "Body navideño “My 1st Christmas”. Disponible en rojo y negro.",
    categoria: "Bodys",
    tallas: ["3-6M"],
    precio: 6.99,
    imagen: "/productos/body-mi-primera-navidad.jpg",
  },
  {
    id: "set-5-piezas-recien-nacido-rayado",
    nombre: "Set de 5 piezas rayado recién nacido",
    descripcion: "Set de 5 piezas con diseño rayado para recién nacido.",
    categoria: "Conjuntos",
    tallas: ["0-3M"],
    precio: null,
    imagen: "/productos/set-5-piezas-recien-nacido-rayado.jpg",
  },
  {
    id: "set-4-estaciones",
    nombre: "Set de bebé 4 estaciones",
    descripcion: "Set de bebé 4 estaciones.",
    categoria: "Conjuntos",
    tallas: ["0-3M"],
    precio: null,
    imagen: "/productos/set-4-estaciones.jpg",
  },
  {
    id: "mameluco-manga-larga",
    nombre: "Mameluco manga larga",
    descripcion: "Mameluco de manga larga para bebé.",
    categoria: "Bodys",
    tallas: ["73", "80"],
    precio: null,
    imagen: "/productos/mameluco-manga-larga.jpg",
  },
  {
    id: "calcetines-20-pares",
    nombre: "20 pares de calcetines multicolor",
    descripcion: "20 pares de calcetines para bebé en colores variados.",
    categoria: "Accesorios",
    tallas: ["Única"],
    precio: null,
    imagen: "/productos/calcetines-20-pares.jpg",
  },
  {
    id: "set-27-lazos-diademas",
    nombre: "Set de 27 piezas de moños y diademas",
    descripcion: "Set de 27 piezas de moños y diademas para el cabello.",
    categoria: "Accesorios",
    tallas: ["Única"],
    precio: null,
    imagen: "/productos/set-27-lazos-diademas.jpg",
  },
];

export function obtenerProductos(): Producto[] {
  return productos;
}

export function obtenerProducto(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}

export function formatearPrecio(precio: number | null): string {
  return precio === null ? "Consultar precio" : `$${precio.toFixed(2)}`;
}

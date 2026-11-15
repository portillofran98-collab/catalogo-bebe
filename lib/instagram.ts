// Debe referenciarse literalmente para que Next la incluya en el código del navegador.
export const INSTAGRAM_USER = process.env.NEXT_PUBLIC_INSTAGRAM_USER ?? "";

export const instagramPerfil = INSTAGRAM_USER
  ? `https://instagram.com/${INSTAGRAM_USER}`
  : "https://instagram.com";

export const instagramMensaje = INSTAGRAM_USER
  ? `https://ig.me/m/${INSTAGRAM_USER}`
  : "https://instagram.com";

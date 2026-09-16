export interface Client {
  name: string
  href: string
  logo: string
  logoAlt: string
  /** Ajuste óptico: los dos archivos tienen proporciones muy distintas. */
  logoClass: string
  wordmark?: string
}

/**
 * Clientes publicables y enlaces a sus productos en producción.
 *
 * Los logos se sirven desde los sitios de cada producto para mantener siempre
 * la versión oficial. Si alguno cambia de dominio, conviene copiar el activo a
 * `public/clients/` y actualizar sólo este archivo.
 */
export const CLIENTS: Client[] = [
  {
    name: "Apoyo Escolar RV",
    href: "https://app.apoyoescolarrv.com/",
    logo: "https://app.apoyoescolarrv.com/logo.svg",
    logoAlt: "Apoyo Escolar RV",
    logoClass: "h-14 w-auto max-w-[220px] sm:h-16",
  },
  {
    name: "Lu Apuntes",
    href: "https://luapuntes.com/",
    logo: "https://luapuntes.com/logo-mark.webp",
    logoAlt: "",
    logoClass: "h-20 w-auto sm:h-24",
    wordmark: "Lu Apuntes",
  },
]

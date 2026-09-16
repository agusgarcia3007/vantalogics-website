export interface Client {
  name: string
  caseSlug: string
  logo: string
  logoAlt: string
  /** Ajuste óptico: los archivos tienen proporciones muy distintas. */
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
    caseSlug: "apoyo-escolar-rv",
    logo: "https://app.apoyoescolarrv.com/logo.svg",
    logoAlt: "Apoyo Escolar RV",
    logoClass: "h-14 w-auto max-w-[220px] sm:h-16",
  },
  {
    name: "Lu Apuntes",
    caseSlug: "lu-apuntes",
    logo: "https://luapuntes.com/logo-mark.webp",
    logoAlt: "",
    logoClass: "h-20 w-auto sm:h-24",
    wordmark: "Lu Apuntes",
  },
  {
    name: "Academia Dr. La Rosa",
    caseSlug: "academia-dr-la-rosa",
    logo: "https://cdn.uselearnbase.com/logos/cc8de334-4fbe-4062-920a-e07a378f4b82/1768848667451.png",
    logoAlt: "",
    logoClass: "h-16 w-auto sm:h-18",
    wordmark: "Academia Dr. La Rosa",
  },
  {
    name: "Academia SIED",
    caseSlug: "academia-sied",
    logo: "https://cdn.uselearnbase.com/logos/99f544ec-d00b-4d35-ae04-6d19ad58f54a/1776305323141.webp",
    logoAlt: "Academia SIED",
    logoClass: "h-20 w-auto max-w-[200px] sm:h-24",
  },
]

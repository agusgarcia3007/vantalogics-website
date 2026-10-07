export interface Client {
  name: string
  caseSlug: string
  logo: string
  logoAlt: string
  logoClass: string
  wordmark?: string
}

export const CLIENTS: Client[] = [
  {
    name: "Apoyo Escolar RV",
    caseSlug: "apoyo-escolar-rv",
    logo: "/clients/apoyo-escolar-rv.webp",
    logoAlt: "Apoyo Escolar RV",
    logoClass: "h-14 w-auto max-w-[220px] sm:h-16",
  },
  {
    name: "Lu Apuntes",
    caseSlug: "lu-apuntes",
    logo: "/clients/lu-apuntes.webp",
    logoAlt: "",
    logoClass: "h-20 w-auto sm:h-24",
    wordmark: "Lu Apuntes",
  },
  {
    name: "Academia Dr. La Rosa",
    caseSlug: "academia-dr-la-rosa",
    logo: "/clients/academia-dr-la-rosa.png",
    logoAlt: "",
    logoClass: "h-16 w-auto sm:h-18",
    wordmark: "Academia Dr. La Rosa",
  },
  {
    name: "Academia SIED",
    caseSlug: "academia-sied",
    logo: "/clients/academia-sied.webp",
    logoAlt: "Academia SIED",
    logoClass: "h-20 w-auto max-w-[200px] sm:h-24",
  },
]

export function findClient(caseSlug: string): Client | undefined {
  return CLIENTS.find((client) => client.caseSlug === caseSlug)
}

/**
 * El sitio es estático: lo único que justifica código de servidor es el
 * redirect de www al apex. `www` es un custom domain del mismo Worker, así que
 * sin esto el sitio se serviría duplicado en dos hostnames y Google elegiría
 * el canónico por su cuenta.
 *
 * Corre antes que los assets (`run_worker_first`), porque si no la request a
 * `www.vantalogics.com/` matchearía `index.html` y nunca llegaría acá.
 */
interface Env {
  // El binding se tipa a mano en vez de usar `Fetcher`: los tipos del runtime
  // de Workers no están cargados (el tsconfig es el de Astro, con lib DOM) y
  // meterlos acá choca con `Request`/`Response` del DOM en el resto del sitio.
  ASSETS: { fetch(request: Request): Promise<Response> }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.hostname === "www.vantalogics.com") {
      url.hostname = "vantalogics.com"
      // A https directo: si no, `http://www` encadena dos saltos (el segundo lo
      // haría el upgrade a HTTPS ya sobre el apex).
      url.protocol = "https:"
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}

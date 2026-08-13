/**
 * En desarrollo, React se monta fuera de una isla de Astro, así que nadie
 * inyecta el preámbulo de React Refresh y el plugin aborta con "can't detect
 * preamble". Lo instalamos nosotros. En producción no existe Fast Refresh y la
 * función entera se cae del bundle.
 *
 * Lo usan los dos puntos de montaje del agente —el panel flotante y el chat
 * embebido de la landing—, que son los dos lugares donde React entra a mano.
 */
export async function installRefreshPreamble(): Promise<void> {
  if (!import.meta.env.DEV) return

  // El especificador va en una variable a propósito: es un módulo virtual de
  // Vite que sólo existe en desarrollo y TypeScript no puede resolverlo.
  const specifier = "/@react-refresh"
  const runtime = (await import(/* @vite-ignore */ specifier)) as {
    injectIntoGlobalHook(window: Window): void
  }
  runtime.injectIntoGlobalHook(window)
  // @ts-expect-error — globales que espera el plugin en desarrollo
  window.$RefreshReg$ = () => {}
  // @ts-expect-error — idem
  window.$RefreshSig$ = () => (type: unknown) => type
  // @ts-expect-error — idem
  window.__vite_plugin_react_preamble_installed__ = true
}

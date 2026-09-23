export async function installRefreshPreamble(): Promise<void> {
  if (!import.meta.env.DEV) return

  const specifier = "/@react-refresh"
  const runtime = (await import(specifier)) as {
    injectIntoGlobalHook(window: Window): void
  }
  runtime.injectIntoGlobalHook(window)
  Object.assign(window, {
    $RefreshReg$: () => {},
    $RefreshSig$: () => (type: unknown) => type,
    __vite_plugin_react_preamble_installed__: true,
  })
}

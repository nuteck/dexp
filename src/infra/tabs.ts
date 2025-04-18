export const getCA = async (): Promise<string | null | undefined> => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})
  const url = new URL(tab.url as string)
  const hostname = url.hostname

  if (hostname === "pump.fun") {
    const ca = url.pathname.split("/")[2]
    return ca
  }

  if (hostname === "swap.pump.fun") {
    const params = new URLSearchParams(url.searchParams)
    const ca = params.get("output")
    return ca
  }
}


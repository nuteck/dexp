export const getOrders = async (ca: string | undefined | null): Promise<object[] | undefined> => {
  const url: string = 'https://api.dexscreener.com'
  if (ca) {
    const endpoint = `${url}/orders/v1/solana/${ca}`
    const req = await fetch(endpoint, {
      headers: {
        "content-type": 'application/json'
      }
    }) 
    const res = await req.json()
    return res
  }

  console.error('Error: CA argument invalid')
  return undefined
}



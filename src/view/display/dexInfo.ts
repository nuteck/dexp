import { h, type State, type Order } from '../../index'
import { text } from 'hyperapp'

export const dexInfo = (s: State) => {
  const currentCa =  h('p', {class: 'mb-1'}, text(s.ca))

  const fallback =  h('p', {class: 'font-bold'}, text('dex not paid'))

  console.log(s.orders)

  const orderList = (orders: Order[] | undefined) => {
    const lineItems = []

    if (orders === undefined) {
      return fallback
    }

    for (const order of orders) {
      const payment = (type: string | undefined, status: string, date: string) => {
        if (type) {
          return h('li', {class: 'border-l-2 border-orange-400 pl-1 my-1 py-0'}, [
            text(`${type}: ${status} - ${date}`)
          ])
        } 
        // fallback if dexscreener API is changed
        return  h('span', {}, [])
      }

      const date = new Date(order.paymentTimestamp).toLocaleString()

      let typeDisplayed = undefined 

      switch (order.type) {
       case 'tokenProfile': 
         typeDisplayed = 'token profile'
         break
       case 'communityTakeover': 
         typeDisplayed = 'community takeover'
         break
       case 'cancelled': 
         typeDisplayed = 'cancelled'
         break
       case 'on-hold': 
         typeDisplayed = 'on hold'
         break
       case 'rejected': 
         typeDisplayed = 'rejected'
         break
       default: 
         break
      } 

      const lineItem = payment(typeDisplayed, order.status, date)

      lineItems.push(lineItem)
    }

    if (lineItems.length > 0) {
      return h('ul', {},  lineItems)
    }

    return fallback
  }

  return s.ca && h('div', {}, [
    currentCa,
    orderList(s.orders)
  ])
    
}

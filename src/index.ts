import './index.css';
import {app, h as ha, text} from 'hyperapp';
import { getCA } from './infra/tabs'; 
import { getOrders } from './infra/dexscreener'; 
import { warning } from './view/display/warning';
import { loading } from './view/display/loading';
import { dexInfo } from './view/display/dexInfo';

const VERSION = '1.0.0'

export interface State {
  ca?: string,
  orders?: Order[]
}

export interface Order {
  status: string,
  type: string,
  paymentTimestamp: number
}

export const h = ha<State>

const placeCA = async (dispatch) => {
  const ca = await getCA()!;
  requestAnimationFrame(() => dispatch((_state: State) => {
    return [
      {ca: ca}, 
      [placeDex, ca]
    ]
  }))
}

// call in other effects
const placeDex = async (dispatch, ca: string) => {
  let orders = await getOrders(ca)
  orders = orders?.map(o => o as Order)
  requestAnimationFrame(() => dispatch((state: State) => {
    return {
      ...state,
      orders: orders
    }
  }))
}

const initState: State = {}

app({
  init: [initState, placeCA],
  view: s => h('main', 
    {class: "border border-neutral-100 bg-nuetral-50 p-2 w-50 h-auto break-words"}, 
    [
      h("div", {class: "flex justify-between align-middle pb-2"}, [
        h("h1", {class: "text-sm font-bold tracking-wide text-orange-600"}, text("dexp")),
        h("span", {class: "text-xs"}, text(`version: ${VERSION}`)),
      ]),
      !s.ca && warning(),
      s.ca && !s.orders && loading(),
      s.ca && s.orders && dexInfo(s)
    ]
  ),
  node: document.querySelector('#root')!
})


import { h } from '../../index'
import { text } from 'hyperapp'

export const loading = () => {
  return h('div', {class: 'animate-pulse'}, [
    h('p', {}, text("fetching data from DexScreener"))
  ])
}


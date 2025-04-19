import { h } from '../../index'
import { text } from 'hyperapp'

export const warning = () => {
  return h('div', {class: ''}, [
    h('p', {}, text("open this tool on pump.fun's coin or swap page to see if dex is paid"))
  ])
}

import { tuple } from '../utils'
import { PropType } from 'vue'

export const placement = tuple('top', 'right', 'left', 'bottom')
export type Placement = typeof placement[number]

export const props = {
  modelValue: Boolean,
  overlay: {
    type: Boolean,
    default: true
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'right'
  },
  round: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'body'
  },
  disableOverlayClick: Boolean,
  keyboard: {
    type: Boolean,
    default: true
  }
}

import { isMac, assign } from '../format'
import { useEventListener } from '@fect-ui/vue-hooks'
import type { UseKeyboardHandler, KeyboardOptions } from './interface'

export enum KeyCode {
  Unknown = 0,
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Ctrl = 17,
  Alt = 18,
  PauseBreak = 19,
  CapsLock = 20,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  LeftArrow = 37,
  UpArrow = 38,
  RightArrow = 39,
  DownArrow = 40,
  Insert = 45,
  Delete = 46,
  KEY_0 = 48,
  KEY_1 = 49,
  KEY_2 = 50,
  KEY_3 = 51,
  KEY_4 = 52,
  KEY_5 = 53,
  KEY_6 = 54,
  KEY_7 = 55,
  KEY_8 = 56,
  KEY_9 = 57,
  KEY_A = 65,
  KEY_B = 66,
  KEY_C = 67,
  KEY_D = 68,
  KEY_E = 69,
  KEY_F = 70,
  KEY_G = 71,
  KEY_H = 72,
  KEY_I = 73,
  KEY_J = 74,
  KEY_K = 75,
  KEY_L = 76,
  KEY_M = 77,
  KEY_N = 78,
  KEY_O = 79,
  KEY_P = 80,
  KEY_Q = 81,
  KEY_R = 82,
  KEY_S = 83,
  KEY_T = 84,
  KEY_U = 85,
  KEY_V = 86,
  KEY_W = 87,
  KEY_X = 88,
  KEY_Y = 89,
  KEY_Z = 90,
  Meta = 91,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NumLock = 144,
  ScrollLock = 145,
  Equal = 187,
  Minus = 189,
  Backquote = 192,
  Backslash = 220
}

export enum KeyMod {
  CtrlCmd = (1 << 11) >>> 0,
  Shift = (1 << 10) >>> 0,
  Alt = (1 << 9) >>> 0,
  WinCtrl = (1 << 8) >>> 0
}

const defaultOptions: KeyboardOptions = {
  target: document,
  stopPropagation: true,
  preventDefault: true,
  capture: false,
  event: 'keydown'
}

const getActiveModMap = (bindings: number[]) => {
  const modBindings = bindings.filter((item: number) => !!KeyMod[item])
  const activeModMap: Record<keyof typeof KeyMod, boolean> = {
    CtrlCmd: false,
    Shift: false,
    Alt: false,
    WinCtrl: false
  }
  modBindings.forEach((code) => {
    const modKey = KeyMod[code] as keyof typeof KeyMod
    activeModMap[modKey] = true
  })

  return activeModMap
}

const getCtrlKeysByPlatform = (): Record<string, 'metaKey' | 'ctrlKey'> => {
  return {
    CtrlCmd: isMac() ? 'metaKey' : 'ctrlKey',
    WinCtrl: isMac() ? 'ctrlKey' : 'metaKey'
  }
}

export const useKeyboard = (
  handler: UseKeyboardHandler,
  keyBindings: Array<number> | number,
  options?: KeyboardOptions
): void => {
  const { stopPropagation, preventDefault, target, event, capture } = assign(defaultOptions, options)
  const bindings = Array.isArray(keyBindings) ? keyBindings : [keyBindings]
  const activeModMap = getActiveModMap(bindings)
  // eslint-disable-next-line prefer-destructuring
  const keyCode = bindings.filter((item: number) => !KeyMod[item])[0]

  const { CtrlCmd, WinCtrl } = getCtrlKeysByPlatform()
  const eventHandler = (event: KeyboardEvent) => {
    if (activeModMap.Shift && !event.shiftKey) return
    if (activeModMap.Alt && !event.altKey) return
    if (activeModMap.CtrlCmd && !event[CtrlCmd]) return
    if (activeModMap.WinCtrl && !event[WinCtrl]) return
    if (keyCode && event.keyCode !== keyCode) return
    if (stopPropagation) {
      event.stopPropagation()
    }
    if (preventDefault) {
      event.preventDefault()
    }
    handler && handler(event)
  }

  useEventListener(event, (e) => eventHandler(e as KeyboardEvent), { target, capture })
}

import { ipcCHANNEL } from "./Constants"

export const ping = (component: string) => {
  window.main.sendMessage(ipcCHANNEL, [component])
}
import { ipcCHANNEL } from './Constants'

export const ping = (msg?: string): void => {
  msg = msg ?? ''
  window.main.sendMessage(ipcCHANNEL, [msg])
  writelog(msg, 'PING CALLED!')
}

export const writelog = (...args: any[]): void => {
  const isProduction: Boolean = false
  if (!isProduction) {
    console.log(...args)
  }
}

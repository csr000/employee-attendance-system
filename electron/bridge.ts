import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (channel: string, message: Array<string | unknown>) => {
    ipcRenderer.send(channel, message)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },

  once: (channel: string, callback: Function) => {
    ipcRenderer.once(channel, (_, data) => callback(data))
  },
  removeListener: (channel: string, callback: Function) => {
    ipcRenderer.removeListener(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('main', api)

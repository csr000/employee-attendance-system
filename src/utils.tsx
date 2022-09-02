export const handlePing = (component: string) => {
  window.main.sendMessage('ipc-example', [component])
}
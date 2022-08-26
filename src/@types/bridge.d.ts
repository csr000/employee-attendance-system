import { api } from '../../electron/bridge'

declare global {
  // eslint-disable-next-line
  interface Window {
    main: typeof api
  }
}

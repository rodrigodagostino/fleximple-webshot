import { browser } from '$app/environment'
import { get, writable } from 'svelte/store'

export interface ISettings {
  targetProtocol: 'http' | 'https'
  targetUrl: string
  fileWidth: number
  fileHeight: number
  fullPage: boolean
  fileType: 'jpeg' | 'png' | 'webp'
  fileQuality: number
  captureDelay: number
}

export interface IStore {
  status: 'idle' | 'generating' | 'success' | 'error'
  settings: ISettings
  fileName: string | null
}

const defaultStore: IStore = {
  status: 'idle',
  settings: {
    targetProtocol: 'http',
    targetUrl: '',
    fileWidth: 1200,
    fileHeight: 1600,
    fullPage: false,
    fileType: 'jpeg',
    fileQuality: 80,
    captureDelay: 0,
  },
  fileName: null,
}

const setLocalStorage = () => {
  const $store = get(store)
  if (browser) localStorage.setItem('fleximpleWebshot', JSON.stringify($store))
}

export const store = writable<IStore>(defaultStore, (set) => {
  if (browser) {
    const hasSettings =
      localStorage.getItem('fleximpleWebshot')?.charAt(0) === '{' &&
      !(localStorage.getItem('fleximpleWebshot')?.charAt(1) === '}')
    if (!hasSettings) setLocalStorage()
    set(hasSettings ? JSON.parse(localStorage.getItem('fleximpleWebshot')) : defaultStore)
  }
})

export const setStatus = (status: IStore['status']) => {
  store.update((currData) => ({
    ...currData,
    status,
  }))
}

export const setSetting = (setting: keyof ISettings, value: string | boolean) => {
  store.update((currData) => ({
    ...currData,
    settings: {
      ...currData.settings,
      [setting]: value,
    },
  }))
  setLocalStorage()
}

export const setFileName = (fileName: IStore['fileName']) => {
  store.update((currData) => {
    return {
      ...currData,
      fileName,
    }
  })
}

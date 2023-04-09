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
  screenshot: string | null
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
  screenshot: null,
}

const setLocalStorage = () => {
  const $store = get(store)
  localStorage.setItem('fleximpleWebshot', JSON.stringify($store.settings))
}

export const store = writable<IStore>(defaultStore, (set) => {
  if (browser) {
    const settings = localStorage.getItem('fleximpleWebshot')
    const hasSettings = settings && settings.charAt(1) !== '}'
    hasSettings && set({ ...defaultStore, settings: JSON.parse(settings) })
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

export const setScreenshot = (screenshot: IStore['screenshot']) => {
  store.update((currData) => {
    return {
      ...currData,
      screenshot,
    }
  })
}

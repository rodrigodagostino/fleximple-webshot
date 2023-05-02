import { writable } from 'svelte/store'

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
  status: 'idle' | 'generating' | 'success' | 'error' | 'failure' | 'redirect'
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

export const store = writable<IStore>(defaultStore)

export const setStatus = (status: IStore['status']) => {
  store.update((currData) => ({
    ...currData,
    status,
  }))
}

export const setSettings = (settings: IStore['settings']) => {
  store.update((currData) => ({
    ...currData,
    settings,
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
}

export const setScreenshot = (screenshot: IStore['screenshot']) => {
  store.update((currData) => {
    return {
      ...currData,
      screenshot,
    }
  })
}

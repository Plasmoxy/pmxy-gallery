import create from 'zustand'
import { combine, devtools } from 'zustand/middleware'
import produce from 'immer'

export type StoreState = {
  count: number
  lightbox: {
    images: any[]
    idx: number
    open: boolean
  },
  errorModals: string[],
}

export const defaultStore: StoreState = {
  count: 0,
  lightbox: {
    images: [],
    idx: 0,
    open: false,
  },
  errorModals: []
}

export const useStore = create(combine(defaultStore, (set, get, api) => ({
  set, get, api,
  update: (recipe: (state: StoreState) => void) => set(ss => produce(ss, recipe)),
})))
/* eslint-disable no-unused-vars */
import {create} from 'zustand'

type Store = {
  viewPort: string
  setViewPort: (newViewPort: string) => void
  rate: number
  setRate: (newRate: number) => void
}

const useStore = create<Store>()((set) => ({
  viewPort: 'desktop',
  setViewPort: (newViewPort) => set({viewPort: newViewPort}),
  rate: 0,
  setRate: (newRate) => set({rate: newRate}),
}))

export default useStore

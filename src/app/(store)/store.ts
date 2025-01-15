/* eslint-disable no-unused-vars */
import {create} from 'zustand'

type Store = {
  accessToken: string
  setAccessToken: (accessTokenNew: string) => void
  showCountry: boolean
  setShowCountry: (showCountry: boolean) => void
}

const useStore = create<Store>()((set) => ({
  accessToken: '',
  setAccessToken: (accessTokenNew) => set({accessToken: accessTokenNew}),
  showCountry: false,
  setShowCountry: (showCountry) => set({showCountry}),
}))

export default useStore

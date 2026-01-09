/* eslint-disable no-unused-vars */
import { create } from 'zustand'

type Store = {
  showCountry: boolean
  setShowCountry: (showCountry: boolean) => void
  viewPort: string
  setViewPort: (newViewPort: string) => void
  consultingPhoneNumber: string
  setConsultingPhoneNumber: (newPhoneNumber: string) => void
}

const useStore = create<Store>()((set) => ({
  showCountry: false,
  setShowCountry: (showCountry) => set({showCountry}),
  viewPort: 'desktop',
  setViewPort: (newViewPort) => set({ viewPort: newViewPort }),
  consultingPhoneNumber: '',
  setConsultingPhoneNumber: (newPhoneNumber) => set({ consultingPhoneNumber: newPhoneNumber }),
}))

export default useStore

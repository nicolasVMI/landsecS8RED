import { create } from "zustand"
import { io } from "socket.io-client"
interface InitialState {
  isOculus: boolean
  socket: any
  worldInfo: any
  setWorldInfo: (v: any) => void
  currentTour: number
  setCurrentTour: (v: number) => void
  isOnline: boolean | null
  setIsOnline: (v: boolean | null) => void
  sessionStarted: boolean
  setSessionStarted: (v: boolean) => void
  centered: boolean
  setCentered: (v: boolean) => void
  modalOpen: boolean
  setModalOpen: (v: boolean) => void
  AROpen: boolean
  setAROpen: (v: boolean) => void
  ARLabels: string[]
  toggleARLabels: (v: string) => void
  setARLabels: (v : string[]) => void
  ARTourOpen: boolean
  setARTourOpen: (v: boolean) => void
}

export const useStore = create<InitialState>()((set, get) => ({
  isOculus: /(OculusBrowser)/i.test(window.navigator.userAgent),
  //@ts-ignore
  socket: io("https://api-gateway.vmiservers.com/socket"),
  // socket: null,
  worldInfo: null,
  setWorldInfo: v => set({ worldInfo: v }),
  currentTour: 0,
  setCurrentTour: v => set({ currentTour: v }),
  isOnline: null,
  setIsOnline: v => set({ isOnline: v }),
  sessionStarted: false,
  setSessionStarted: v => set({ sessionStarted: v }),
  centered: false,
  setCentered: v => set({ centered: v }),
  modalOpen: false,
  setModalOpen: v => set({ modalOpen: v }),
  AROpen: false,
  setAROpen: v => set({ AROpen: v }),
  ARLabels: ["sites"],
  toggleARLabels: v => set( state => ({
    ARLabels: state.ARLabels.includes(v) ?
      state.ARLabels.filter(lbl => lbl !== v) :
      [...state.ARLabels, v]
  })),
  setARLabels: v => set({ARLabels: v}),
  ARTourOpen: false,
  setARTourOpen: v => set({ ARTourOpen: v }),
}))

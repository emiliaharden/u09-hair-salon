import { create } from 'zustand'

interface Service {
    id: string
    name: string
    duration: number
    price: number
}

interface ServiceStore {
    services: Service[]
    setServices: (services: Service[]) => void
    clearServices: () => void
}

export const useServiceStore = create<ServiceStore>((set) => ({
    services: [],
    setServices: (services) => set({ services }),
    clearServices: () => set({ services: [] }),
}))

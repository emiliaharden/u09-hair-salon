import { create } from 'zustand'

export interface Service {
    _id: string
    name: string
    duration: number
    price: number
}

interface ServiceStore {
    services: Service[]
    setServices: (services: Service[]) => void
    updateService: (updatedService: Service) => void
    clearServices: () => void
}

export const useServiceStore = create<ServiceStore>((set) => ({
    services: [],
    setServices: (services) => set({ services }),

    // Lägg till updateService för att uppdatera en specifik tjänst
    updateService: (updatedService) =>
        set((state) => ({
            services: state.services.map((service) =>
                service._id === updatedService._id ? updatedService : service
            ),
        })),

    clearServices: () => set({ services: [] }),
}))

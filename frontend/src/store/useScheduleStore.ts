import { Schedule } from '@/interfaces/Schedule'
import { create } from 'zustand'

interface ScheduleStore {
    schedules: Schedule[]
    setSchedules: (schedules: Schedule[]) => void
    updateSchedule: (updatedSchedule: Schedule) => void
    clearSchedules: () => void
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
    schedules: [],
    setSchedules: (schedules) => set({ schedules }),

    // Lägg till updateSchedule för att uppdatera ett specifikt schema
    updateSchedule: (updatedSchedule) =>
        set((state) => ({
            schedules: state.schedules.map((schedule) =>
                schedule._id === updatedSchedule._id ? updatedSchedule : schedule
            ),
        })),

    clearSchedules: () => set({ schedules: [] }),
}))

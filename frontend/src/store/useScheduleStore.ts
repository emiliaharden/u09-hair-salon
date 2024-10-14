import { Schedule } from '@/interfaces/Schedule'
import { create } from 'zustand'

interface ScheduleStore {
    schedules: Schedule[]
    setSchedules: (schedules: Schedule[]) => void
    clearSchedules: () => void
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
    schedules: [],
    setSchedules: (schedules) => set({ schedules }),
    clearSchedules: () => set({ schedules: [] }),
}))

import { create } from "zustand";
import { DateTime } from "luxon";

interface DateNavigatorState {
  selectedDate: DateTime;
  setSelectedDate: (date: DateTime) => void;
  nextDay: () => void;
  prevDay: () => void;
}

export const useDateStore = create<DateNavigatorState>((set) => ({
  selectedDate: DateTime.local(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  nextDay: () =>
    set((state) => ({ selectedDate: state.selectedDate.plus({ days: 1 }) })),
  prevDay: () =>
    set((state) => ({ selectedDate: state.selectedDate.minus({ days: 1 }) })),
}));

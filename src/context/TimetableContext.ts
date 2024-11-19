import { createContext } from 'react';

type TimetableContext = {
  timetableId: string | null;
  setTimetableId: (timetableId: string | null) => void;
};

export const TimetableContext = createContext<TimetableContext | null>(null);

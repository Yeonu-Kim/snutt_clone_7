import { createContext } from 'react';

type TimetableContext = {
  timetableId: string | undefined;
  setTimetableId: (timetableId: string | undefined) => void;
};

export const TimetableContext = createContext<TimetableContext | null>(null);

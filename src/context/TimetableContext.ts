import { createContext } from 'react';

type TimetableContext = {
  timetableId: string | null;
  setTimetableId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TimetableContext = createContext<TimetableContext | null>(null)
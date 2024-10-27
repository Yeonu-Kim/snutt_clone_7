import type { Lecture } from './lecture';

export type TimeTable = {
  _id: string;
  user_id: string;
  year: number;
  semester: 1 | 2 | 3 | 4;
  lecture_list: Lecture[];
  title: string;
  updated_at: string;
};

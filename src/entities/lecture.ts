import type { Day } from './time';

export type Lecture = {
  _id: string;
  academic_year?: string;
  category?: string;
  class_time_json: ClassTime[];
  classification?: string;
  credit: number;
  department?: string;
  instructor: string;
  lecture_number: string;
  quota: number;
  remark: string;
  course_number?: string;
  course_title: string;
  colorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  lecture_id?: string;
};
type ClassTime = {
  day: Day;
  place: string;
  startMinute: string;
  endMinute: string;
};

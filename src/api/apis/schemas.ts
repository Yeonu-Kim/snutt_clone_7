import type { DateTime } from './types';

// Request
export type LocalLoginRequest = {
  id: string;
  password: string;
};

export type TimeTableTitleRequest = {
  title: string;
};

export type TimeTableRequest = {
  year: number;
  semester: number;
  title: string;
};

export type CustomLectureRequest = {
  course_title: string;
  instructor: string;
  credit: number;
  class_time_json: ClassTimeResponse[];
  remark: string;
  colorIndex: number;
  is_forced: boolean;
};

// Params
export type TimeTableIdParams = {
  timetableId: string;
};

export type ChangeNicknameRequest = {
  nickname?: string;
};

export type DeleteLecutreParams = {
  timetableId: string;
  lectureId: string;
};

// Response
export type LocalLoginResponse = {
  user_id: string;
  token: string;
  message: string;
};

type NicknameResponse = {
  nickname: string;
  tag: string;
};

export type UserResponse = {
  id: string;
  isAdmin: boolean;
  regDate: DateTime;
  notificationCheckedAt: DateTime;
  email?: string;
  local_id: string;
  fbName?: string;
  nickname: NicknameResponse;
};

export type TimeTableResponse = {
  _id: string;
  user_id: string;
  year: number;
  semester: 1 | 2 | 3 | 4;
  lecture_list: LectureResponse[];
  title: string;
  updated_at: DateTime;
};

export type TimeTableBriefResponse = {
  _id: string;
  year: number;
  semester: 1 | 2 | 3 | 4;
  title: string;
  isPrimary: boolean;
  updated_at: DateTime;
  total_credit: number;
};

export type CourseBookResponse = {
  year: number;
  semester: '1' | '2' | '3' | '4';
  updated_at: string;
};

export type LectureResponse = {
  _id: string;
  academic_year?: string;
  category?: string;
  class_time_json: ClassTimeResponse[];
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

type ClassTimeResponse = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  place: string;
  startMinute: number;
  endMinute: number;
  start_time: string;
  end_time: string;
};

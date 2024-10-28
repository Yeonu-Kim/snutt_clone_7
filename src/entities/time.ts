export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const DAY_LABEL_MAP = {
  0: '월',
  1: '화',
  2: '수',
  3: '목',
  4: '금',
  5: '토',
  6: '일',
};
export const dayList: Day[] = [0, 1, 2, 3, 4, 5, 6];
export const hourList: Hour24[] = Array.from(
  { length: 14 },
  (_, i) => (9 + i) as Hour24,
);
export type Hour24 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

export type Minute = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55;

export type HourMinute = { hour: Hour24; minute: Minute };

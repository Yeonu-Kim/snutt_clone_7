export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const dayList: Day[] = [0, 1, 2, 3, 4, 5, 6];
export const dayMap: Record<string, Day> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};
export const hourList: Hour24[] = Array.from(
  { length: 14 },
  (_, i) => (9 + i) as Hour24,
);
type Hour24 =
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
export const minToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

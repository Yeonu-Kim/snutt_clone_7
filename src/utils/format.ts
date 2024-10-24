export const formatSemester = (semester: number) => {
  switch (semester) {
    case 1:
      return '1학기';
    case 2:
      return '여름학기';
    case 3:
      return '2학기';
    case 4:
      return '겨울학기';
    default:
      return '1학기';
  }
};

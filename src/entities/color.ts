export const colorList = (colorIndex: number) => {
  switch (colorIndex) {
    case 0:
      return 'bg-orange';
    case 1:
      return 'bg-red';
    case 2:
      return 'bg-blue';
    case 3:
      return 'bg-lime';
    case 4:
      return 'bg-green';
    case 5:
      return 'bg-mint';
    case 6:
      return 'bg-cusPurple';
    case 7:
      return 'bg-cusPink';
    case 8:
      return 'bg-cusYellow';
    default:
      return 'bg-orange';
  }
};

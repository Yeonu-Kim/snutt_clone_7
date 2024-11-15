export const storageKey = {
  colorScheme: 'colorScheme',
};

export const impleColorSchemeRepository = () => {
  return {
    getStorageColorScheme: () => {
      return localStorage.getItem(storageKey.colorScheme);
    },
    saveStorageColorScheme: (colorScheme: string) => {
      localStorage.setItem(storageKey.colorScheme, colorScheme);
    },
    clearStorageColorScheme: () => {
      localStorage.removeItem(storageKey.colorScheme);
    },
  };
};

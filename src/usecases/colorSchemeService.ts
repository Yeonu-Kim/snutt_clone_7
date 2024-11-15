type colorSchemeRepository = {
  getStorageColorScheme: () => string | null;
  saveStorageColorScheme: (id: string) => void;
  clearStorageColorScheme: () => void;
};

export type ColorSchemeService = {
  storeColorScheme(_: { scheme: string | null }): void;
};

export const getColorSchemeService = ({
  colorSchemeRepository,
}: {
  colorSchemeRepository: colorSchemeRepository;
}): ColorSchemeService => ({
  storeColorScheme: ({ scheme }: { scheme: string | null }) => {
    if (scheme !== null) {
      colorSchemeRepository.saveStorageColorScheme(scheme);
    } else {
      colorSchemeRepository.clearStorageColorScheme();
    }
  },
});

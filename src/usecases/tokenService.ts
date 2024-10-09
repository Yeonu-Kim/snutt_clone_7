type TokenService = {
  getToken(): string | null;
  saveToken(token: string): void;
  clearToken(): void;
};

type TokenRepository = {
  getToken: () => string | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
};

export const getTokenService = ({
  temporaryStorageRepository,
}: {
  temporaryStorageRepository: TokenRepository;
}): TokenService => {
  return {
    getToken: () => temporaryStorageRepository.getToken(),
    saveToken: (token) => {
      temporaryStorageRepository.saveToken(token);
    },
    clearToken: () => {
      temporaryStorageRepository.clearToken();
    },
  };
};

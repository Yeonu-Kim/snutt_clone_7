export type RepositoryResponse<T> = T extends undefined
  ? Promise<{ type: 'success' }>
  : Promise<{ type: 'success'; data: T } | { type: 'error'; errcode: number }>;

export type UsecaseResponse<T> = T extends undefined
  ? Promise<{ type: 'success' }>
  : Promise<{ type: 'success'; data: T } | { type: 'error'; message: string }>;

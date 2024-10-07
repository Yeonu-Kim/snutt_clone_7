import type { Context } from 'react';
import { useContext } from 'react';

// context 타입 체크 및 null 값 방지를 위해 사용
export const useGaurdContext = <T extends Record<string, unknown>>(
  context: Context<T | null>,
): T => {
  const contextValue = useContext(context);
  if (contextValue === null)
    throw new Error(
      `컨텍스트 값이 존재하지 않습니다: ${context.displayName ?? ''}`,
    );
  return contextValue;
};

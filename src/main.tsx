import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { EnvContext } from './context/EnvContext';
const root = document.getElementById('root');

if (root === null) throw new Error('Root element not found');

const startApp = () => {
  // .env를 추가하면 lint가 터져서 일단 하드코딩해서 넣음.
  // 추후 허락 받고 rule 추가하기
  const ENV = {
    API_BASE_URL: 'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app',
  };

  createRoot(root).render(
    <StrictMode>
      <EnvContext.Provider value={ENV}>
        <App />
      </EnvContext.Provider>
    </StrictMode>,
  );
};

startApp();

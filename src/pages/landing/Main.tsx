import { TokenManageContext } from '../../context/TokenManageContext';
import { useGuardContext } from '../../hooks/useGuardContext';
export const Main = () => {
  const { saveToken } = useGuardContext(TokenManageContext);

  const contaminateToken = () => {
    saveToken('xxx');
  };

  return (
    <div>
      <p>메인 페이지입니다.</p>
      <button onClick={contaminateToken}>토큰 변조하기 버튼</button>
    </div>
  );
};

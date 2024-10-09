export const Main = () => {
  const contaminateToken = () => {
    localStorage.setItem('token', 'xxx');
  };

  return (
    <div>
      <p>메인 페이지입니다.</p>
      <button onClick={contaminateToken}>토큰 변조하기 버튼</button>
    </div>
  );
};

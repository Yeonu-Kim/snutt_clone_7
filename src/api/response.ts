// status와 data는 모든 응답에서 반복되므로
// 따로 정의 후 extend를 사용하여 재사용
// response는 data 안에 삽입

export type ResponseNecessary = {
  status: number;
  data: unknown;
};

export type SuccessResponse<T, Status extends number = 200> = {
  status: Status;
  data: T;
};

export type ErrorResponse<
  Status extends 400 | 401 | 403 | 404,
  Errcode extends number,
  Ext extends Record<string, never> = Record<string, never>,
> = {
  status: Status;
  data: {
    errcode: Errcode;
    ext: Ext;
    message: string;
  };
};

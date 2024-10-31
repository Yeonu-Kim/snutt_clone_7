import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import type { CourseBook } from '@/entities/courseBook';
import { useGuardContext } from '@/hooks/useGuardContext';
import { formatSemester } from '@/utils/format';
import { showDialog } from '@/utils/showDialog';

type ChangeNameDialog = {
  courseBookList: CourseBook[];
  onClose(): void;
};

export const AddTimeTableBottomSheet = ({
  courseBookList,
  onClose,
}: ChangeNameDialog) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeTableName, setTimeTableName] = useState('');
  const [semester, setSemester] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const { timeTableService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { showErrorDialog } = showDialog();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { mutate: createTimeTable, isPending } = useMutation({
    mutationFn: async ({
      inputYear,
      inputSemester,
      inputTimeTableName,
    }: {
      inputYear: number;
      inputSemester: number;
      inputTimeTableName: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return await timeTableService.createTimeTable({
        token,
        year: inputYear,
        semester: inputSemester,
        title: inputTimeTableName,
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries({
          queryKey: ['TimeTableService'],
        });
        handleClose();
      } else {
        showErrorDialog(response.message);
      }
    },
    onError: () => {
      showErrorDialog('시간표 생성 중 문제가 발생했습니다.');
    },
  });

  const handleClose = () => {
    setIsVisible(false);
    // 애니메이션 실행 이후 바텀시트가 닫히도록 설정
    setTimeout(onClose, 300);
  };

  const onClickButton = () => {
    if (year !== null && semester !== null && timeTableName !== '') {
      createTimeTable({
        inputYear: year,
        inputSemester: semester,
        inputTimeTableName: timeTableName,
      });
    }
  };

  const clickOption = (yearWithSemester: string) => {
    const [yearString, semesterString] = yearWithSemester.split('-');

    if (yearString !== undefined && semesterString !== undefined) {
      const optionYear = parseInt(yearString, 10);
      const optionSemester = parseInt(semesterString, 10);

      setYear(optionYear);
      setSemester(optionSemester);
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
        onClick={handleClose}
      >
        <div
          className={`flex flex-col w-full bg-white rounded-t-lg p-8 gap-4 transform transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-end justify-between">
            <button onClick={handleClose}>취소</button>
            <button onClick={onClickButton}>완료</button>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm text-gray-500">새로운 시간표 만들기</h1>
            <input
              type="text"
              id="id"
              value={isPending ? '' : timeTableName}
              onChange={(e) => {
                setTimeTableName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && timeTableName !== '') {
                  onClickButton();
                }
              }}
              disabled={isPending}
              placeholder={
                isPending ? '처리 중입니다...' : '시간표 제목을 입력하세요'
              }
              className="w-full py-1 border-b-2 border-gray focus:outline-none focus:border-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm text-gray-500">학기 선택</h1>
            <select
              onChange={(e) => {
                clickOption(e.target.value);
              }}
              className="py-1 border-b-2 border-gray focus:outline-none focus:border-black"
            >
              <option value="" disabled>
                학기를 선택하세요
              </option>
              {courseBookList.map((courseBook) => {
                return (
                  <option
                    key={`${courseBook.year}-${courseBook.semester}`}
                    value={`${courseBook.year}-${courseBook.semester}`}
                  >
                    {`${courseBook.year}년 ${formatSemester(Number(courseBook.semester))}`}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

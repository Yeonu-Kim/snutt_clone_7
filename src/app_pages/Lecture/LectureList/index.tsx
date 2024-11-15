import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { LoadingPage } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { Layout } from '@/components/styles/Layout.tsx';
import { DAY_LABEL_MAP } from '@/constants/dayLabel.ts';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog.ts';

export const LectureListPage = () => {
  const { timetableId } = useParams();
  const { showErrorDialog } = showDialog();
  const { toMain } = useRouteNavigation();

  const { timetableData } = useGetTimetableData({ timetableId });

  if (timetableData === undefined) return <LoadingPage />;

  if (timetableData.type === 'error') {
    showErrorDialog('강의 불러오기 실패');
    return null;
  }

  return (
    <>
      <Layout>
        <div
          id="Wrapper-Container"
          className="flex flex-col items-center w-full min-h-screen
          dark:bg-gray-950"
        >
          <div
            id="upper-bar"
            className="w-full py-4 px-6 top-0 bg-white border-b-[1px]
            flex justify-center items-center fixed max-w-375
            dark:bg-gray-800 dark:text-gray-200 dark:border-gray-800"
          >
            <div
              className="BackButtonWrapper absolute left-3 rounded-lg flex items-center
            cursor-pointer text-gray-500 hover:text-orange
            dark:text-gray-200"
            >
              <span onClick={toMain}>&larr; 뒤로</span>
            </div>
            <p>강의 목록</p>
            <div className="absolute right-3 rounded-lg">+</div>
          </div>
          <div
            id="Main-Container"
            className="h-lvh flex flex-col justify-start items-start overflow-y-auto overflow-x-hidden
            p-5 pt-2 w-full mt-[60px] mb-[80px]
            dark:bg-gray-950 dark:text-gray-200"
          >
            <div>
              {timetableData.data.lecture_list.map((lecture, index) => {
                const uniqueArray = [
                  ...new Set(
                    lecture.class_time_json.map((classTime) => classTime.place),
                  ),
                ];

                return (
                  <div
                    key={index}
                    className="w-[440px] pt-0 gap-0.5
                       flex flex-col items-start border-b-[1px] border-b-gray-200 mt-2 pb-3"
                  >
                    <div className="flex justify-between w-full items-center">
                      <span className="font-bold text-[14px]">
                        {lecture.course_title}
                      </span>
                      <span
                        className="text-gray-400 text-[12px]
                      dark:text-gray-200"
                      >
                        {lecture.instructor !== ''
                          ? `${lecture.instructor} / ${lecture.credit}학점`
                          : `${lecture.credit}학점`}
                      </span>
                    </div>

                    <span
                      className="text-[12px] text-gray-700
                    dark:text-gray-200"
                    >
                      {lecture.department !== undefined &&
                      lecture.academic_year !== undefined
                        ? `${lecture.department}, ${lecture.academic_year}`
                        : `-`}
                    </span>
                    <span className="text-[12px] text-gray-700">
                      {lecture.class_time_json.map((classTime, timeIndex) => {
                        const times = {
                          startTime: classTime.start_time,
                          endTime: classTime.end_time,
                          day: DAY_LABEL_MAP[classTime.day],
                        };

                        if (
                          classTime.start_time === ' ' &&
                          classTime.end_time === ' ' &&
                          classTime.day === 0
                        ) {
                          return (
                            <span
                              key={timeIndex}
                              className="text-[12px] text-gray-700"
                            >
                              {' '}
                              -{' '}
                            </span>
                          );
                        }

                        return (
                          <span
                            key={timeIndex}
                            className="text-[12px] text-gray-700
                            dark:text-gray-200"
                          >
                            {`${times.day}(${times.startTime}~${times.endTime})${timeIndex < lecture.class_time_json.length - 1 ? ', ' : ''} `}
                          </span>
                        );
                      })}
                    </span>
                    <span
                      className="text-[12px] text-gray-700
                    dark:text-gray-200"
                    >
                      {uniqueArray.at(0) !== '' ? uniqueArray.join(', ') : '-'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bottom-0 w-full bg-white fixed max-w-375">
            <Navbar selectedMenu="mypage" />
          </div>
        </div>
      </Layout>
    </>
  );
};

const useGetTimetableData = ({
  timetableId,
}: {
  timetableId: string | undefined;
}) => {
  const { token } = useGuardContext(TokenAuthContext);
  const { timeTableService } = useGuardContext(ServiceContext);

  const { data: timetableData } = useQuery({
    queryKey: [
      'TimeTableService',
      'getTimeTableById',
      token,
      timetableId,
    ] as const,
    queryFn: ({ queryKey: [, , t, ttId] }) => {
      if (t === null || ttId === undefined) {
        throw new Error('잘못된 요청입니다.');
      }
      return timeTableService.getTimeTableById({ token: t, timetableId: ttId });
    },
    enabled: token !== null && timetableId !== undefined,
  });

  return { timetableData };
};

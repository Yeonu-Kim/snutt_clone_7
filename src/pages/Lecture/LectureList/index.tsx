import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { LoadingPage } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { Layout } from '@/components/styles/Layout.tsx';
import { DAY_LABEL_MAP } from '@/constants/dayLabel.ts';
import { ICON_SRC } from '@/constants/fileSource';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog.ts';

import { AddCustomTimeTable } from '../CreateLecture';

export const LectureListPage = () => {
  const { timetableId } = useParams();
  const { showErrorDialog } = showDialog();
  const { toMain } = useRouteNavigation();
  const { timetableData } = useGetTimetableData({ timetableId });
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };
  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };
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
          className="flex min-h-screen w-full flex-col items-center dark:bg-gray-950"
        >
          <div
            id="upper-bar"
            className="fixed top-0 flex w-full max-w-375 items-center justify-center border-b-[1px] bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200"
          >
            <div className="BackButtonWrapper absolute left-3 flex cursor-pointer items-center rounded-lg text-gray-500 hover:text-orange dark:text-gray-200">
              <span onClick={toMain}>&larr; 뒤로</span>
            </div>
            <p>강의 목록</p>

            <div
              className="absolute right-3 rounded-lg font-bold text-gray-400"
              onClick={openBottomSheet}
            >
              <img
                alt="add"
                src={ICON_SRC.ADD}
                className="dark:brightness-0 dark:invert dark:filter"
              />
            </div>
          </div>
          <div
            id="Main-Container"
            className="mb-20 mt-16 flex h-lvh w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-5 pt-2 dark:bg-gray-950 dark:text-gray-200"
          >
            <div className="w-full">
              {timetableData.data.lecture_list.map((lecture, index) => {
                const uniqueArray = [
                  ...new Set(
                    lecture.class_time_json.map((classTime) => classTime.place),
                  ),
                ];

                return (
                  <div
                    key={index}
                    className="mt-2 flex w-full flex-col items-start gap-0.5 border-b-2 border-b-gray-200 pb-3 pt-0"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-base font-bold">
                        {lecture.course_title}
                      </span>
                      <span className="text-[0.75rem] text-gray-400 dark:text-gray-200">
                        {lecture.instructor !== ''
                          ? `${lecture.instructor} / ${lecture.credit}학점`
                          : `${lecture.credit}학점`}
                      </span>
                    </div>

                    <span className="text-[0.75rem] text-gray-700 dark:text-gray-200">
                      {lecture.department !== undefined &&
                      lecture.academic_year !== undefined
                        ? `${lecture.department}, ${lecture.academic_year}`
                        : `-`}
                    </span>
                    <span className="text-[0.75rem] text-gray-700">
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
                              className="text-[0.75rem] text-gray-700"
                            >
                              {' '}
                              -{' '}
                            </span>
                          );
                        }

                        return (
                          <span
                            key={timeIndex}
                            className="text-[0.75rem] text-gray-700 dark:text-gray-200"
                          >
                            {`${times.day}(${times.startTime}~${times.endTime})${timeIndex < lecture.class_time_json.length - 1 ? ', ' : ''} `}
                          </span>
                        );
                      })}
                    </span>
                    <span className="text-[0.75rem] text-gray-700 dark:text-gray-200">
                      {uniqueArray.at(0) !== '' ? uniqueArray.join(', ') : '-'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="fixed bottom-0 w-full max-w-375 bg-white">
            <Navbar selectedMenu="timetable" />
          </div>
        </div>
      </Layout>
      {isBottomSheetVisible && (
        <AddCustomTimeTable onClose={closeBottomSheet} />
      )}
    </>
  );
};

export const useGetTimetableData = ({
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

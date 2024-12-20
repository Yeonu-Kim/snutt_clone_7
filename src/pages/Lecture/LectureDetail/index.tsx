import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { HeaderContainer } from '@/components/common/HeaderContainer';
import { IconContainer } from '@/components/common/IconContainer';
import { LoadingPage } from '@/components/Loading';
import { Layout } from '@/components/styles/Layout';
import { DAY_LABEL_MAP } from '@/constants/dayLabel.ts';
import { ICON_SRC } from '@/constants/fileSource';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { colorList } from '@/entities/color';
import type { Lecture } from '@/entities/lecture';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useRouteNavigation } from '@/hooks/useRouteNavigation';
import { DeleteLectureDialog } from '@/pages/Lecture/LectureDetail/DeleteLectureDialog';
import { showDialog } from '@/utils/showDialog';

export const LectureDetailPage = () => {
  const { timetableId, lectureId } = useParams();
  const { showErrorDialog, showTBDDialog } = showDialog();
  const { toMain } = useRouteNavigation();
  const [dialogMenu, setDialogMenu] = useState<'NONE' | 'DELETE'>('NONE');

  const { timetableData } = useGetTimetableData({ timetableId });

  if (timetableData === undefined) return <LoadingPage />;

  if (timetableData.type === 'error') {
    showErrorDialog(timetableData.message);
    return null;
  }

  const currentLecture = timetableData.data.lecture_list.find(
    (timetable) => timetable._id === lectureId,
  );

  if (currentLecture === undefined) {
    toMain();
    return null;
  }

  const { lectureInfoSectionList, showContent } = renderContents({
    currentLecture,
  });

  const clickDeleteButton = () => {
    setDialogMenu('DELETE');
  };

  const closeDeleteDailog = () => {
    setDialogMenu('NONE');
  };

  return (
    <>
      <Layout>
        <div className="h-full overflow-y-scroll bg-gray-200 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 dark:bg-gray-950">
          <HeaderContainer>
            <div className="flex gap-2">
              <div
                className="BackButtonWrapper flex cursor-pointer items-center"
                onClick={toMain}
              >
                <IconContainer
                  src={ICON_SRC.ARROW.DOWN}
                  alt="뒤로가기 버튼"
                  className="rotate-90 dark:invert"
                />
              </div>
              <span>강의 상세 보기</span>
            </div>
            <div className="flex items-center gap-2">
              <IconContainer
                src={ICON_SRC.BELL}
                alt="알림 버튼"
                className="dark:invert"
              />
              <IconContainer
                src={ICON_SRC.BOOKMARK}
                alt="관심강좌 보기 버튼"
                className="dark:invert"
              />
              <span>편집</span>
            </div>
          </HeaderContainer>
          <div className="mb-10 mt-12 flex flex-col gap-2">
            {lectureInfoSectionList.map((lectureInfoSection, sectionIndex) => (
              <div
                key={`section-${sectionIndex}`}
                className="flex flex-col gap-1 bg-white py-1 dark:bg-gray-800 dark:text-gray-200"
              >
                {lectureInfoSection.title !== null && (
                  <div className="px-4 py-1 text-sm text-gray-400">
                    {lectureInfoSection.title}
                  </div>
                )}
                {lectureInfoSection.contents.map((infoContent, infoIndex) => {
                  if (infoContent.content !== undefined) {
                    return showContent(infoContent, infoIndex);
                  }
                  return null;
                })}
              </div>
            ))}
            <div className="flex flex-col gap-1 bg-white dark:bg-gray-800 dark:text-gray-200">
              <div
                className="flex cursor-pointer justify-center p-2 transition-all hover:bg-gray"
                onClick={showTBDDialog}
              >
                강의계획서
              </div>
              <div
                className="flex cursor-pointer justify-center p-2 transition-all hover:bg-gray"
                onClick={showTBDDialog}
              >
                강의평
              </div>
            </div>
            <div className="flex flex-col gap-1 bg-white dark:bg-gray-800">
              <div
                className="flex cursor-pointer justify-center p-2 text-red transition-all hover:bg-gray"
                onClick={clickDeleteButton}
              >
                삭제
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {dialogMenu === 'DELETE' &&
        lectureId !== undefined &&
        timetableId !== undefined && (
          <DeleteLectureDialog
            onClose={closeDeleteDailog}
            timetableId={timetableId}
            lectureId={lectureId}
          />
        )}
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

const renderContents = ({ currentLecture }: { currentLecture: Lecture }) => {
  const colorClass = colorList(currentLecture.colorIndex);
  const lectureInfoSectionList = [
    {
      title: null,
      contents: [
        {
          name: '강의명',
          content: currentLecture.course_title,
        },
        {
          name: '교수',
          content: currentLecture.instructor,
        },
        {
          name: '색상',
          content: (
            <div className="flex">
              <div className={`h-4 w-4 bg-white`}></div>
              <div className={`h-4 w-4 ${colorClass}`}></div>
            </div>
          ),
        },
      ],
    },
    {
      title: null,
      contents: [
        {
          name: '학과',
          content: currentLecture.department,
        },
        {
          name: '학년',
          content: currentLecture.academic_year,
        },
        {
          name: '학점',
          content: currentLecture.credit,
        },
        {
          name: '분류',
          content: currentLecture.classification,
        },
        {
          name: '구분',
          content: currentLecture.category,
        },
        {
          name: '강좌번호',
          content: currentLecture.course_number,
        },
        {
          name: '분반번호',
          content: currentLecture.lecture_number,
        },
        {
          name: '정원',
          content: currentLecture.quota,
        },
        {
          name: '비고',
          content: currentLecture.remark,
        },
      ],
    },
    {
      title: '시간 및 장소',
      contents: currentLecture.class_time_json.reduce<
        { name: string; content: string }[]
      >((result, classTime) => {
        return [
          ...result,
          {
            name: '시간',
            content: `${DAY_LABEL_MAP[classTime.day]}(${classTime.start_time}~${classTime.end_time})`,
          },
          {
            name: '장소',
            content: classTime.place,
          },
        ];
      }, []),
    },
  ];

  const showContent = (
    infoContent:
      | {
          name: string;
          content: string;
        }
      | {
          name: string;
          content: React.JSX.Element;
        }
      | {
          name: string;
          content: string | undefined;
        }
      | {
          name: string;
          content: number;
        },
    infoIndex: number,
  ) => {
    if (infoContent.name === '구분') {
      return (
        <div key={`info-${infoIndex}`} className="flex items-center px-4 py-2">
          <div className="w-20 text-sm text-gray-400">{infoContent.name}</div>

          {infoContent.content !== ' ' && infoContent.content !== '' ? (
            <div>{infoContent.content}</div>
          ) : (
            <div className="text-gray-400">(없음)</div>
          )}
        </div>
      );
    }
    if (infoContent.name === '시간' || infoContent.name === '장소') {
      return (
        <div key={`info-${infoIndex}`} className="flex items-center px-4">
          <div className="w-20 text-sm text-gray-400">{infoContent.name}</div>
          <div>
            {infoContent.content !== ' ' && infoContent.content !== '' ? (
              <div>{infoContent.content}</div>
            ) : (
              <div className="text-gray-400">(없음)</div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div key={`info-${infoIndex}`} className="flex items-center px-4 py-2">
        <div className="w-20 text-sm text-gray-400">{infoContent.name}</div>
        <div>{infoContent.content}</div>
      </div>
    );
  };

  return {
    lectureInfoSectionList,
    showContent,
  };
};

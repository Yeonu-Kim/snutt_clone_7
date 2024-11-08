import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { LoadingPage } from '@/components/Loading';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { DAY_LABEL_MAP } from '@/entities/time';
import { useGuardContext } from '@/hooks/useGuardContext';
import { showDialog } from '@/utils/showDialog';

export const LectureDetailPage = () => {
  const { timetableId, lectureId } = useParams();
  const { token } = useGuardContext(TokenAuthContext);
  const { timeTableService } = useGuardContext(ServiceContext);
  const { showErrorDialog } = showDialog();

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

  if (timetableData === undefined) return <LoadingPage />;

  if (timetableData.type === 'error') {
    showErrorDialog(timetableData.message);
    return null;
  }

  const currentLecture = timetableData.data.lecture_list.find(
    (timetable) => timetable._id === lectureId,
  );

  if (currentLecture === undefined) {
    return (
      <div>
        <span>존재하지 않는 강의입니다.</span>
      </div>
    );
  }

  /* export type Lecture = {
  _id: string;
  academic_year?: string;
  category?: string;
  class_time_json: ClassTime[];
  classification?: string;
  credit: number;
  department?: string;
  instructor: string;
  lecture_number: string;
  quota: number;
  remark: string;
  course_number?: string;
  course_title: string;
  colorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  lecture_id?: string;
};*/

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
          content: <div>{currentLecture.colorIndex}</div>,
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

  return (
    <div>
      {lectureInfoSectionList.map((lectureInfoSection, sectionIndex) => (
        <div key={`section-${sectionIndex}`}>
          {lectureInfoSection.title !== null && (
            <div>{lectureInfoSection.title}</div>
          )}
          {lectureInfoSection.contents.map(
            (infoContent, infoIndex) =>
              infoContent.content !== undefined && (
                <div key={`info-${infoIndex}`}>
                  <div>{infoContent.name}</div>
                  <div>{infoContent.content}</div>
                </div>
              ),
          )}
        </div>
      ))}
    </div>
  );
};

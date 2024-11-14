import { useQuery } from '@tanstack/react-query';

import { LoadingPage } from '@/components/Loading';
import { DAY_LABEL_MAP } from '@/constants/dayLabel';
import { ModalManageContext } from '@/context/ModalManageContext';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { colorList } from '@/entities/color';
import { dayList, hourList } from '@/entities/time';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useRouteNavigation } from '@/hooks/useRouteNavigation';
import { showDialog } from '@/utils/showDialog';

export const TimeTable = ({
  timetableId,
  setTotalCredit,
  setTitle,
  handleClickSetTimetableId,
}: {
  timetableId: string | null;
  setTotalCredit: (credit: number) => void;
  setTitle: (title: string) => void;
  handleClickSetTimetableId: (timetableId: string) => void;
}) => {
  const { timeTableService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { setOpen } = useGuardContext(ModalManageContext);
  const { showErrorDialog } = showDialog();
  const { toLectureDetailPage } = useRouteNavigation();

  const { data: timeTableData, isError } = useQuery({
    queryKey: [
      'TimeTableService',
      timetableId !== null && timetableId !== ''
        ? 'getTimeTableById'
        : 'getTimeTable',
      token,
      timetableId,
    ] as const,
    queryFn: ({ queryKey: [, , t, id] }) => {
      if (t === null) {
        throw new Error('토큰이 없습니다.');
      }
      if (id !== null && id !== '') {
        return timeTableService.getTimeTableById({ token: t, timetableId: id });
      } else {
        return timeTableService.getTimeTable({ token: t });
      }
    },
    enabled: token !== null,
  });

  if (timeTableData === undefined) return <LoadingPage />;

  // 241108 연우: 단순히 token 문제가 아닐 수 있음.
  // toast로 에러 메세지를 띄워줘야 할 거 같음.
  if (isError) {
    setOpen(true);
    return null;
  }

  if (timeTableData.type === 'success') {
    const totalCredit = timeTableData.data.lecture_list.reduce(
      (acc, cur) => acc + cur.credit,
      0,
    );
    setTotalCredit(totalCredit);
    setTitle(timeTableData.data.title);
    handleClickSetTimetableId(timeTableData.data._id);
    const columnCount = dayList.length - 2;
    const rowCount = hourList.length * 12;
    return (
      <div
        className="grid h-full"
        style={{
          gridTemplateColumns: `16px repeat(${columnCount}, 1fr)`,
          gridTemplateRows: `40px repeat(${rowCount}, 1fr)`,
        }}
      >
        {/* 날 Header */}
        {dayList.slice(0, 5).map((day, i) => (
          <div
            key={day}
            className="row-start-1 row-end-2 flex justify-center items-end p-2 text-xs text-textAlternative "
            style={{
              gridColumnStart: i + 2,
              gridColumnEnd: i + 2 + 1,
            }}
          >
            {DAY_LABEL_MAP[day]}
          </div>
        ))}
        {/* 시간 col */}
        {hourList.map((hour, i) => (
          <div
            key={hour}
            className="col-start-1 col-end-2 text-right text-xs text-textALternative opacity-40 pr-1 pt-1"
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          >
            {hour}
          </div>
        ))}
        {/* 시간 라인 진한거*/}
        {hourList.map((_, i) => (
          <div
            key={_}
            className="col-start-1 -col-end-1 border-t-[1px] border-solid  border-t-lineLight "
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          ></div>
        ))}
        {/* 시간 라인 연한거 */}
        {hourList.map((_, i) => (
          <div
            key={_}
            className="col-start-2 -col-end-1 border-b-[1px] border-solid  border-b-lineLightest"
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          ></div>
        ))}
        {/* 날짜 라인 */}
        {dayList.slice(0, 5).map((_, i) => (
          <div
            key={_}
            className="row-start-1 -row-end-1 border-l-[1px] border-solid border-l-lineLight"
            style={{
              gridColumnStart: i + 2,
              gridColumnEnd: i + 2 + 1,
            }}
          ></div>
        ))}

        {/* 강의 item */}
        {timeTableData.data.lecture_list.map((lecture) =>
          lecture.class_time_json.map((time, i) => {
            const {
              col: [colStart, colEnd],
              row: [rowStart, rowEnd],
            } = timeTableService.getGridPos(time);
            const colorClass = colorList[
              lecture.colorIndex % colorList.length
            ] as string;

            return (
              <div
                key={`${lecture._id}-${i}`}
                className={`text-white flex flex-col items-center justify-center p-2 text-center ${colorClass} col-start-${colStart} col-end-${colEnd} row-start-${rowStart} row-end-${rowEnd}`}
                style={{
                  gridColumnStart: colStart,
                  gridColumnEnd: colEnd,
                  gridRowStart: rowStart,
                  gridRowEnd: rowEnd,
                }}
                onClick={() => {
                  if (timetableId !== null) {
                    toLectureDetailPage({
                      timetableId,
                      lectureId: lecture._id,
                    });
                  }
                }}
              >
                <span className="text-[10px] font-normal">
                  {lecture.course_title}
                </span>
                <span className="text-[10px] font-bold">{time.place}</span>
              </div>
            );
          }),
        )}
      </div>
    );
  }
  showErrorDialog(timeTableData.message);
  return null;
};

import { useQuery } from '@tanstack/react-query';

import { LoadingPage } from '@/components/Loading';
import { ModalManageContext } from '@/context/ModalManageContext';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { DAY_LABEL_MAP, dayList, type Hour24 } from '@/entities/time';
import { useGuardContext } from '@/hooks/useGuardContext';
import { showDialog } from '@/utils/showDialog';
const FIXED_HOURS: Hour24[] = Array.from(
  { length: 14 },
  (_, i) => (9 + i) as Hour24,
);

export const TimeTable = ({ timetableId }: { timetableId: string | null }) => {
  const { timeTableService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { setOpen } = useGuardContext(ModalManageContext);
  const { showErrorDialog } = showDialog();

  const { data: timeTableData, isError } = useQuery({
    queryKey: ['TimeTableService', 'getTimeTable', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error();
      }
      return timeTableService.getTimeTable({ token: t });
    },
    enabled: token !== null,
  });
  if (timeTableData === undefined) return <LoadingPage />;

  if (isError) {
    setOpen(true);
    return null;
  }

  if (timeTableData.type === 'success') {
    const columnCount = 5;
    const rowCount = FIXED_HOURS.length * 12;
    return (
      <div
        className="grid h-full"
        style={{
          gridTemplateColumns: `45px repeat(${columnCount}, 1fr)`,
          gridTemplateRows: `40px repeat(${rowCount}, 1fr)`,
        }}
      >
        {dayList.slice(0, 5).map((day, i) => (
          <div
            key={day}
            className="row-start-1 row-end-2 flex justify-center items-end p-2 text-sm text-textAlternative "
            style={{
              gridColumnStart: i + 2,
              gridColumnEnd: i + 2 + 1,
            }}
          >
            {DAY_LABEL_MAP[day]}
          </div>
        ))}
        {/* 시간 숫자 */}
        {FIXED_HOURS.map((hour, i) => (
          <div
            key={hour}
            className="col-start-1 col-end-2 text-right text-sm text-textALternative opacity-40 pr-2 "
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          >
            {hour}
          </div>
        ))}
        {/* 시간 라인 진한거*/}
        {FIXED_HOURS.map((_, i) => (
          <div
            key={_}
            className="col-start-1 -col-end-1 border-t-[1px] border-solid  border-t-lineLight "
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          ></div>
        ))}
        {/* <div
          className="col-start-1 -col-end-1 border-t-[1px] border-solid  border-t-lineLight "
          style={{
            gridRowStart: rowCount + 2,
            gridRowEnd: rowCount + 2 + 6,
          }}
        ></div> */}
        {/* 시간 라인 연한거 */}
        {FIXED_HOURS.map((_, i) => (
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

        {/* Lecture Grid Items */}
        {timeTableData.data.lecture_list.map((lecture) =>
          lecture.class_time_json.map((time, i) => {
            const {
              col: [colStart, colEnd],
              row: [rowStart, rowEnd],
            } = timeTableService.getGridPos(time);

            return (
              <div
                key={`${lecture._id}-${i}`}
                className="bg-orange text-white flex flex-col items-center justify-center p-2 text-center"
                style={{
                  gridColumnStart: colStart,
                  gridColumnEnd: colEnd,
                  gridRowStart: rowStart,
                  gridRowEnd: rowEnd,
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

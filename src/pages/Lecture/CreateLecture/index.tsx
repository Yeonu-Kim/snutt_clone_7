import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { BottomSheetContainer } from '@/components/BottomeSheetContainer';
import { SpinnerLoading } from '@/components/Loading';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { type CustomLecture } from '@/entities/lecture';
import { type Day, minToTime } from '@/entities/time';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useBottomSheet } from '@/hooks/useVisible';
import { showDialog } from '@/utils/showDialog';

import { ColorDropdown } from './ColorDropdown';
import { ForceLectureDialog } from './ForceLectureDialog';
import { TimeInput } from './TimeInput';

export const AddCustomTimeTable = ({ onClose }: { onClose: () => void }) => {
  const { timetableId } = useParams();
  const { isVisible, handleClose } = useBottomSheet({ onClose });
  const [isForced, setIsForced] = useState(false);

  const { createCustomLecture, isPending } = useCreateCustomLecture({
    handleClose,
    setIsForced,
  });

  const [courseTitle, setCourseTitle] = useState('새로운 강의');
  const [instructor, setInstructor] = useState('');
  const [credit, setCredit] = useState<number | ''>(0);
  const [color, setColor] = useState(0);
  const [remark, setRemark] = useState('');
  const [place, setPlace] = useState('');
  const [classTimes, setClassTimes] = useState([
    { day: 0 as Day, startMinute: 540, endMinute: 600 },
  ]);

  const handleTimeChange = (
    index: number,
    time: { day: Day; startMinute: number; endMinute: number },
  ) => {
    setClassTimes((prev) => {
      const newClassTimes = [...prev];
      newClassTimes[index] = time;
      return newClassTimes;
    });
  };

  const addClassTime = () => {
    setClassTimes((prev) => [
      ...prev,
      { day: 0 as Day, startMinute: 540, endMinute: 600 },
    ]);
  };

  const getLectureDetails = (): CustomLecture => ({
    course_title: courseTitle,
    instructor,
    credit: credit === '' ? 0 : credit,
    class_time_json: classTimes.map((time) => ({
      day: time.day,
      startMinute: time.startMinute,
      endMinute: time.endMinute,
      place,
      start_time: minToTime(time.startMinute),
      end_time: minToTime(time.endMinute),
    })),
    remark,
    colorIndex: color,
    is_forced: isForced,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timetableId === undefined) {
      throw new Error('시간표 아이디가 존재하지 않습니다.');
    }

    createCustomLecture({
      timetableId,
      lectureDetails: getLectureDetails(),
    });
  };
  const handleForceSubmit = () => {
    if (timetableId === undefined) {
      throw new Error('시간표 아이디가 존재하지 않습니다.');
    }

    setIsForced(true);
    createCustomLecture({
      timetableId,
      lectureDetails: getLectureDetails(),
    });
  };
  return (
    <>
      <BottomSheetContainer
        isVisible={isVisible}
        onClick={handleClose}
        bgColor="bg-gray-100"
        heightClass="h-[98%]"
      >
        {isPending && <SpinnerLoading />}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center justify-between rounded-t-xl border-b bg-white px-4 py-3">
            <button type="button" onClick={handleClose}>
              취소
            </button>
            <button type="submit">저장</button>
          </div>
          <div className="Class_Info mb-4 space-y-4 bg-white p-4">
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="Class_Name_Label col-span-3 text-sm text-gray-600">
                강의명
              </label>
              <input
                type="text"
                className="Class_Name_Input col-span-9 focus:outline-none focus:ring-0"
                value={courseTitle}
                onChange={(e) => {
                  setCourseTitle(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="Professor_Label col-span-3 text-sm text-gray-600">
                교수
              </label>
              <input
                type="text"
                className="Professor_Input col-span-9 focus:outline-none focus:ring-0"
                placeholder="(없음)"
                value={instructor}
                onChange={(e) => {
                  setInstructor(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="Credit_Label col-span-3 text-sm text-gray-600">
                학점
              </label>
              <input
                type="number"
                className="Credit_Input col-span-9 focus:outline-none focus:ring-0"
                placeholder="(없음)"
                value={credit}
                onChange={(e) => {
                  const value = e.target.value;
                  setCredit(value === '' ? '' : Number(value));
                }}
              />
            </div>
            <div className="grid grid-cols-12 items-center gap-2">
              <label
                htmlFor="colorDropdown"
                className="Color_Label col-span-3 text-sm text-gray-600"
              >
                색
              </label>
              <ColorDropdown
                selectedColorIndex={color}
                onSelectColor={(index) => {
                  setColor(index);
                }}
              />
            </div>
          </div>
          <div className="Notes mb-4 grid grid-cols-12 items-center gap-2 bg-white p-4">
            <label className="Notes_Label col-span-3 text-sm text-gray-600">
              비고
            </label>
            <input
              type="text"
              className="Notes_Input col-span-9 focus:outline-none focus:ring-0"
              placeholder="(없음)"
              value={remark}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
            />
          </div>
          <div className="Time_Place flex flex-col space-y-4 bg-white p-4">
            <div className="Time_Place_Label text-sm text-gray-600">
              시간 및 장소
            </div>
            {classTimes.map((_, index) => (
              <div key={index} className="Time_Place_Input">
                <TimeInput
                  onChange={(updatedTime) => {
                    handleTimeChange(index, updatedTime);
                  }}
                />
                <div className="Place grid grid-cols-12 items-center gap-2">
                  <label className="Place_Label col-span-3 text-sm text-gray-600">
                    장소
                  </label>
                  <input
                    type="text"
                    className="Place_Input col-span-9 focus:outline-none focus:ring-0"
                    placeholder="(없음)"
                    value={place}
                    onChange={(e) => {
                      setPlace(e.target.value);
                    }}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="Add_Button items-center justify-center"
              onClick={addClassTime}
            >
              + 시간 추가
            </button>
          </div>
        </form>
      </BottomSheetContainer>
      {isForced && (
        <ForceLectureDialog
          onConfirm={handleForceSubmit}
          onClose={() => {
            setIsForced(false);
          }}
          isPending={isPending}
        />
      )}
    </>
  );
};

const useCreateCustomLecture = ({
  handleClose,
  setIsForced,
}: {
  handleClose: () => void;
  setIsForced: (value: boolean) => void;
}) => {
  const { lectureService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { showErrorDialog } = showDialog();
  const queryClient = useQueryClient();

  const { mutate: createCustomLecture, isPending } = useMutation({
    mutationFn: async ({
      lectureDetails,
      timetableId,
    }: {
      lectureDetails: CustomLecture;
      timetableId: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return lectureService.createCustomLecture({
        token,
        timetableId,
        lectureDetails,
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        handleClose();
        await queryClient.invalidateQueries({
          queryKey: ['TimeTableService', 'getTimeTableById'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['TimeTableService', 'getTimeTableList'],
        });
      } else if (response.message === '강의 시간이 서로 겹칩니다.') {
        setIsForced(true);
      } else {
        showErrorDialog(response.message);
      }
    },
    onError: () => {
      showErrorDialog('강의 추가 중 문제가 발생했습니다.');
    },
  });
  return { createCustomLecture, isPending };
};

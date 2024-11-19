import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { BottomSheetContainer } from '@/components/BottomeSheetContainer';
import { SpinnerLoading } from '@/components/Loading';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { colorList } from '@/entities/color';
import { type CustomLecture } from '@/entities/lecture';
import { dayMap, minToTime } from '@/entities/time';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useBottomSheet } from '@/hooks/useVisible';
import { showDialog } from '@/utils/showDialog';

import { ColorDropdown } from './ColorDropdown';
import { ForceLectureDialog } from './ForceLectureDialog';

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

  const getLectureDetails = (): CustomLecture => ({
    course_title: courseTitle,
    instructor,
    credit: credit === '' ? 0 : credit,
    class_time_json: [
      {
        day: dayMap['Wed'] ?? 2,
        startMinute: 1140,
        endMinute: 1230,
        place,
        start_time: minToTime(1140),
        end_time: minToTime(1230),
      },
    ],
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
          <div className="rounded-t-xl bg-white flex justify-between items-center px-4 py-3 border-b mb-4 ">
            <button type="button" onClick={handleClose}>
              취소
            </button>
            <button type="submit">저장</button>
          </div>
          <div className="Class_Info bg-white p-4 space-y-4 mb-4">
            <div className="grid grid-cols-12 gap-2 items-center">
              <label className="Class_Name_Label col-span-3 text-gray-600 text-sm ">
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
            <div className="grid grid-cols-12 gap-2 items-center">
              <label className="Professor_Label col-span-3 text-gray-600 text-sm ">
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
            <div className="grid grid-cols-12 gap-2 items-center">
              <label className="Credit_Label col-span-3 text-gray-600 text-sm ">
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
            <div className="grid grid-cols-12 gap-2 items-center">
              <label
                htmlFor="colorDropdown"
                className="Color_Label col-span-3 text-gray-600 text-sm "
              >
                색
              </label>
              <ColorDropdown
                colors={colorList}
                selectedColorIndex={color}
                onSelectColor={(index) => {
                  setColor(index);
                }}
              />
            </div>
          </div>
          <div className="Notes bg-white p-4 grid grid-cols-12 gap-2 items-center mb-4">
            <label className="Notes_Label col-span-3 text-gray-600 text-sm ">
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
          <div className="Time_Place flex flex-col bg-white p-4 space-y-4">
            <div className="Time_Place_Label text-gray-600 text-sm ">
              시간 및 장소
            </div>
            <div className="Time_Place_Input">
              <div className="Time  grid grid-cols-12 gap-2 items-center">
                <label className="Time_Label col-span-3 text-gray-600 text-sm ">
                  시간
                </label>
                <div className="Time_Input col-span-9">Wed 19:00 ~ 20:30</div>
              </div>
              <div className="Place grid grid-cols-12 gap-2 items-center">
                <label className="Place_Label col-span-3 text-gray-600 text-sm ">
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
            <button
              type="button"
              className="Add_Button items-center justify-center"
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

export const useCreateCustomLecture = ({
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

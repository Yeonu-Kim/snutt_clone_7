import { BottomSheetContainer } from '@/components/BottomeSheetContainer';

export const AddCustomTimeTable = ({ onClose }: { onClose: () => void }) => {
  return (
    <BottomSheetContainer
      isVisible={true}
      onClick={onClose}
      bgColor="bg-gray-100"
      heightClass="h-[98%]"
    >
      <form className="Wrapper">
        <div className="Button Wrapper rounded-t-xl bg-white flex justify-between items-center px-4 py-3 border-b mb-4 ">
          <button onClick={onClose} className="Cancel_Button">
            취소
          </button>
          <button type="submit" className="Save_Button">
            저장
          </button>
        </div>
        <div className="Class_Info bg-white p-4 space-y-4 mb-4">
          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="Class_Name_Label col-span-3 text-gray-600 text-sm ">
              강의명
            </label>
            <input
              type="text"
              className="Class_Name_Input col-span-9 focus:outline-none focus:ring-0"
              value="새로운 강의"
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
            />
          </div>
          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="Credit_Label col-span-3 text-gray-600 text-sm ">
              학점
            </label>
            <input
              type="text"
              className="Credit_Input col-span-9 focus:outline-none focus:ring-0"
              value={0}
            />
          </div>
          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="Color_Label col-span-3 text-gray-600 text-sm ">
              색
            </label>
            <input
              type="color"
              className="Color_Input col-span-9"
              value="#000000"
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
              <input
                type="time"
                className="Time_Input col-span-9"
                value="Wed 19:00 ~ 20:30 "
              />
            </div>
            <div className="Place grid grid-cols-12 gap-2 items-center">
              <label className="Place_Label col-span-3 text-gray-600 text-sm ">
                장소
              </label>
              <input
                type="text"
                className="Place_Input col-span-9 focus:outline-none focus:ring-0"
                placeholder="(없음)"
              />
            </div>
          </div>
          <button className="Add_Button items-center justify-center">
            + 시간 추가
          </button>
        </div>
      </form>
    </BottomSheetContainer>
  );
};

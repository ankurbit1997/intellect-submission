import React from "react";
import { IMoodCard } from "../../Wellbeing/interface";

const MoodCard = ({
  item,
  setSelectedMood,
  selectedMood,
}: {
  item: IMoodCard;
  setSelectedMood?: React.Dispatch<
    React.SetStateAction<IMoodCard | null | undefined>
  >;
  selectedMood?: IMoodCard | null | undefined;
}) => {
  return (
    <div
      onClick={() => {
        if (setSelectedMood) {
          if (selectedMood?.id !== item?.id) {
            setSelectedMood(item);
          } else {
            setSelectedMood(null);
          }
        }
      }}
      role="button"
      tabIndex={0}
      className={`flex w-18 flex-grow flex-col items-center border-slate-500-200 rounded-lg border p-2 sm:p-3  transition-colors ${
        selectedMood?.id === item?.id ? "bg-slate-300" : "hover:bg-slate-50"
      }`}
    >
      <img src={item?.img} alt={item?.title} className="w-8" />
      <p className="text-xxs mt-2 font-semibold">{item?.title}</p>
    </div>
  );
};

export default MoodCard;

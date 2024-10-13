import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatDate, groupSlotsByDate } from "../../helpers/utils";
import Prev from "../../svg/Prev";
import mockData from "./../../mock.json";
import { motion } from "framer-motion";
import { ISlot } from "./interface";

const index = () => {
  const formattedData = groupSlotsByDate(mockData);

  const formattedDataKeyArr = Object.keys(formattedData);

  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(
    formattedDataKeyArr[0]
  );

  // choosed dates by user
  // data could be better typed in real scenario
  const [pickedTimeSlots, setPickedTimeSlots] = useState<ISlot[] | []>([]);

  const handleTimePicked = (item: ISlot) => {
    //checking based of  startTimeUtc as it will be unique
    const isDuplicate = pickedTimeSlots.some(
      (prev) => prev?.startTimeUtc === item?.startTimeUtc
    );

    if (!isDuplicate) {
      setPickedTimeSlots((prev) => [...prev, item]);
    } else {
      setPickedTimeSlots((prev) => {
        let temp = prev?.filter((i) => i?.startTimeUtc !== item?.startTimeUtc);
        return temp;
      });
    }
  };

  //get availableDates based of selectedDate
  const availableDates = useMemo(() => {
    return selectedDate ? formattedData[selectedDate] : [];
  }, [selectedDate]);

  // move left handler
  const moveRight = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 50, // Scroll 50px to the left
        behavior: "smooth", // Smooth scrolling
      });
    }
  }, []);

  //move right handler
  const moveLeft = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -50, // Scroll 50px to the left
        behavior: "smooth", // Smooth scrolling
      });
    }
  }, []);

  useEffect(() => {
    // clear slots when date is changed
    // assumption that slots of only a single date can be selected at once
    setPickedTimeSlots([]);
  }, [selectedDate]);

  // handleSubmit can be added which takes the dates as arguement and pass it to BE
  //   const handleSubmit = () => {
  //     callToBE(pickedTimeSlots)
  //   }

  return (
    <div className="bg-red-200 p-4 sm:p-8 w-full max-w-md mx-3 sm:md-2 relative ">
      <h5 className="font-medium">Pick a date</h5>
      <div className="flex gap-1 mt-5 items-center">
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={moveLeft}
          role="button"
          className="self-center bg-gray-200 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center shrink-0"
        >
          <Prev />
        </motion.div>
        <div
          ref={containerRef}
          className="flex gap-2 items-center max-w-72 overflow-scroll"
        >
          {formattedDataKeyArr.map((key) => (
            <div
              onClick={() => {
                setSelectedDate(key);
              }}
              role="button"
              className={` rounded-md border-gray-300 border p-3 sm:p-5  ${
                selectedDate === key
                  ? "bg-gray-400"
                  : "bg-white hover:bg-gray-100"
              }`}
              key={key}
            >
              <p className="text-xs font-medium  text-center">
                {formatDate(key)?.date}
              </p>
              <p className="text-xs font-medium text-center">
                {formatDate(key)?.month}
              </p>
            </div>
          ))}
        </div>

        <motion.div
          role="button"
          whileTap={{ scale: 0.9 }}
          style={{ rotate: 180 }}
          onClick={moveRight}
          className="self-center bg-gray-200 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center shrink-0"
        >
          <Prev />
        </motion.div>
      </div>

      {selectedDate ? (
        <>
          <p className="font-medium mt-10">Available time slots</p>

          <p className="font-medium text-xxs sm:text-sm text-teal-700">
            Each session lasts for 30 minutes
          </p>
          <div className="flex flex-row gap-1 mt-4 flex-wrap">
            {availableDates.map((date) => {
              const isPicked = pickedTimeSlots.some(
                (picked) => picked.startTimeUtc === date.startTimeUtc
              );
              return (
                <div
                  role="button"
                  onClick={() => {
                    handleTimePicked(date);
                  }}
                  className={`p-2 rounded-md border-gray-300 border ${
                    isPicked ? "bg-slate-500" : "bg-white hover:bg-slate-200"
                  }`}
                  key={date?.startTimeUtc}
                >
                  <p className="text-xs">{date?.displayTime}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="font-medium mt-10">Please choose a date</p>
      )}
    </div>
  );
};

export default index;

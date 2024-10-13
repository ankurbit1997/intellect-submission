// formatter to group slots by dates like a groupBy method

import { ISlot } from "../components/Scheduler/interface";
import dayjs from "dayjs";

export const groupSlotsByDate = (slotsData: ISlot[]) => {
  let res: {
    [date: string]: ISlot[];
  } = {};

  slotsData.forEach((item) => {
    let key = item?.displayDate;
    if (res.hasOwnProperty(key)) {
      res[key] = [...res[key], item];
    } else {
      res[key] = [item];
    }
  });

  return res;
};

// formatter to convert date to required format date e.g 2024/08/02 -> 02 Fri
export function formatDate(dateString: string): {
  date: string;
  month: string;
} {
  const date = dayjs(dateString);
  return { date: date.format("DD"), month: date.format("ddd") }; // 'DD' for day of month, 'ddd' for abbreviated weekday
}

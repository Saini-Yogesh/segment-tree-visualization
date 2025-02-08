import { toast } from "react-toastify";

export const handleRangeUpdate = (
  rangeStart,
  rangeEnd,
  value,
  onRangeUpdate
) => {
  //   onRangeUpdate(rangeStart, rangeEnd, value);
  toast.success(`Range [${rangeStart}, ${rangeEnd}] updated to ${value}!`);
};

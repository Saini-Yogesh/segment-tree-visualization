import { toast } from "react-toastify";

export const handleRangeQuery = (rangeStart, rangeEnd, onRangeQuery) => {
  //   onRangeQuery(rangeStart, rangeEnd);
  toast.info(`Result displayed for range [${rangeStart}, ${rangeEnd}]`);
};

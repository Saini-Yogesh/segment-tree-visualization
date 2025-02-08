import { toast } from "react-toastify";

export const handleUpdateIndex = (index, value, sizeOfArray, onUpdateIndex) => {
  //   onUpdateIndex(index, value);
  toast.success(`Index ${index} updated to ${value}!`);
};

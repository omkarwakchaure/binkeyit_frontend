import toast from "react-hot-toast";
const AxiosToast = (error, type = "error") => {
  switch (type) {
    case "success":
      toast.success(error.data.message);
      break;
    case "successError":
      toast.error(error.data.message);
      break;
    case "error":
      toast.error(error?.response?.data?.message);
      break;
  }
};

export default AxiosToast;

import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";
const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });
    return response.data;
  } catch (e) {
    console.error("Error fetching user details:", e);
  }
};
export default fetchUserDetails;

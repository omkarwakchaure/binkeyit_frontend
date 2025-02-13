import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import { setCategories } from "./store/categorySlice";
 
function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const user = await fetchUserDetails();
      dispatch(setUserDetails(user.data.user));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategeory = async () => {
    try {
      // setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setCategories(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategeory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[74vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;

import "./App.css";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Axios from "./utils/Axios";
import { SummaryApi } from "./common/SummaryApi";
import { setAllCategory } from "./store/productSlice";

function App() {
  const dispatch = useDispatch();
  // Função para buscar os dados do usuário

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;

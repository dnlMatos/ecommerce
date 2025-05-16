import "./App.css";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  // Função para buscar os dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchUserDetails();
      if (userData && userData.data) {
        dispatch(setUserDetails(userData.data));
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;

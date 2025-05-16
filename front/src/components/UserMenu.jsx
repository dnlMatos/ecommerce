import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import { SummaryApi } from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";

const UserMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <div className="font-semibold">
        Minha conta<div className="text-sm">{user.name || user.mobile}</div>
      </div>

      <Divider />
      <div className="text-sm grid gap-2">
        <Link to={""} className="px-2">
          Meus Pedidos
        </Link>
        <Link to={""} className="px-2">
          Meus Pedidos
        </Link>
        <button
          onClick={handleLogout}
          className="cursor-pointer text-semibold bg-gradient-to-r from-[#363634] via-[#656563] to-[#363634] text-center text-lg text-white rounded-lg py-2 px-2"
        >
          Sair
        </button>
      </div>
    </>
  );
};

export default UserMenu;

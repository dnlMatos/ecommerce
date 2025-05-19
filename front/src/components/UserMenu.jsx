import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { SummaryApi } from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";
import { HiExternalLink } from "react-icons/hi";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (close) close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div
      ref={menuRef}
      className={`bg-white shadow-lg rounded-lg p-4`}
      style={{ zIndex: 9999 }}
    >
      <div className="font-semibold">
        Minha conta
        <div className="text-sm items-center gap-2">
          <span className="max-w-52 text-ellipsis line-clamp-1">
            {user.name || user.mobile}
          </span>

          <Link className="hover:text-green-500" to={"/dashboard/profile"}>
            <HiExternalLink size={20} />
          </Link>
        </div>
      </div>

      <Divider />
      <div className="text-sm grid gap-2">
        <Link
          to={"/dashboard/myorders"}
          className="cursor-pointer hover:bg-gradient-to-r from-[#363634] via-[#656563] to-[#363634] text-center hover:text-white rounded-lg py-2 px-2"
        >
          Meus Pedidos
        </Link>
        <Link
          to={"/dashboard/address"}
          className="cursor-pointer hover:bg-gradient-to-r from-[#363634] via-[#656563] to-[#363634] text-center hover:text-white rounded-lg py-2 px-2"
        >
          Meu endereço
        </Link>
        <button
          onClick={handleLogout}
          className="cursor-pointer hover:bg-gradient-to-r from-[#363634] via-[#656563] to-[#363634] text-center hover:text-white rounded-lg py-2 px-2"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { SummaryApi } from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";
import { HiExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold">Minha conta</div>
      <div className="text-sm items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
          <span>{user.role === "ADMIN" ? "[Admin]" : ""}</span>
        </span>
        <Link
          onClick={handleClose}
          className="hover:text-green-600"
          to={"/dashboard/profile"}
        >
          <HiExternalLink size={20} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 hover:bg-gradient-to-r from-orange-320 via-orange-600"
          >
            Categoria
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="px-2 hover:bg-gradient-to-r from-orange-320 via-orange-600"
          >
            Sub-categoria
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="px-2 hover:bg-gradient-to-r from-orange-320 via-orange-600"
          >
            Carregar produto
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2 hover:bg-gradient-to-r from-orange-320 via-orange-600"
          >
            Produto
          </Link>
        )}

        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-gradient-to-r from-orange-320 via-orange-600"
        >
          Meus Pedidos
        </Link>

        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-gradient-to-r from-orange-320 via-orange-600"
        >
          Meu endereço
        </Link>

        <button
          onClick={handleLogout}
          className="text-semibold bg-gradient-to-r from-orange-320 via-orange-600 text-center text-white text-lg rounded-lg py-2 px-2 cursor-pointer"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

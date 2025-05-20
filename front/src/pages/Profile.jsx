import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEditar from "../components/UserProfileAvatarEditar";
import { useSelector } from "react-redux";
import { SummaryApi } from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateProfile,
        data: userData,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  return (
    <div>
      <div className="w-20 h-20 bg-green-200 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegUserCircle />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm cursor-pointer font-bold min-w-20 border border-red-500 hover:border-green-600 hover:bg-yellow-600 px-3 py-1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 hover:gradient-to-r hover:from-yellow-600 hover:via-orange-500 hover:to-red-600"
      >
        Editar
      </button>
      {openProfileEdit && (
        <UserProfileAvatarEditar
          close={() => setOpenProfileAvatarEdit(false)}
        />
      )}
      <form action="" className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="">Nome</label>
          <input
            type="text"
            id="name"
            placeholder={"Digite seu nome"}
            className="py-2 bg-gray-200 outline-none border focus-with:border-red-800 rounded hover:border-red-600"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Email</label>
          <input
            type="text"
            id="email"
            placeholder={"Digite seu email"}
            className="py-2 bg-gray-200 outline-none border focus-with:border-red-800 rounded hover:border-red-600"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Telefone</label>
          <input
            type="text"
            id="mobile"
            placeholder={"Digite seu nome"}
            className="py-2 bg-gray-200 outline-none border focus-with:border-red-800 rounded hover:border-red-600"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
          />
        </div>

        <button className="text-sm cursor-pointer font-bold min-w-20 border border-red-500 hover:border-green-600 hover:bg-yellow-600 px-3 py-1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 hover:gradient-to-r hover:from-yellow-600 hover:via-orange-500 hover:to-red-600">
          {loading ? "Carregando..." : "Atualizar perfil"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

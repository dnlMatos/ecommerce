import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useState } from "react";
import { useDispatch } from "react-redux";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(data).every((value) => value);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!valideValue) {
        toast.error("Preencha todos os campos");
        return;
      }

      const response = await Axios({ ...SummaryApi.login, data: data });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        // Buscar dados do usuário e atualizar Redux
        const userData = await fetchUserDetails();
        if (userData && userData.data) {
          dispatch(setUserDetails(userData.data));
        }
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border-2 border-gray-400 outline-none focus:border-primary-200 rounded"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Digite seu email"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Senha:</label>
            <div className="bg-blue-50 p-2 border-2 border-gray-400 rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                className="w-full outline-none"
              />
              <div className="cursor-pointer" onClick={handleShowPassword}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}{" "}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-primary-200"
            >
              Esqueceu senha?
            </Link>
          </div>
          <button
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } rounded p-2 cursor-pointer text-white`}
          >
            Entrar
          </button>
        </form>
        <p className="flex justify-between">
          Ainda não cadastrado?
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Cadastrar
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

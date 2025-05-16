import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError.js";
import { SummaryApi } from "../common/SummaryApi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valideValue) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      const response = await Axios({ ...SummaryApi.register, data: data });

      if (response.data.error) {
        toast.error(response.data.error);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Formulário de cadastro</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 border-2 border-gray-400 outline-none focus:border-primary-200 rounded"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
          </div>

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
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirmar senha:</label>
            <div className="bg-blue-50 p-2 border-2 border-gray-400 rounded flex items-center focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                className="w-full outline-none"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } font-semibold tracking-wide p-2 rounded cursor-pointer text-white`}
          >
            Cadastrar
          </button>
        </form>

        <p className="flex justify-between mt-4">
          Já é cadastrado?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

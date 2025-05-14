import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <h3 className="">Formulário de cadastro</h3>
        <form className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 border-2 border-gray-400 outline-none focus:border-gray-900 rounded"
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
              className="bg-blue-50 p-2 border-2 border-gray-400 outline-none focus:border-gray-900 rounded"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Digite seu email"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Senha:</label>
            <div className="bg-blue-50 p-2 border-2 border-gray-400 rounded flex items-center focus-within:border-gray-900">
              <input
                type="password"
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
                <FaRegEye />
                <FaRegEyeSlash />
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirmar senha:</label>
            <div className="bg-blue-50 p-2 border-2 border-gray-400 rounded flex items-center focus-within:border-gray-900">
              <input
                type=""
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                className="w-full outline-none"
              />
              <div className="cursor-pointer">
                <FaRegEye />
                <FaRegEyeSlash />
              </div>
            </div>
          </div>
          <button className="bg-green-800 hover:bg-green-700 p-2 rounded cursor-pointer text-white">
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

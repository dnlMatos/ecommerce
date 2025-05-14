import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-4 py-4">
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border-2 border-gray-400 outline-none focus:border-gray-900 rounded"
              name="email"
              value=""
              onChange=""
              placeholder="Digite seu email"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Senha:</label>
            <div className="bg-blue-50 p-2 border-2 border-gray-400 rounded flex items-center focus-within:border-gray-900">
              <input
                type="password"
                id="password"
                name="password"
                value=""
                onChange=""
                placeholder="Digite sua senha"
                className="w-full outline-none"
              />
              <div className="cursor-pointer">
                Mostrar senha
                <FaRegEye />
                <FaRegEyeSlash />
              </div>
            </div>
            <Link to={""} className="block ml-auto hover:text-primary-200">
              Esqueceu senha?
            </Link>
          </div>
          <button className="bg-green-800 hover:bg-green-700 rounded p-2 cursor-pointer">
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

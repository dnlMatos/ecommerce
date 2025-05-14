import React from "react";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>Formulário de cadastro</p>
        <form className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 border-2 border-gray-400 outline-none focus:border-gray-900 rounded"
              name="name"
              value=""
              onChange=""
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
                className="w-full outline-none"
                name="password"
                value=""
                onChange=""
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
                value=""
                onChange=""
                placeholder="Confirme sua senha"
                className="w-full outline-none"
              />
              <div className="cursor-pointer">
                <FaRegEye />
                <FaRegEyeSlash />
              </div>
            </div>
          </div>
          <button className="bg-green-800 hover:bg-green-700 p-2 rounded">
            Cadastrar
          </button>
        </form>
        <p>
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

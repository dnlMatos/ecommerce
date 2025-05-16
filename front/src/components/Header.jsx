import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isSearchPage = location.pathname === "/search";

  const user = useSelector((state) => state?.user);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  useEffect(() => {}, [openUserMenu]);
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          <div className="h-full">
            <Link to="/" className="h-full flex items-center justify-center">
              <img
                src={logo}
                width={70}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={50}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <Search />
          </div>

          <div>
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={26} />
            </button>

            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    className="flex select-none items-center gap-1 cursor-pointer"
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                  >
                    <p>Minha conta</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>

                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg--gradiente-to-r from-gray-400 via-gray-300 to-gray-200 rounded-lg shadow-lg p-4 w-48">
                        <UserMenu />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg px-2 cursor-pointer"
                >
                  Entrar
                </button>
              )}

              <button className="flex text-white items-center gap-2 bg-gradient-to-r from-[#363634] via-[#656563] to-[#363634] px-3 py-2 rounded-lg">
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold text-sm">
                  <p>Meu Carrinho</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import UserMenu from "./UserMenu";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isSearchPage = location.pathname === "/search";
  const isUserMenu = location.pathname === "/user";

  const user = useSelector((state) => state?.user);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/login");
      return;
    } else {
      navigate("/user");
    }
  };

  useEffect(() => {}, [openUserMenu]);
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between">
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
            <button
              className="text-neutral-600 lg:hidden cursor-pointer"
              onClick={() => {
                if (isUserMenu) {
                  window.history.back();
                } else {
                  handleMobileUser();
                }
              }}
            >
              <span className="relative block w-[26px] h-[26px]">
                <GiHamburgerMenu
                  size={26}
                  className={`absolute left-0 top-0 transition-all duration-300 ease-in-out
                    ${
                      isUserMenu
                        ? "opacity-0 scale-90 rotate-45"
                        : "opacity-100 scale-100 rotate-0"
                    }`}
                />
                <IoClose
                  size={26}
                  className={`absolute left-0 top-0 transition-all duration-300 ease-in-out
                    ${
                      isUserMenu
                        ? "opacity-100 scale-100 rotate-0"
                        : "opacity-0 scale-90 rotate-45"
                    }`}
                />
              </span>
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
                      <div className="bg--gradiente-to-r from-gray-400 via-gray-300 to-gray-200 rounded-lg shadow-lg p-2 w-52">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg cursor-pointer px-2"
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

      <div className="container mx-auto lg:hidden ">
        <Search />
      </div>
    </header>
  );
};

export default Header;

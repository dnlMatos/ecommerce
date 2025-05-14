import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa6";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params.search.slice(3);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-blue-200 bg-white rounded-full shadow-md hover:bg-gray-300 group transition-colors duration-300"
          >
            <FaArrowLeft
              size={20}
              className="text-gray-300 group-hover:text-gray-700 transition-colors duration-300"
            />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-blue-200">
            <IoSearch size={22} />
          </button>
        )}
      </div>

      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Pesquisar "Leite"',
                1000,
                'Pesquisar "Café"',
                1000,
                'Pesquisar "Pão"',
                1000,
                'Pesquisar "Cerveja"',
                1000,
                'Pesquisar "Carne"',
                1000,
                'Pesquisar "Frango"',
                1000,
                'Pesquisar "Peixe"',
                1000,
                'Pesquisar "Suco"',
                1000,
                'Pesquisar "Refrigerante"',
                1000,
                'Pesquisar "Chocolate"',
                1000,
                'Pesquisar "Biscoito"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Pesquise por produto"
              autoFocus
              className="bg-transparent w-full h-full outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

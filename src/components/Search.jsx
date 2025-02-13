import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div
      className="w-full min-w-[240px] lg:min-w-[300px] h-7 lg:h-8 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50
    group focus-within:border-primary-200"
    >
      <div>
        {isMobile && isSearchPage ? (
          <Link to="/" className="flex justify-center items-center h-full p-1 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
            <FaArrowLeft size={18} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-2 group-focus-within:text-primary-200">
            <IoSearch size={18} />
          </button>
        )}
      </div>

      <div className="w-full h-full  ">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="text-sm w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "paneer"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "chicken"',
                1000,
                'Search "potato"',
                1000,
                'Search "rice"',
                1000,
              ]}
              wrapper="span"
              repeat={Infinity}
              speed={50}
              style={{ display: "inline-block" }}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more..."
              autoFocus
              className="bg-transparent w-full h-full text-sm outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../store/userSlice";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useEffect } from "react";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";

  const user = selectUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const redirectToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    setShowUserMenu(false);
  }, [location]);
  const handleMobileUser = () => {
    if (!user._id) {
      redirectToLogin();
    } else {
      navigate("/user-Menu");
    }
  };
  return (
    <header className="h-20 lg:h-16 shadow-md sticky z-40 top-0 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto items-center  flex justify-between px-2  ">
          <div className="h-full">
            <Link to={"/"} className="h-full flex items-center justify-center">
              <img
                src={logo}
                width={120}
                height={50}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={80}
                height={30}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <Search />
          </div>
          <div className="">
            <div>
              {/* {user icon} */}
              <button
                className="text-neutral-600 lg:hidden "
                onClick={handleMobileUser}
              >
                <FaRegCircleUser size={22} />
              </button>
              {/* {login and cart} */}
              <div className="hidden lg:flex items-center gap-6">
                {user?._id ? (
                  <div className="relative">
                    <div
                      className="flex items-center select-none gap-2 cursor-pointer"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                      <p>Account</p>
                      {showUserMenu ? (
                        <GoTriangleDown size={20} />
                      ) : (
                        <GoTriangleUp size={20} />
                      )}
                    </div>
                    {showUserMenu && (
                      <div
                        className="absolute right-0 top-6 rounded shadow-xl bg-white min-w-52 p-1.5"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 0px 10px",
                        }}
                      >
                        <UserMenu />
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      redirectToLogin();
                    }}
                    className="text-lg px-2"
                  >
                    Login
                  </button>
                )}

                <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-1.5 py-1.5 rounded text-white ">
                  <div className="animate-bounce">
                    <BsCart4 size={22} />
                  </div>
                  <div className="font-semibold">
                    <p>My Cart</p>
                  </div>
                </button>
              </div>
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

import React from "react";
import UserMenu from "../components/UserMenu";
import { FaArrowLeftLong } from "react-icons/fa6";
const UserMenuMobile = () => {
  return (
    <section className="bg-white h-full w-full py-8 flex flex-row items-start">
      <div className="container mx-auto px-3 pb-8">
        <UserMenu />
      </div>
      <button
        className="text-neutral-800  flex items-center gap-2 w-fit ml-auto mb-3 mr-6 text-sm hover:text-orange-400 font-semibold"
        onClick={() => window.history.back()}
      >
        <FaArrowLeftLong size={20} /> Back
      </button>
    </section>
  );
};

export default UserMenuMobile;

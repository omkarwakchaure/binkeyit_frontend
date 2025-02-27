import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr] gap-3 lg:px-0">
        {/* left for menu */}
        <div className="py-4 px-3 sticky top-24 overflow-y-auto hidden lg:block bg-white shadow-md rounded-lg">
          <UserMenu />
        </div>

        {/* right for content */}
        <div className="bg-white py-2.5 shadow-md rounded-lg px-4 min-h-[74vh]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

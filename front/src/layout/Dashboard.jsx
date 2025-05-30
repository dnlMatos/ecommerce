import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr] gap-4">
        <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block">
          <UserMenu />
        </div>
        <div
          className="bg-gray-100 p-4 border-l-2 min-h-[85vh]"
          style={{
            borderImage: "linear-gradient(to bottom, #f84900, #f4a300) 1",
          }}
        >
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

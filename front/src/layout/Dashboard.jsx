import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr] gap-4">
        <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block">
          <UserMenu />
        </div>
        <div
          className="bg-gray-100 p-4 border-l-2"
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

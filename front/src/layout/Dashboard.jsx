import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto p-3 lg:grid-cols-[250px, 1fr]">
        <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block">
          <UserMenu />
        </div>
        <div
          className="bg-gray-100 border-1-2"
          style={{
            borderImage: "linear-gradient(to bottom, #4f46e5, #3b82f6)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

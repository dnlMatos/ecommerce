import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const AdminPermision = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <p className="text-lg font-bold text-red-700">Usuário sem permissão</p>
      )}
    </>
  );
};

export default AdminPermision;

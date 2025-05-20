import React, { useState } from "react";
import { userSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEditar from "../components/UserProfileAvatarEditar";

const Profile = () => {
  const user = userSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="w-20 h-20 bg-green-200 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegUserCircle />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm font-bold min-w-20 border border-red-500 hover:border-green-600 hover:bg-yellow-600 px-3 py-1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 hover:gradient-to-r hover:from-yellow-600 hover:via-orange-500 hover:to-red-600"
      >
        Editar
      </button>
      {openProfileEdit && (
        <UserProfileAvatarEditar
          close={() => setOpenProfileAvatarEdit(false)}
        />
      )}
      <form action="" className="my-4">
        <div className="grid">
          <label htmlFor="">Nome</label>
          <input
            type="text"
            id="name"
            placeholder={"Digite seu nome"}
            className="py-2 bg-gray-200 outline-none border focus-with:border-red-800 rounded hover:border-red-600"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Email</label>
          <input
            type="text"
            id="email"
            placeholder={"Digite seu email"}
            className="py-2 bg-gray-200 outline-none border focus-with:border-red-800 rounded hover:border-red-600"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Telefone</label>
          <input
            type="text"
            id="mobile"
            placeholder={"Digite seu nome"}
            className="py-2 bg-gray-200 outline-none border focus-with:border-red-800 rounded hover:border-red-600"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { userSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEditar from "../components/UserProfileAvatarEditar";

const Profile = () => {
  const user = userSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [openProfileEdit, setOpenProfileEdit] = React.useState(false);
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
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserProfileAvatarEditar = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    const formData = newFormData();
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-green-600 max-w-sm w-full rounded p-4 flex-col items-center justify-center">
        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full overflow-hideden drop-shadow-sm">
          {user.avatar ? (
            <img alt={user.name} src={user.avatar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile   ">
            <div className="text-sm font-bold min-w-20 border border-red-500 hover:border-green-600 hover:bg-yellow-600 px-3 py-1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 hover:gradient-to-r hover:from-yellow-600 hover:via-orange-500 hover:to-red-600">
              {loading ? "Carregando..." : "Upload"}
            </div>
          </label>
          <input
            type="file"
            id="uploadProfile"
            className="hidden"
            onChange={handleUploadAvatarImage}
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEditar;

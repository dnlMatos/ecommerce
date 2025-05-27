import React, { useState } from "react";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import uploadImage from "../utils/uploadImage";
import { IoClose } from "react-icons/io5";

export const EditCategory = ({ close, fetchData, editData }) => {
  const [data, setData] = useState({
    _id: editData._id,
    name: editData.name,
    image: editData.image,
  });
  const [loading, setLoading] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLoading(true);

    const response = await uploadImage(file);
    const { data: responseData } = response;
    setLoading(false);

    setData((prev) => ({
      ...prev,
      image: responseData.data.url,
    }));
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Atualizar categoria</h1>
          <button onClick={() => close()} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="my-3 grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="" id="categoryName">
              Nome
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Nome da categoria"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>

          <div className="grid gap-1">
            <p>Foto</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">Sem foto</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <button
                  type="button"
                  disabled={!data.name}
                  className={`min-w-20 ${
                    !data.name
                      ? "bg-gray-900 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
                  }`}
                  onClick={() =>
                    document.getElementById("uploadCategoryImage").click()
                  }
                >
                  Carregar foto
                </button>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!(data.name && data.image)}
            className={`min-w-20 ${
              !(data.name && data.image)
                ? "bg-gray-900 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer"
            }`}
          >
            Atualizar categoria
          </button>
        </form>
      </div>
    </section>
  );
};

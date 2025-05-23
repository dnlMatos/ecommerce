import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { toast } from "react-hot-toast";
import uploadImage from "../utils/uploadImage";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    image: " ",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.addCategory, data: data });
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

    if (file) {
      return;
    }
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  return (
    <section className="top-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center">
      <div className="bg-white mas-w-41 w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Categoria</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>
        <form action="" className="my-3 grid gap-2" onClick={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName">Nome</label>
            <input
              type="text"
              name="name"
              id="categoryName"
              className="bg-blue-50 p-2 border outline-blue-100 focus-within:border-primary-200 outline-none"
              placeholder="Nome da categoria"
              value={data.name}
              onChange={handleOnChange}
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
                <div
                  className={`${
                    !data.name
                      ? "text-sm font-bold text-white min-w-20 border border-red-600 hover:border-green-600 hover:bg-yellow-600 px3 py1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:via-orange-500 hover:to-red-600"
                      : "bg-gradient-to-r from bg-green-500 to-yellow-500 rounded-full"
                  }px-4 py-2 rounded cursor-pointer border font-medium`}
                >
                  Carregar foto
                </div>
                <input
                  disable={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            className={`${
              data.name && data.image
                ? "bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"
                : "bg-gradient-to-r from-green-500 to-yellow-600 rounded-full"
            }py-2 font-semibold`}
          >
            Adicionar categoria
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;

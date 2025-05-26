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
    image: "", // Corrigido: valor inicial string vazia
  });

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
    if (!file) return;
    try {
      const response = await uploadImage(file);
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.url
      ) {
        setData((prev) => ({
          ...prev,
          image: response.data.data.url,
        }));
      } else {
        toast.error("Erro ao fazer upload da imagem.");
      }
    } catch (error) {
      toast.error("Erro ao fazer upload da imagem.", error);
    }
  };

  return (
    <section className="top-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center">
      <div className="bg-white w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Categoria</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>
        <form action="" className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName">Nome</label>
            <input
              type="text"
              name="name"
              id="categoryName"
              className="bg-blue-50 p-2 border outline-blue-100 focus-within:border-primary-200 outline-none rounded"
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
            Adicionar categoria
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;

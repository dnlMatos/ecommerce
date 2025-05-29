import React, { useState } from "react";
import { useSelector } from "react-redux";
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data.id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) close();
        if (fetchData) fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-5xl w-full p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Editar subcategoria</h1>
          <button onClick={() => close()} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmitSubCategory} className="my-3 grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              placeholder="Nome da subcategoria"
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>

          <div className="grid gap-1">
            <p>Foto</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {subCategoryData.image ? (
                  <img
                    alt="subcategory"
                    src={subCategoryData.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">Sem foto</p>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <button
                  disabled={!subCategoryData.name}
                  className={`min-w-20 ${
                    !subCategoryData.name
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
                  disabled={!subCategoryData.name}
                  onChange={handleUploadSubCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="">Selecione a categoria</label>
            <div className="border focus-within:border-primary-200 rounded">
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat, index) => {
                  return (
                    <p
                      key={cat._id + "selectedValue"}
                      className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                    >
                      {cat.name}
                      <div
                        className="cursor-pointer hover:test-red-600"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </p>
                  );
                })}
              </div>

              <select
                name=""
                id=""
                className="w-full p-2 bg-transparent outline-none border"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );

                  subCategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.categoy, categoryDetails],
                    };
                  });
                }}
              >
                <option value={""}>Selecione a categoria</option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category._id + "aubcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!(subCategoryData.name && subCategoryData.image)}
            className={`min-w-20 ${
              !(
                subCategoryData.name &&
                subCategoryData.image &&
                subCategoryData.category[0]
              )
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

export default EditSubCategory;

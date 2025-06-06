import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uploadImage from "../utils/uploadImage";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const UploadSubCategoryModel = ({ fetchData, closeModal, data }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data?._id || "",
    name: data?.name || "",
    image: data?.image || "",
    category: data?.category || [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleClose = () => {
    setOpen(!open);
    closeModal();
  };

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
    try {
      const response = await uploadImage(file);
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.url
      ) {
        setSubCategoryData((prev) => ({
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
      setLoading(true);
      const response = await Axios(
        {
          ...SummaryApi.createSubCategory,
          data: subCategoryData,
        },
        console.log(data)
      );
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchData();
      }
      setOpen(!open);
      closeModal();
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setSubCategoryData({
        _id: data._id || "",
        name: data.name || "",
        image: data.image || "",
        category: data.category || [],
      });
    }
  }, [data]);

  return (
    <section className="top-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center">
      <Dialog
        open={open}
        onClick={closeModal}
        onClose={setOpen}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="block">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Cadastro Subcategoria
                    </DialogTitle>
                    <div className="mt-2">
                      <form
                        action=""
                        className="my-3 grid gap-2"
                        onSubmit={handleSubmitSubCategory}
                      >
                        <div className="grid gap-1">
                          <label id="categoryName">Nome</label>
                          <input
                            name="name"
                            id="name"
                            className="bg-blue-50 p-2 border outline-blue-100 focus-within:border-primary-200 outline-none rounded"
                            placeholder="Nome da categoria"
                            value={subCategoryData.name}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="grid gap-1">
                          <p>Foto</p>
                          <div className="flex gap-4 flex-col sm:flex-row lg:flex-row items-center">
                            <div className="border bg-blue-50 h-36 w-36 lg:w-36 flex items-center justify-center rounded">
                              {subCategoryData.image ? (
                                <img
                                  alt="subcategory"
                                  src={subCategoryData.image}
                                  className="w-full h-full object-scale-down"
                                />
                              ) : (
                                <p className="text-sm text-neutral-500">
                                  Sem foto
                                </p>
                              )}
                            </div>
                            <label htmlFor="uploadSubCategoryImage">
                              <button
                                type="button"
                                disabled={!subCategoryData.name}
                                className={`min-w-20 ${
                                  !subCategoryData.name
                                    ? "bg-gray-900 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
                                }`}
                                onClick={() =>
                                  document
                                    .getElementById("uploadSubCategoryImage")
                                    .click()
                                }
                              >
                                Carregar foto
                              </button>
                              <input
                                disabled={!subCategoryData.name}
                                onChange={handleUploadSubCategoryImage}
                                type="file"
                                id="uploadSubCategoryImage"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        {/* <div className="grid gap-1">
                          <label id="categoryName">Selecione a categoria</label>
                          <div className="border focus-whithin:border-primary-200 rounded">
                            <div className="flex flex-wrap gap-2"></div>
                          </div>
                          {allCategory.map((cat, index) => {
                            return (
                              <p
                                key={cat._id + "selectedValue"}
                                className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                              >
                                {cat.name}
                                <div
                                  className="cursor-pointer hover:text-red-600"
                                  onClick={() =>
                                    handleRemoveCategorySelected(cat._id)
                                  }
                                ></div>
                              </p>
                            );
                          })}
                        </div> */}

                        <div className="grid gap-1">
                          <label id="categoryName">Selecione a categoria</label>
                          <select
                            multiple
                            className="border rounded w-full focus:border-primary-200"
                            value={subCategoryData.category.map(
                              (cat) => cat._id
                            )}
                            onChange={(e) => {
                              const selectedOptions = Array.from(
                                e.target.selectedOptions
                              ).map((option) => option.value);
                              // Mapeia os _id selecionados para os objetos de categoria completos
                              const selectedCategories = allCategory.filter(
                                (cat) => selectedOptions.includes(cat._id)
                              );
                              setSubCategoryData((prev) => ({
                                ...prev,
                                category: selectedCategories,
                              }));
                            }}
                          >
                            {allCategory.map((cat) => (
                              <option
                                key={cat._id}
                                value={cat._id}
                                className="hover:bg-[#155dfc] hover:text-white p-1 rounded"
                              >
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex justify-around mt-3">
                          <button
                            className="bg-yellow-200 hover:bg-yellow-300 text-yellow-700 py-2 px-4 rounded cursor-pointer"
                            onClick={handleClose}
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={
                              !(
                                subCategoryData.name &&
                                subCategoryData.image &&
                                subCategoryData.category.length > 0
                              )
                            }
                            className={`min-w-20 ${
                              !(
                                subCategoryData.name &&
                                subCategoryData.image &&
                                subCategoryData.category.length > 0
                              )
                                ? "bg-gray-900 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
                                : "bg-green-200 hover:bg-green-300 text-green-700 py-2 px-4 rounded cursor-pointer"
                            }`}
                          >
                            Cadastrarrrrrrrrrrr
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default UploadSubCategoryModel;

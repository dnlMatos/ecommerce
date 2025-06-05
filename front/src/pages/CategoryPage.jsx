import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Loading } from "../components/Loading";
import { EditCategory } from "../components/EditCategory";
import { ConfirmBox } from "../components/ConfirmBox";
import NoData from "../components/NoData";
import FadeLoader from "react-spinners/FadeLoader";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      setLoadingData(true);
      const response = await Axios({ ...SummaryApi.getCategory });
      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
      setLoadingData(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="">
      <div className="p-2 bg-white shadow-md flex items-center justify-between rounded">
        <h2 className="font-semibold">Categoria</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm font-bold text-white min-w-20 border border-red-600 hover:border-green-600 hover:bg-yellow-600 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow cursor-pointer"
        >
          Adicionar Categoria
        </button>
      </div>
      {loadingData ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <FadeLoader size={250} />
        </div>
      ) : (
        <>
          {!categoryData[0] && !loading && <NoData />}

          <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {categoryData.map((category) => {
              return (
                <div
                  className="w-32 h-56 rounded shadow-md flex flex-col"
                  key={category._id}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-t-md"
                  />

                  <div className="flex justify-center mt-2">
                    <span className="text-sm font-semibold text-center">
                      {category.name}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setEditData(category);
                      }}
                      className="flex-1 bg-green-200 hover:bg-green-300 text-green-700 font-medium py-1 rounded cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setOpenConfirmBoxDelete(true);
                        setDeleteCategory(category);
                      }}
                      className="flex-1 bg-red-200 hover:bg-red-300 text-red-700 font-medium py-1 rounded cursor-pointer"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {loading && <Loading />}
          {openUploadCategory && (
            <UploadCategoryModel
              fetchData={fetchCategory}
              close={() => setOpenUploadCategory(false)}
            />
          )}
          {openEdit && (
            <EditCategory
              editData={editData}
              close={() => {
                setOpenEdit(false);
              }}
              fetchData={fetchCategory}
            />
          )}
          {openConfirmBoxDelete && (
            <ConfirmBox
              close={() => setOpenConfirmBoxDelete(false)}
              cancel={() => setOpenConfirmBoxDelete(false)}
              confirm={handleDeleteCategory}
            />
          )}
        </>
      )}
    </section>
  );
};

export default CategoryPage;

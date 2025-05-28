import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubCategory = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  return (
    <section className="category-page">
      <div className="p-2 bg-white shadow-md flex items-center justify-between rounded">
        <h2 className="font-semibold">Subcategoria</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm font-bold text-white min-w-20 border border-red-600 hover:border-green-600 hover:bg-yellow-600 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow cursor-pointer"
        >
          Adicionar Subcategoria
        </button>
      </div>
      {openAddSubCategory && (
        <UploadSubCategoryModel
          fetchData={() => {}}
          onClick={() => setOpenAddSubCategory(false)}
        />
      )}
    </section>
  );
};

export default SubCategory;

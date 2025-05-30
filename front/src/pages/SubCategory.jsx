import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import EditSubCategory from "../components/EditSubCategory";

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [ImageURL, setImageURL] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ _id: "" });

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

  const column = [
    columnHelper.accessor("name", { header: "Nome" }),
    columnHelper.accessor("image", {
      header: "Foto",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-10 h-10 cursor-pointer"
              onClick={() => {
                setImageURL(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Categoria",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + "table"}
                  className="shadow-md px-1 inline-block"
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex itemns-center justify-center gap-3">
            <button
              onClick={() => {
                setOpenEdit(true);
                setEditData(row.original);
              }}
              className="p-2 bg-green-500 rounded hover:text-white"
            >
              <HiPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteConfirmBox(true);
                setDeleteSubCategory(row.original);
              }}
              className="p-2 bg-red-100 rounded text-red-500 hover:text-red-600"
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

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

      <div>
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          fetchData={fetchSubCategory}
          closeModal={() => setOpenAddSubCategory(false)}
        />
      )}

      {ImageURL && <ViewImage url={ImageURL} close={() => setImageURL("")} />}
      {openEdit && (
        <EditSubCategory
          fetchData={fetchSubCategory}
          data={editData}
          close={() => setOpenEdit(false)}
        />
      )}
    </section>
  );
};

export default SubCategory;

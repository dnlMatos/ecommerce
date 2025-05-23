import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between rounded">
        <h2 className="font-semibold">Categoriaaa</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm font-bold text-white min-w-20 border border-red-600 hover:border-green-600 hover:bg-yellow-600 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow cursor-pointer"
        >
          Adicionar Categoria
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div className="w-32 h-56 rounded shadow-md">
          <img className="w-full object-scale-down" />
          <div className="items-center h-9 flex gap-2">
            <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded">
              Editar
            </button>
            <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded">
              Deletar
            </button>
          </div>
        </div>
      </div>
      {openUploadCategory && (
        <UploadCategoryModel close={() => setOpenUploadCategory(false)} />
      )}
    </section>
  );
};

export default CategoryPage;

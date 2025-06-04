import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { AddFieldComponent } from "../components/AddFieldComponent";
import successAlert from "../utils/SuccessAlert";
import ViewImage from "../components/ViewImage";
import uploadImage from "../utils/UploadImage";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Loading } from "../components/Loading";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageUrl] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;
    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Carregar produtos</h2>
      </div>

      <div className="grid p-3">
        <form action="" className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Informe o produto"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none bortder focus-within:border-primary-200 rounded border"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Descrição
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Informe a descrição do produto"
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>

          <div>
            <p className="font-medium">Foto</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 border rounded flex justify-center items-center cursos-pointer"
              >
                <div className="text-center flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <div className="gap-2 cursor-pointer flex justify-center flex-column items-center">
                      <FaCloudUploadAlt size={35} />
                      <p>Carregar foto</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  accept="image/"
                  onChange={handleUploadImage}
                />
              </label>

              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div
                      className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                      key={index}
                    >
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageUrl(img)}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 m-1 bg-red-500 hover:bg-red-600 cursor-pointer rounded text-white group-hover-pointer"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="categories" className="font-medium">
              Categorias
            </label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value="">Selecione uma categoria</option>
                {allCategory.map((c, index) => {
                  return (
                    <option key={index} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>

              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="subcategory" className="font-medium">
              Sub categoria
            </label>
            <div>
              <select
                className="bg-blue border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value
                  );

                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value="" className="text-neutral-600">
                  Selecione a sub categoria
                </option>
                {allSubCategory.map((c, index) => {
                  return (
                    <option key={index} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>

              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                      key={c._id + index + "productsection"}
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
              Unidade
            </label>
            <input
              type="text"
              id="unit"
              placeholder="Digite a unidade"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primay-200 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              Quantidade em estoque
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Digite a quantidade em estoque"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primay-200 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              Quantidade em estoque
            </label>
            <input
              id="price"
              type="number"
              placeholder="Informe a quantidade em estoque"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primay-200 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              Descontos
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Digite o valor de desconto"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primay-200 rounded"
            />
          </div>

          {Object.keys(data?.more_details)?.map((k, index) => {
            return (
              <div className="grid gap-1" key={index}>
                <label htmlFor={k} className="font-medium">
                  {k}
                </label>
                <input
                  type="text"
                  id={k}
                  value={data?.more_details[k]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((prev) => {
                      return {
                        ...prev,
                        more_details: {
                          ...prev.more_details,
                          [k]: value,
                        },
                      };
                    });
                  }}
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primay-200 rounded"
                  required
                />
              </div>
            );
          })}

          <div
            onClick={() => setOpenAddField(true)}
            className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200"
          >
            Adicionar campo
          </div>

          <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold">
            Cadastrar
          </button>
        </form>
      </div>

      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageUrl("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;

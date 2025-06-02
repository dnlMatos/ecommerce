import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

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
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
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
    data.image.splice(index, a);
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
              className="bg-blue-50 p-2 outline-none bortder focus-within:border-primary-200 rounded"
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
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Carregar foto</p>
                      </>
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
                      <div className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group">
                        <img
                          src={img}
                          alt={img}
                          className="w-full h-full object-scale-down cursor-pointer"
                          onClick={()=>setViewImageUrl(img)}
                        />
                        <div className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover-pointer"onClick={()=>handleDeleteImage(index)}>
                          <MDelete/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>




          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadProduct;

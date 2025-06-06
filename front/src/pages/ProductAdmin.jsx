import React, { useCallback, useEffect, useState } from "react";
import { SummaryApi } from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) setProductData.data;
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);
  return <div>Product</div>;
};

export default ProductAdmin;

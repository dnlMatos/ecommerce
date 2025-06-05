import React, { useEffect, useState, useCallback } from "react";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

export const Product = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProductData = useCallback(async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) setProductData.data;
    } catch (error) {
      AxiosToastError(error);
    }
  }, [page]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);
  return <div>Product</div>;
};

import React, { useEffect } from "react";
import SummaryApi from "../../common/SummaryApi";
import Axios from "../../utils/Axios";

const Products = () => {
  const fetchProducts = async (page = 1, limit = 10) => {
    try {
      const response = await Axios({
        ...SummaryApi.PRODUCT.GET_ALL,
        data: {
          page: page,
          limit: limit,
        },
      });
      console.log(response);
      //  if(response.data.success){
      //     dispatch(setProducts(response.data.data))
      //  }
    } catch (e) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return <div></div>;
};

export default Products;

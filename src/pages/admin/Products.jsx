import React, { useEffect, useState } from "react";
import SummaryApi from "../../common/SummaryApi";
import Axios from "../../utils/Axios";
import AxiosToast from "../../utils/AxiosToast";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import ProductAdminCard from "../../components/ProductAdminCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchProducts = async (page = 1, limit = 12) => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.PRODUCT.GET_ALL,
        data: {
          page: page,
          limit: limit,
        },
      });
      console.log(response);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (e) {
      AxiosToast("error", e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="relative h-full">
      <PageHeader heading={"Products"}></PageHeader>
      {loading && <Loading />}
      <div className="p-4 mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.length > 0 &&
            products.map((product) => {
              return <ProductAdminCard product={product} key={product._id} />;
            })}
        </div>
      </div>
      <div className="flex justify-center item-center absolute bottom-0 right-[50%] shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded h-10 min-w-20">
        <div className="flex gap-2 text-gray-600 items-center p-2">
          <button>
            <FaArrowLeft size={20} />
          </button>
          <span>
            {page} of {totalPage}{" "}
          </span>
          <button>
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import SummaryApi from "../../common/SummaryApi";
import Axios from "../../utils/Axios";
import AxiosToast from "../../utils/AxiosToast";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import ProductAdminCard from "../../components/ProductAdminCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import InputField from "../../components/InputField";
import { FaSearch } from "react-icons/fa";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [query, setQuery] = useState("");
  const limit = 6;

  const fetchProducts = async () => {
    try {
      if (products.length === 0) {
        setLoading(true);
      }

      const response = await Axios({
        ...SummaryApi.PRODUCT.GET_ALL,
        data: {
          page: page,
          limit: limit,
          search: query,
        },
      });
      console.log("response", response);
      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPage(response.data.totalNoPages);
      }
    } catch (e) {
      AxiosToast("error", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePreviosPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      setTimeout(() => {
        setPage(1);
      }, 500);
    } else {
      setTimeout(() => {
        fetchProducts();
      }, 500);
    }
    return () => clearTimeout();
  }, [query]);

  return (
    <section className="h-full">
      <PageHeader heading={"Products"}>
        <InputField
          icon={<FaSearch />}
          placeholder={"Search..."}
          onChange={(e) => setQuery(e.target.value)}
        />
      </PageHeader>
      {loading && <Loading />}
      <div className="flex justify-between h-[92%] flex-col">
        <div className="p-4 mt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.length > 0 &&
              products.map((product) => {
                return <ProductAdminCard product={product} key={product._id} />;
              })}
          </div>
        </div>
        <div className="flex justify-center item-center shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded h-10 min-w-20 max-w-40 mb-6">
          <div className="flex gap-2 text-gray-600 items-center p-2">
            <button onClick={handlePreviosPage}>
              <FaArrowLeft size={20} />
            </button>
            <span>
              {page} of {totalPage}
            </span>
            <button onClick={handleNextPage}>
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

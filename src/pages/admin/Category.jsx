import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import AddCategory from "../../components/AddCategory";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import EditCategory from "../../components/EditCategory";
import ConfirmBox from "../../components/ConfirmBox";
import AxiosToast from "../../utils/AxiosToast";
import { removeCategory, selectCategories } from "../../store/categorySlice";
import { useDispatch } from "react-redux";

const Category = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [editCategory, setEditCategory] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState({});
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [deleteCategoryData, setDeleteCategoryData] = useState({ _id: "" });

  const dispatch = useDispatch();
  const category = selectCategories() || [];

  // const fetchCategeory = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await Axios({
  //       ...SummaryApi.getCategory,
  //     });
  //     const { data: responseData } = response;
  //     if (responseData.success) {
  //       setCategoryData(responseData.data);

  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    console.log(category);
    setLoading(false);
  }, [category]);

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategoryData,
      });

      if (response.data.success) {
        AxiosToast(response, "success");
        dispatch(removeCategory(deleteCategoryData));
      }
    } catch (error) {
      AxiosToast(error, "error");
    } finally {
      setDeleteCategory(false);
    }
  };
  return (
    <section>
      <PageHeader heading={"Category"}>
        <button
          className="text-sm border border-primary-200 hover:bg-primary-200 py-1 px-3 rounded"
          onClick={() => setShowAddCategory(true)}
        >
          Add Category
        </button>
      </PageHeader>
      {!category[0] && !loading && <NoData />}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {category.map((category, index) => {
          return (
            <div
              className=" w-32 h-56 group rounded shadow-custom "
              key={category._id}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full"
              />
              <div className="flex items-center justify-between h-9 gap-2 px-2">
                <button
                  onClick={() => {
                    setEditCategory(true);
                    setEditCategoryData(category);
                  }}
                  className="flex-1 bg-green-100 text-green-600 font-medium rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteCategory(true);
                    setDeleteCategoryData({ _id: category._id });
                  }}
                  className="flex-1 bg-red-100 text-red-600 font-medium rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}
      {showAddCategory && (
        <AddCategory
          // fetchData={fetchCategeory}
          close={() => setShowAddCategory(false)}
        />
      )}
      {editCategory && (
        <EditCategory
          categoryData={editCategoryData}
          close={() => setEditCategory(false)}
          // fetchData={fetchCategeory}
        />
      )}
      {deleteCategory && (
        <ConfirmBox
          close={() => setDeleteCategory(false)}
          confirm={handleDelete}
          data={deleteCategoryData}
        />
      )}
    </section>
  );
};

export default Category;

import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import AddSubCategory from "../../components/AddSubCategory";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import AxiosToast from "../../utils/AxiosToast";
import DisplayTable from "../../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../../components/ViewImage";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import EditSubCategory from "../../components/EditSubCategory";
import { useDispatch } from "react-redux";
import {
  setSelectedSubCategory,
  selectSubCategories,
  setSubCategories,
  removeSubCategory,
} from "../../store/subCategorySlice";
import ConfirmBox from "../../components/ConfirmBox";

const SubCategory = () => {
  const [showAddSubCategory, setShowAddSubCategory] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });
  const [showDeleteConfirmBox, setShowDeleteConfirmBox] = useState(false);
  const data = selectSubCategories() || [];
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageUrl, setImageUrl] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = (row) => {
    dispatch(setSelectedSubCategory(row.original));
    setOpenEdit(true);
  };

  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center ">
            <img
              alt={""}
              src={row.original.image}
              className="w-8 h-8 cursor-pointer"
              onClick={() => setImageUrl(row.original.image)}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return row.original.category.map((c) => c.name).join(",");
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleEdit(row)}
              className="p-2 bg-green-100 rounded-full hover:text-green-600"
            >
              <LuPencil size={20} />
            </button>
            <button
              onClick={() => {
                setDeleteSubCategory({ _id: row.original._id });
                setShowDeleteConfirmBox(true);
              }}
              className="p-2 bg-red-100 rounded-full hover:text-red-600"
            >
              <MdOutlineDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleDeleteSubCategory = async () => {
    setShowDeleteConfirmBox(false);
    try {
      const response = await Axios({
        ...SummaryApi.SUB_CATEGORY.DELETE,
        data: deleteSubCategory,
      });
      if (response.status) {
        dispatch(removeSubCategory(deleteSubCategory))
        AxiosToast(response, "success");
        // fetchSubCategory();
      }
    } catch (error) {
      AxiosToast(error, "error");
    }
  };
  return (
    <section>
      <PageHeader heading={"Sub-Category"}>
        <button
          className="text-sm border border-primary-200 hover:bg-primary-200 py-1 px-3 rounded"
          onClick={() => setShowAddSubCategory(true)}
        >
          Add Sub-Category
        </button>
      </PageHeader>

      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable data={data} columns={columns} />
      </div>

      {imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl("")} />}

      {/* popup */}
      {showAddSubCategory && (
        <AddSubCategory
          // fetchData={fetchCategory}
          close={() => setShowAddSubCategory(false)}
        />
      )}

      {openEdit && <EditSubCategory close={() => setOpenEdit(false)} />}
      {showDeleteConfirmBox && (
        <ConfirmBox
          close={() => setShowDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;

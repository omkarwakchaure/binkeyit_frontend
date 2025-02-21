import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  subCategories: [],
  selectedSubCategory: {},
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
    updateSubCategory: (state, action) => {
      const index = state.subCategories.findIndex(
        (subCategory) => subCategory._id === action.payload._id
      );
      if (index !== -1) {
        state.subCategories[index] = action.payload;
      }
    },
    upsertSubcategory: (state, action) => {
      state.subCategories = [action.payload, ...state.subCategories];
    },
    removeSubCategory: (state, action) => {
      state.subCategories = state.subCategories.filter(
        (subCategory) => subCategory._id !== action.payload._id
      );
    },
  },
});

export const {
  setSubCategories,
  setSelectedSubCategory,
  updateSubCategory,
  upsertSubcategory,
  removeSubCategory
} = subCategorySlice.actions;
export const selectSubCategories = () =>
  useSelector((state) => state.subCategory.subCategories);

export const selectSelectedSubCategory = () =>
  useSelector((state) => state.subCategory.selectedSubCategory);
export default subCategorySlice.reducer;

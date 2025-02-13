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
  },
});

export const { setSubCategories, setSelectedSubCategory, updateSubCategory } =
  subCategorySlice.actions;
export const selectSubCategories = () =>
  useSelector((state) => state.subCategory.subCategories);

export const selectSelectedSubCategory = () =>
  useSelector((state) => state.subCategory.selectedSubCategory);
export default subCategorySlice.reducer;

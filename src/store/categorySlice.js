import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  categories: [],
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    addCategory: (state, action) => {
      state.categories = [action.payload, ...state.categories];
    },
    updateCategory: (state, action) => {
      state.categories = state.categories.map((category) => {
        if (category._id === action.payload._id) {
          return action.payload;
        }
        return category;
      });
    },
   

    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
    },
  },
});

export const { setCategories, addCategory, updateCategory, removeCategory } =
  CategorySlice.actions;

export const selectCategories = () =>
  useSelector((state) => state.category.categories);

export default CategorySlice.reducer;

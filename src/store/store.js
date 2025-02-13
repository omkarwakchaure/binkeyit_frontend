import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import subCategoryReducer from "./subCategorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
  },
});

export default store;

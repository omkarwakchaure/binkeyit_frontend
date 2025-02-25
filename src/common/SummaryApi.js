export const baseURL = "http://localhost:3001/.netlify/functions/api/";
const SummaryApi = {
  register: {
    url: "user/register",
    method: "post",
  },
  login: {
    url: "user/login",
    method: "post",
  },
  forgotPassword: {
    url: "user/forgot-password",
    method: "put",
  },
  verifyOTP: {
    url: "user/verify-forgot-password-otp",
    method: "post",
  },
  resetPassword: {
    url: "user/reset-password",
    method: "post",
  },
  refreshToken: {
    url: "user/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "user/user-details",
    method: "get",
  },
  logout: {
    url: "user/logout",
    method: "get",
  },
  uploadProfile: {
    url: "user/upload-avatar",
    method: "put",
  },
  updateUserDetails: {
    url: "user/update-user",
    method: "put",
  },
  addCategory: {
    url: "category/add-category",
    method: "post",
  },
  uploadImage: {
    url: "file/upload-image",
    method: "post",
  },
  getCategory: {
    url: "category/get-category",
    method: "get",
  },
  updateCategory: {
    url: "category/update-category",
    method: "put",
  },
  deleteCategory: {
    url: "category/delete-category",
    method: "delete",
  },

  //subcategory endpoints start
  SUB_CATEGORY: {
    ADD: { url: "subCategory/add-sub-category", method: "post" },
    GET: { url: "subCategory/get-sub-category", method: "get" },
    UPDATE: {
      url: "subcategory/update-sub-category",
      method: "put",
    },
    DELETE: {
      url: "subCategory/delete-sub-category",
      method: "delete",
    }
  },
  //subcategory endpoints end

  //product endpoints start
  PRODUCT: {
    ADD: { url: "product/add-product", method: "POST" },
    GET_ALL: { url: "product/get-all-product", method: "POST" },
    UPDATE: { url: "product/update-product", method: "put" },
    DELETE: { url: "product/delete-product", method: "delete" },
  },
  //product endpoints end
};

export default SummaryApi;

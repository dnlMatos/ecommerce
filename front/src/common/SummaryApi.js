// import { userDetails } from "../../../backend/controllers/user.controller";

export const baseURL = "http://localhost:8080";

export const SummaryApi = {
  login: {
    url: `/api/user/login`,
    method: "POST",
  },

  register: {
    url: `/api/user/register`,
    method: "POST",
  },

  forgotPassword: {
    url: `/api/user/forgot-password`,
    method: "PUT",
  },

  forgot_password_otp_verification: {
    url: `/api/user/verify-forgot-password-otp`,
    method: "PUT",
  },

  refreshToken: {
    url: `/api/user/refresh-token`,
    method: "POST",
  },

  userDetails: {
    url: `/api/user/user-details`,
    method: "GET",
  },

  resetPassword: {
    url: `/api/user/reset-password`,
    method: "PUT",
  },

  logout: {
    url: `/api/user/logout`,
    method: "GET",
  },

  uploadAvatar: {
    url: `/api/user/upload-avatar`,
    method: "PUT",
  },

  uploadProfile: {
    url: `/api/user/upload-user`,
    method: "PUT",
  },

  updateUserDetails: {
    url: `/api/user/update-user`,
    method: "PUT",
  },

  addCategory: {
    url: `/api/category/add-category`,
    method: "POST",
  },

  uploadImage: {
    url: `/api/file/upload`,
    method: "POST",
  },

  getCategory: {
    url: `/api/category/get`,
    method: "GET",
  },

  uploadCategory: {
    url: `/api/category/update`,
    method: "PUT",
  },

  deleteCategory: {
    url: `/api/category/delete`,
    method: "DELETE",
  },

  createSubCategory: {
    url: `/api/subcategory/create`,
    method: "POST",
  },

  getSubCategory: {
    url: `/api/subcategory/get`,
    method: "GET",
  },
};

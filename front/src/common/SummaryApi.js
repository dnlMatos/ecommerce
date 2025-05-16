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
};

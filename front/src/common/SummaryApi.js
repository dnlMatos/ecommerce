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
};

import axios from "axios";
import type { AddNote, Notes } from "../types/notes";

axios.defaults.baseURL = "https://localhost:7001/api/";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const methods = {
  get: <TResponse>(url: string) =>
    axios.get<TResponse>(url).then((response) => response.data),
  post: <TRequest, TResponse>(url: string, body: TRequest) =>
    axios.post<TResponse>(url, body).then((response) => response.data),
  put: <TRequest, TResponse>(url: string, body: TRequest) =>
    axios.post<TResponse>(url, body).then((response) => response.data),
  delete: <TResponse>(url: string) =>
    axios.get<TResponse>(url).then((response) => response.data),
};

const notes = {
  list: () => methods.get<{ notes: Notes[] }>("notes"),
  details: (id: string) => methods.get<Notes>(`notes/${id}`),
  add: (note: AddNote) => methods.post<AddNote, Notes>("notes", note),
};

const requests = {
  notes,
};

export default requests;

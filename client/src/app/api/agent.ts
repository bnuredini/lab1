import axios, { AxiosResponse } from "axios";
import { Test } from "../models/test";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Tests = {
  list: () => requests.get<Test[]>("/tests"),
  details: (id: string) => requests.get<Test>(`/tests/${id}`),
  create: (test: Test) => axios.post<void>("/tests", test),
  update: (test: Test) => axios.put<void>(`/tests/${test.id}`, test),
  delete: (id: string) => axios.delete<void>(`/tests/${id}`),
};

const agent = {
  Tests,
};

export default agent;

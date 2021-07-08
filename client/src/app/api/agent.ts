import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Country } from "../models/country";
import { Patient } from "../models/patient";
import { Test } from "../models/test";
import { Vaccine } from "../models/vaccine";
import { history } from "../../index";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { PublicCenter } from "../models/publicCenter";
import { PrivateCenter } from "../models/privateCenter";
import { Variation } from "../models/variation";
import { ChronicDisease } from "../models/chronicDisease";
import { Article } from "../models/article";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const error in data.errors) {
            if (data.errors[error]) {
              modalStateErrors.push(data.errors[error]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

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

const Countries = {
  list: () => requests.get<Country[]>("/countries"),
  details: (id: string) => requests.get<Country>(`/countries/${id}`),
  create: (country: Country) => axios.post<void>("/countries", country),
  update: (country: Country) =>
    axios.put<void>(`/countries/${country.id}`, test),
  delete: (id: string) => axios.delete<void>(`/countries/${id}`),
};

const Patients = {
  list: () => requests.get<Patient[]>("/patients"),
  details: (id: string) => requests.get<Patient>(`/patients/${id}`),
  create: (patient: Patient) => axios.post<void>("/patients", patient),
  update: (patient: Patient) =>
    axios.put<void>(`/patients/${patient.id}`, patient),
  delete: (id: string) => axios.delete<void>(`/patients/${id}`),
};

const Account = {
  currnet: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const Vaccines = {
  list: () => requests.get<Vaccine[]>("/vaccines"),
  details: (id: string) => requests.get<Vaccine>(`/vaccines/${id}`),
  create: (vaccine: Vaccine) => axios.post<void>("/vaccines", vaccine),
  update: (vaccine: Vaccine) =>
    axios.put<void>(`/vaccines/${vaccine.id}`, vaccine),
  delete: (id: string) => axios.delete<void>(`/vaccines/${id}`),
};

const PublicCenters = {
  list: () => requests.get<PublicCenter[]>("/publicCenter"),
  details: (id: string) => requests.get<PublicCenter>(`/publicCenter/${id}`),
  create: (publicCenter: PublicCenter) => axios.post<void>("/publicCenter", publicCenter),
  update: (publicCenter: PublicCenter) =>
    axios.put<void>(`/publicCenter/${publicCenter.id}`, publicCenter),
  delete: (id: string) => axios.delete<void>(`/publicCenter/${id}`),
};

const PrivateCenters = {
  list: () => requests.get<PrivateCenter[]>("/privateCenter"),
  details: (id: string) => requests.get<PrivateCenter>(`/privateCenter/${id}`),
  create: (privateCenter: PrivateCenter) => axios.post<void>("/privateCenter", privateCenter),
  update: (privateCenter: PrivateCenter) =>
    axios.put<void>(`/privateCenter/${privateCenter.id}`, privateCenter),
  delete: (id: string) => axios.delete<void>(`/privateCenter/${id}`),
};

const Variations = {
  list: () => requests.get<Variation[]>("/variations"),
  details: (id: string) => requests.get<Variation>(`/variations/${id}`),
  create: (variation: Variation) => axios.post<void>("/variations", variation),
  update: (variation: Variation) =>
    axios.put<void>(`/variations/${variation.id}`, variation),
  delete: (id: string) => axios.delete<void>(`/variations/${id}`),
};

const ChronicDiseases = {
  list: () => requests.get<ChronicDisease[]>("/chronicDiseases"),
  details: (id: string) => requests.get<ChronicDisease>(`/chronicDiseases/${id}`),
  create: (chronicDisease: ChronicDisease) => axios.post<void>("/chronicDiseases", chronicDisease),
  update: (chronicDisease: ChronicDisease) =>
    axios.put<void>(`/chronicDiseases/${chronicDisease.id}`, chronicDisease),
  delete: (id: string) => axios.delete<void>(`/chronicDiseases/${id}`),
};

import { Article } from "../models/article";

const agent = {
  Tests,
  Countries,
  Patients,
  Account,
  Vaccines,
  PublicCenters,
  PrivateCenters,
  Variations,
  ChronicDiseases,
  Articles,
};

export default agent;

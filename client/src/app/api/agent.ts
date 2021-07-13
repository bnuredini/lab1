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
import { Drug } from "../models/drug";
import { Treatment } from "../models/treatment";
import { VaccineApplication } from "../models/vaccineApplication";
import { Allergy } from "../models/allergy";
import { CovidRestriction } from "../models/covidRestriction";
import { Doctor } from "../models/doctor";
import { Location } from "../models/location";

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

const Articles = {
  list: () => requests.get<Article[]>('/articles'),
  details: (id: string) => requests.get<Article>(`/articles/${id}`),
  create: (article: Article) => requests.post<void>('/articles', article),
  update: (article: Article) => requests.put<void>(`/articles/${article.id}`, article),
  delete: (id: string) => requests.del<void>(`/articles/${id}`)
}
const Drugs = {
  list: () => requests.get<Drug[]>("/drugs"),
  details: (id: string) => requests.get<Drug>(`/drugs/${id}`),
  create: (drug: Drug) => axios.post<void>("/drugs", drug),
  update: (drug: Drug) =>
    axios.put<void>(`/drugs/${drug.id}`, drug),
  delete: (id: string) => axios.delete<void>(`/drugs/${id}`),
};
const Treatments = {
  list: () => requests.get<Treatment[]>("/treatment"),
  details: (id: string) => requests.get<Treatment>(`/treatment/${id}`),
  create: (treatment: Treatment) => axios.post<void>("/treatment", treatment),
  update: (treatment: Treatment) =>
    axios.put<void>(`/treatment/${treatment.id}`, treatment),
  delete: (id: string) => axios.delete<void>(`/treatment/${id}`),
};

const VaccineApplications = {
  list: () => requests.get<VaccineApplication[]>("/vaccineapplications"),
  details: (id: string) => requests.get<VaccineApplication>(`/vaccineapplications/${id}`),
  create: (vaccineApplication: VaccineApplication) => axios.post<void>("/vaccineapplications", vaccineApplication),
  update: (vaccineApplication: VaccineApplication) =>
    axios.put<void>(`/vaccineapplications/${vaccineApplication.id}`, vaccineApplication),
  delete: (id: string) => axios.delete<void>(`/vaccineapplications/${id}`),
};
const Allergies = {
  list: () => requests.get<Allergy[]>("/allergies"),
  details: (id: string) => requests.get<Allergy>(`/allergies/${id}`),
  create: (allergy: Allergy) => axios.post<void>("/allergies", allergy),
  update: (allergy: Allergy) =>
    axios.put<void>(`/allergies/${allergy.id}`, allergy),
  delete: (id: string) => axios.delete<void>(`/allergies/${id}`),
};

const CovidRestrictions = {
  list: () => requests.get<CovidRestriction[]>("/covidrestrictions"),
  details: (id: string) => requests.get<CovidRestriction>(`/covidrestrictions/${id}`),
  create: (covidRestriction: CovidRestriction) => axios.post<void>("/covidrestrictions", covidRestriction),
  update: (covidRestriction: CovidRestriction) =>
    axios.put<void>(`/covidrestrictions/${covidRestriction.id}`, covidRestriction),
  delete: (id: string) => axios.delete<void>(`/covidrestrictions/${id}`),
};

const Doctors = {
  list: () => requests.get<Doctor[]>("/doctors"),
  details: (id: string) => requests.get<Doctor>(`/doctors/${id}`),
  create: (doctor: Doctor) => axios.post<void>("/doctors", doctor),
  update: (doctor: Doctor) =>
    axios.put<void>(`/doctors/${doctor.id}`, doctor),
  delete: (id: string) => axios.delete<void>(`/doctors/${id}`),
};

const Locations = {
  list: () => requests.get<Location[]>("/doctors"),
  details: (id: string) => requests.get<Location>(`/doctors/${id}`),
  create: (location: Location) => axios.post<void>("/doctors", location),
  update: (location: Location) =>
    axios.put<void>(`/doctors/${location.id}`, location),
  delete: (id: string) => axios.delete<void>(`/doctors/${id}`),
};

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
  Drugs,
  Treatments,
  VaccineApplications,
  Allergies,
  CovidRestrictions,
  Doctors,
  Locations,
};

export default agent;

import axios, {
  type AxiosHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export type RequestConfig<TData = unknown> = {
  url?: string;
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
  params?: object;
  data?: TData | FormData;
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";
  signal?: AbortSignal;
  headers?: HeadersInit;
};

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
};

export type ResponseErrorConfig<TError = unknown> = TError;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY || "accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const client = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.data,
      responseType: config.responseType as AxiosRequestConfig["responseType"],
      signal: config.signal,
      headers: config.headers as AxiosHeaders,
    };

    const response: AxiosResponse<TData> = await api(axiosConfig);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

export default client;

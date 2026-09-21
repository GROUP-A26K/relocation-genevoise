import axios from 'axios';
import { isNil } from 'lodash-es';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type TRequestParams = Record<
  string,
  string | number | boolean | undefined
>;

const axiosInstance = axios.create({
  headers: { Accept: 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.params) {
    config.params = Object.fromEntries(
      Object.entries(config.params as TRequestParams).filter(
        ([, value]) => !isNil(value) && value !== ''
      )
    );
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      const data: unknown = error.response.data;
      const code =
        typeof data === 'object' && !isNil(data) && 'code' in data
          ? data.code
          : undefined;

      throw new ApiError(
        `Request failed with status ${error.response.status}`,
        error.response.status,
        typeof code === 'string' ? code : undefined
      );
    }

    throw error;
  }
);

export async function get<T>(
  path: string,
  params: TRequestParams,
  signal?: AbortSignal
): Promise<T> {
  const { data } = await axiosInstance.get<T>(path, { params, signal });

  return data;
}

export async function post<T>(
  path: string,
  body: unknown,
  params?: TRequestParams,
  signal?: AbortSignal
): Promise<T> {
  const { data } = await axiosInstance.post<T>(path, body, { params, signal });

  return data;
}

export default axiosInstance;

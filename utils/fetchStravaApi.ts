import { captureException } from '@/utils/captureException';

interface ResponseWithMaybeData<T> extends Response {
  data?: T;
}

export const fetchStravaApi = async <T>({
  endpoint,
  method = 'GET',
  body,
  access_token,
}: {
  endpoint: string;
  method?: RequestInit['method'];
  body?: unknown;
  access_token?: string;
}) => {
  const tryFetch = () =>
    fetch(endpoint, {
      method,
      ...(body ? { body: JSON.stringify(body) } : {}),
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });

  const response: ResponseWithMaybeData<T> = await tryFetch();

  const json: T = await response.json();

  if (response.ok) {
    return json;
  } else if (response.status === 401) {
    captureException('Access token expired');
  } else {
    response.data = json;
    throw new ApiError<T>(response);
  }
};

export class ApiError<T> extends Error {
  public readonly url: string;
  public readonly status: number;
  public readonly statusText: string;
  public readonly body: T | undefined;

  constructor(response: ResponseWithMaybeData<T>) {
    super(`${response.status} ${response.statusText}`);

    this.name = 'ApiError';
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.data;
  }
}

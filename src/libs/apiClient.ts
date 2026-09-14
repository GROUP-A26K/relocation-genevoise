export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function getJson<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined>,
  signal?: AbortSignal
): Promise<T> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '')
      searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  const response = await fetch(`${path}${query ? `?${query}` : ''}`, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

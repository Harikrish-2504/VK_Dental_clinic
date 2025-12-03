// utils/apiClient.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {},
  includeAuth: boolean = true
) => {
  const token = includeAuth ? localStorage.getItem("token") : null;
  const isFormData = options.body instanceof FormData;
  const headers: HeadersInit = {
    ...(includeAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }), // ✅ ONLY add for JSON
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "API Error");
  }

  return json;
};

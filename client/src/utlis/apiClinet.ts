// utils/apiClient.ts
const BASE_URL = "http://localhost:5000/api";

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {},
  includeAuth: boolean = true
) => {
  const token = includeAuth ? localStorage.getItem("token") : null;
  const isFormData = options.body instanceof FormData;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(includeAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }), // ✅ skip for FormData
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

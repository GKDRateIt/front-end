export interface ApiResponse<T> {
  status: string;
  detail: string;
  data: T | null;
  totalCount: number | null;
  offset: number | null;
  limit: number | null;
}

export const apiPrefix = import.meta.env.DEV ? "http://localhost:8080" : "";

export const emailSuffix = "@mails.ucas.ac.cn";

export const addEmailSuffix = (name: string): string => {
  if (name.endsWith(emailSuffix)) {
    return name;
  } else {
    return name + emailSuffix;
  }
};

export async function submitForm(
  url: string,
  params: any,
  method: "get" | "post" = "post"
) {
  const data = new URLSearchParams();
  for (const key in params) {
    if (!Object.hasOwn(params, key)) {
      continue;
    }
    data.append(key, params[key]);
  }

  return fetch(url, {
    method: method,
    body: data,
  });
}

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

interface IFormPostData {
  url: string;
  body: any;
  method?: "get" | "post";
}

export async function submitForm({
  url,
  body,
  method = "post",
}: IFormPostData) {
  const data = new URLSearchParams();
  for (const key in body) {
    if (!Object.hasOwn(body, key)) {
      continue;
    }
    data.append(key, body[key]);
  }

  return fetch(url, {
    method: method,
    body: data,
  });
}

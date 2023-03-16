import { UserApi } from "./user";

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
  withPermInfo?: boolean;
}

export function setReqAction(
  body: any,
  action: "create" | "read" | "update" | "delete"
): any {
  body._action = action;
  return body;
}

export async function submitForm({
  url,
  body,
  method = "post",
  withPermInfo = true,
}: IFormPostData) {
  console.log(`Querying ${url}`);
  const data = new URLSearchParams();
  for (const key in body) {
    if (!Object.hasOwn(body, key)) {
      continue;
    }
    data.append(key, body[key]);
  }
  const headers: any = {};
  if (withPermInfo) {
    const jwt = UserApi.getStoredJwtStr();
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  return fetch(url, {
    method: method,
    headers: headers,
    body: data,
  });
}

export interface ApiResponse<T> {
  status: string;
  detail: string;
  data: T | null;
  totalCount: number | null;
  offset: number | null;
  limit: number | null;
}

export const apiPrefix =
  import.meta.env.MODE == "development" ? "http://localhost:8080" : "";

export const emailSuffix = "@mails.ucas.ac.cn";

export const addEmailSuffix = (name: string): string => {
  if (name.endsWith(emailSuffix)) {
    return name;
  } else {
    return name + emailSuffix;
  }
};

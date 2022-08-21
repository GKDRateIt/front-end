export interface ApiResponse<T> {
  status: string;
  detail: string;
  data: T | null | undefined;
}

export const apiPrefix =
  import.meta.env.MODE == "development" ? "http://localhost:8080" : "";

export const emailPostfix = "@ucas.mails.ac.cn";

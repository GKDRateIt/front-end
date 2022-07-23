export type Semester = "春季学期" | "秋季学期" | "夏季学期";
export type CourseCategory =
  | "公共必修课"
  | "公共选修课"
  | "专业必修课"
  | "专业选修课";
export interface CourseAttribute {
  id: string;
  name: string;
  teacher: string;
  credit: number;
  semester: Semester;
  category: CourseCategory;
}

export interface ApiResponse<T> {
  status: string;
  detail: string;
  data: T | null | undefined;
}

// String hash function
export function strHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}

interface ApiQuery {
  _action: "create" | "update" | "delete" | "read";
}

export interface UserRegisterQuery extends ApiQuery {
  // _action: "create" | "update" | "delete" | "read";
  email: string;
  hashedPassword: string;
  nickname: string;
  startYear: string;
  group: string;
}

export interface UserLoginQuery {
  email: string;
  hashedPassword: string;
}

const apiPrefix =
  import.meta.env.MODE == "development" ? "http://localhost:8080" : "";

export class UserApi {
  // Post [UserQuery] to `${apiPrefix}/api/user`
  public static async createUser(
    reqBody: UserRegisterQuery
  ): Promise<ApiResponse<String>> {
    const response = await fetch(`${apiPrefix}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    return response.json();
  }

  // Login with [UserLoginQuery] from `${apiPrefix}/api/login` with basic http auth
  public static async login(
    query: UserLoginQuery
  ): Promise<ApiResponse<String>> {
    const response = await fetch(`${apiPrefix}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${query.email}:${query.hashedPassword}`
        )}`,
      },
    });
    return response.json();
  }
}

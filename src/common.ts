export interface CourseModel {
  courseId: number;
  code: string;
  codeSeq: string | null;
  name: string;
  teacherId: number;
  semester: string;
  credit: number;
  degree: number;
}

export interface ReviewModel {
  reviewId: number;
  courseId: number;
  userId: number;
  createTime: string;
  lastUpdateTime: string;
  overallRecommendation: number;
  quality: number;
  difficulty: number;
  workload: number;
  commentText: string;
  myGrade: string | null;
  myMayjor: number | null;
}

export interface TeacherModel {
  teacherId: number;
  name: string;
  email: string;
}

export interface UserModel {
  userId: number;
  email: string;
  nickname: string;
  startYear: string;
  group: string;
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

// interface ApiQuery {
//   _action: "create" | "update" | "delete" | "read";
// }

export interface UserRegisterQuery {
  email: string;
  verificationCode: string;
  hashedPassword: string;
  nickname: string;
  startYear: string;
  group: string;
}

export interface UserLoginQuery {
  email: string;
  hashedPassword: string;
}

export interface ReviewCreateQuery {
  courseId: string;
  email: string;
  createTime: string;
  lastUpdateTime: string;
  overallRecommendation: string;
  quality: string;
  difficulty: string;
  workload: string;
  commentText: string;
}

export interface CourseReadQuery {
  courseId: string | null;
  code: string | null;
  seq: string | null;
  name: string | null;
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
      body: JSON.stringify({
        _action: "create",
        email: reqBody.email,
        hashedPassword: reqBody.hashedPassword,
        nickname: reqBody.nickname,
        startYear: reqBody.startYear,
        verificationCode: reqBody.verificationCode,
        group: reqBody.group,
      }),
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

  // Post id to `${apiPrefix}/api/user`
  public static async getUserById(userId: number): Promise<UserModel | null> {
    const body = {
      _action: "read",
      userId: userId.toString(),
    };
    const responseBody = await fetch(`${apiPrefix}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = (await responseBody.json()) as ApiResponse<UserModel[]>;
    if (import.meta.env.MODE == "development") {
      console.log(response);
    }
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      return null;
    }
  }

  // Post email to `${apiPrefix}/api/email-verification`
  public static async createVerification(
    email: string
  ): Promise<ApiResponse<String>> {
    const body = {
      _action: "create",
      email: email,
    };
    const responseBody = await fetch(`${apiPrefix}/api/email-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = (await responseBody.json()) as ApiResponse<String>;
    if (import.meta.env.MODE == "development") {
      console.log(response);
    }
    return response;
  }
}

export class CourseApi {
  // post to `${apiPrefix}/api/course`.
  public static async getCourse(
    req: CourseReadQuery
  ): Promise<CourseModel | null> {
    const mp = new Map();
    mp.set("_action", "read");
    if (req.courseId) {
      mp.set("courseId", req.courseId);
    }
    if (req.code) {
      mp.set("code", req.code);
    }
    if (req.seq) {
      mp.set("seq", req.seq);
    }
    if (req.name) {
      mp.set("name", req.name);
    }
    const responseBody = await fetch(`${apiPrefix}/api/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(mp)),
    });
    const response = (await responseBody.json()) as ApiResponse<CourseModel[]>;
    if (import.meta.env.MODE == "development") {
      console.log(response);
    }
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      return null;
    }
  }
}

export class ReviewApi {
  // post to `${apiPrefix}/api/review`.
  public static async getReviewsByCourseId(
    courseId: number
  ): Promise<ReviewModel[]> {
    const responseBody = await fetch(`${apiPrefix}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _action: "read", courseId: courseId.toString() }),
    });
    const response = (await responseBody.json()) as ApiResponse<ReviewModel[]>;
    if (import.meta.env.MODE == "development") {
      console.log(response);
    }
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  }

  // post to `${apiPrefix}/api/review` to create new reivew.
  public static async createReview(
    query: ReviewCreateQuery
  ): Promise<ApiResponse<string>> {
    const body = {
      _action: "create",
      courseId: query.courseId.toString(),
      email: query.email.toString(),
      createTime: Date.parse(query.createTime.toString()).toString(),
      lastUpdateTime: Date.parse(query.lastUpdateTime.toString()).toString(),
      overallRecommendation: query.overallRecommendation.toString(),
      quality: query.quality.toString(),
      difficulty: query.difficulty.toString(),
      workload: query.workload.toString(),
      commentText: query.commentText.toString(),
    };
    if (import.meta.env.MODE == "development") {
      console.log(body);
    }
    const responseBody = await fetch(`${apiPrefix}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = (await responseBody.json()) as ApiResponse<string>;
    if (import.meta.env.MODE == "development") {
      console.log(response);
    }
    return response;
  }
}

export class TeacherApi {
  // post to `${apiPrefix}/api/teacher`.
  public static async getTeacher(
    teacherId: number
  ): Promise<TeacherModel | null> {
    const responseBody = await fetch(`${apiPrefix}/api/teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _action: "read",
        teacherId: teacherId.toString(),
      }),
    });
    const response = (await responseBody.json()) as ApiResponse<TeacherModel[]>;
    if (import.meta.env.MODE == "development") {
      console.log(response);
    }
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      return null;
    }
  }
}

export const decodeJwt = (token: string | null): any | null => {
  if (token == null) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
};

export const isLoggedInRaw = (): boolean => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    return true;
  }
  return false;
};

export const getLoggedInUserEmail = (): string | null => {
  const jwt = decodeJwt(localStorage.getItem("jwt"));
  if (jwt == null) {
    return null;
  }
  return jwt["email"];
};

import { ApiResponse, apiPrefix } from "./common";

export interface UserModel {
  userId: number;
  email: string;
  nickname: string;
  startYear: string;
  group: string;
}

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
    if (import.meta.env.DEV) {
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
    if (import.meta.env.DEV) {
      console.log(response);
    }
    return response;
  }

  public static decodeJwt = (token: string | null): any | null => {
    if (token == null) {
      return null;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  };

  public static isLoggedIn = (): boolean => {
    const jwt = this.decodeJwt(localStorage.getItem("jwt"));
    if (jwt) {
      const notExpired = new Date(jwt["exp"] * 1000) >= new Date();
      return notExpired;
    }
    return false;
  };

  public static getLoggedInUserEmail = (): string | null => {
    const jwt = this.decodeJwt(localStorage.getItem("jwt"));
    if (jwt == null) {
      return null;
    }
    return jwt["email"];
  };
}

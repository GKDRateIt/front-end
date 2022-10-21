import { ApiResponse, apiPrefix } from "./common";

export interface TeacherModel {
  teacherId: number;
  name: string;
  email: string;
}

export class TeacherReadQuery {
  teacherId?: number | null = null;
  name?: string | null = null;
  email?: string | null = null;
}

export class TeacherApi {
  // post to `${apiPrefix}/api/teacher`.
  public static async getTeacherById(
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
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      return null;
    }
  }

  public static async getTeacher(
    query: TeacherReadQuery
  ): Promise<TeacherModel[]> {
    if (query.email == null && query.name == null && query.teacherId == null) {
      return [];
    }
    const mp = new Map();
    mp.set("_action", "read");
    if (query.teacherId) {
      mp.set("teacherId", query.teacherId.toString());
    }
    if (query.name) {
      mp.set("name", query.name);
    }
    if (query.email) {
      mp.set("email", query.email);
    }
    const responseBody = await fetch(`${apiPrefix}/api/teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(mp)),
    });
    const response = (await responseBody.json()) as ApiResponse<TeacherModel[]>;
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  }
}

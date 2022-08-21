import { ApiResponse, apiPrefix } from "./common";

export interface TeacherModel {
  teacherId: number;
  name: string;
  email: string;
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

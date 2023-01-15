import { ApiResponse, apiPrefix, submitForm, setReqAction } from "./common";

export interface TeacherModel {
  teacherId: number;
  name: string;
  email: string;
}

export interface TeacherReadQuery {
  teacherId?: number;
  name?: string;
  email?: string;
}

export class TeacherApi {
  // post to `${apiPrefix}/api/teacher`.
  public static async getTeacherById(
    teacherId: number
  ): Promise<TeacherModel | null> {
    const response = await this.getTeacher({ teacherId });
    if (response && response.length > 0) {
      return response[0];
    } else {
      return null;
    }
  }

  public static async getTeacher(
    query: TeacherReadQuery
  ): Promise<TeacherModel[]> {
    if (!query.email && !query.name && !query.teacherId) {
      return [];
    }
    const responseBody = await submitForm({
      url: `${apiPrefix}/api/teacher`,
      body: setReqAction(query, "read"),
    });
    const response = (await responseBody.json()) as ApiResponse<TeacherModel[]>;
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  }
}

import { apiPrefix, ApiResponse, setReqAction, submitForm } from "./common";

export interface CourseModel {
  courseId: number;
  code: string;
  codeSeq?: string;
  name: string;
  teacherId: number;
  semester: string;
  credit: number;
  degree: number;
  category: string;
}

export interface CourseReadQuery {
  courseId?: number;
  code?: string;
  codeSeq?: string;
  name?: string;
  teacherName?: string;
}

export interface CourseCreateQuery {
  name: string;
  code: string;
  codeSeq?: string | null;
  teacherId: number;
  semester: string;
  credit: number;
  degree: number;
  category: string;
}

export class CourseApi {
  // post to `${apiPrefix}/api/course`.
  public static async getCourses(req: CourseReadQuery): Promise<CourseModel[]> {
    const responseBody = await submitForm({
      url: `${apiPrefix}/api/course`,
      body: setReqAction(req, "read"),
    });
    const response = (await responseBody.json()) as ApiResponse<CourseModel[]>;
    if (!response.status.toLowerCase().includes("success")) {
      throw new Error(response.status);
    }
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  }

  // post to `${apiPrefix}/api/course`.
  public static async getCourse(
    req: CourseReadQuery
  ): Promise<CourseModel | null> {
    const response = await this.getCourses(req);
    if (response.length > 0) {
      return response[0];
    } else {
      return null;
    }
  }

  public static async createCourse(req: CourseCreateQuery): Promise<String> {
    const responseBody = await submitForm({
      url: `${apiPrefix}/api/course`,
      body: setReqAction(req, "create"),
    });
    const response = (await responseBody.json()) as ApiResponse<String>;
    return response.data ? response.data : "";
  }

  public static getMainCourseCode(course: CourseModel) {
    if (course === null) {
      return "";
    }
    return course.code;
  }

  public static getFullCourseCode(course: CourseModel | null | undefined) {
    if (!course) {
      return "";
    }
    let answer = course.code;
    if (course.codeSeq) {
      answer += "-";
      answer += course.codeSeq;
    }
    return answer;
  }
}

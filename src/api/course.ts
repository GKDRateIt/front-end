import { ApiResponse, apiPrefix } from "./common";

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

export class CourseReadQuery {
  courseId?: string | null = null;
  code?: string | null = null;
  seq?: string | null = null;
  name?: string | null = null;
  teacherName?: string | null = null;
}

export class CourseApi {
  // post to `${apiPrefix}/api/course`.
  public static async getCourses(req: CourseReadQuery): Promise<CourseModel[]> {
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
    if (req.teacherName) {
      mp.set("teacherName", req.teacherName);
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
    if (import.meta.env.MODE == "development") {
      console.log(response);
    }
    if (response.length > 0) {
      return response[0];
    } else {
      return null;
    }
  }

  public static getFullCourseCode(course: CourseModel) {
    if (course === null) {
      return "";
    }
    var ans = course.code;
    if (course.codeSeq) {
      ans += "-";
      ans += course.codeSeq;
    }
    return ans;
  }
}

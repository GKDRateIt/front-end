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

export interface CourseReadQuery {
  courseId: string | null;
  code: string | null;
  seq: string | null;
  name: string | null;
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

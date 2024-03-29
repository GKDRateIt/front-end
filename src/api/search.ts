// import { TeacherApi, TeacherModel } from "./teacher";
import { CourseApi, CourseModel } from "./course";

export class SearchApi {
  public static async search(keyword: string): Promise<CourseModel[]> {
    const courses: CourseModel[] = [];

    const courseRes = await CourseApi.getCourses({
      courseId: null,
      code: keyword,
      seq: null,
      name: keyword,
      teacherName: keyword,
    });

    courseRes?.forEach((course) => courses.push(course));

    return courses;
  }
}

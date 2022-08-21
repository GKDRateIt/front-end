import { CourseModel, TeacherModel } from "./data-model";
import { CourseApi } from "./course";

export class SearchApi {
  public static async search(
    keyword: string
  ): Promise<[CourseModel[], TeacherModel[]]> {
    const courses: CourseModel[] = [];
    const teachers: TeacherModel[] = [];

    const courseRes = await CourseApi.getCourses({
      courseId: null,
      code: keyword,
      seq: null,
      name: keyword,
    });

    courseRes.forEach((course) => courses.push(course));

    return [courses, teachers];
  }
}

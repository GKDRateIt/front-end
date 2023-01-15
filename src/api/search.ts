// import { TeacherApi, TeacherModel } from "./teacher";
import { CourseApi, CourseModel } from "./course";

export class SearchApi {
  public static async search(keyword: string): Promise<CourseModel[]> {
    const courses: CourseModel[] = [];

    // TODO: replace with a better impl.

    (
      await CourseApi.getCourses({
        name: keyword,
      })
    ).forEach((course) => {
      courses.push(course);
    });
    (
      await CourseApi.getCourses({
        teacherName: keyword,
      })
    ).forEach((course) => {
      courses.push(course);
    });
    (
      await CourseApi.getCourses({
        code: keyword,
      })
    ).forEach((course) => {
      courses.push(course);
    });

    return courses;
  }
}

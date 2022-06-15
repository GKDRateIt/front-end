/* eslint-disable no-unused-vars */
type Semester = "春季学期" | "秋季学期" | "夏季学期";
type CourseCategory = "公共必修课" | "公共选修课" | "专业必修课" | "专业选修课";
interface CourseAttribute {
  id: string;
  name: string;
  teacher: string;
  grade: number;
  semester: Semester;
  category: CourseCategory;
}
export { Semester, CourseCategory, CourseAttribute };

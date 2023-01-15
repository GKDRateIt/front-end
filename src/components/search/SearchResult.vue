<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CourseApi, CourseModel } from "../../api/course";
import { SearchApi } from "../../api/search";
import { TeacherApi, TeacherModel } from "../../api/teacher";
import { formatSemester, useWindowInfo } from "../../util";
import { uniqBy } from "lodash";

const router = useRouter();
const route = useRoute();

const keyword = route.query.keyword
  ? decodeURIComponent(String(route.query.keyword))
  : undefined;

const windowInfo = useWindowInfo();

const courseTeacherMap: Ref<Map<Number, TeacherModel>> = ref(new Map());

const groupedCourses: Ref<Map<string, CourseModel[]>> = ref(new Map());

if (keyword) {
  SearchApi.search(keyword).then((rCourses) => {
    rCourses.forEach((course) => {
      if (!groupedCourses.value.has(course.code)) {
        groupedCourses.value.set(course.code, []);
      }
      groupedCourses.value.get(course.code)?.push(course);
      TeacherApi.getTeacherById(course.teacherId).then((teacher) => {
        if (teacher) {
          courseTeacherMap.value.set(course.courseId, teacher);
        }
      });
    });
  });
}

const jumpToCoursePage = (courseCode: string) => {
  router.push(`/course?code=${courseCode}`);
};

interface ConcatQuery {
  strArr: string[];
  sep?: string;
  lFence?: string;
  rFence?: string;
  noFenceIfSingle?: boolean;
}

const concatStr = ({
  strArr,
  sep = ", ",
  lFence = "",
  rFence = "",
  noFenceIfSingle = true,
}: ConcatQuery): string => {
  if (strArr.length == 0) {
    return "";
  }
  let realLFence = noFenceIfSingle && strArr.length == 1 ? "" : lFence;
  let realRFence = noFenceIfSingle && strArr.length == 1 ? "" : rFence;
  let res = `${realLFence}${strArr[0]}`;
  for (let i = 1; i < strArr.length; ++i) {
    res += `${sep}${strArr[i]}`;
  }
  res += realRFence;
  return res;
};

const unique = (strArr: string[]): string[] => {
  return uniqBy(strArr, (it) => it);
};
</script>

<template>
  <div
    class="m-auto"
    :class="{
      'max-w-[900px]': !windowInfo.isNarrow,
      'w-11/12': windowInfo.isNarrow,
    }"
  >
    <div class="h-10"></div>
    <div v-for="[courseCode, courses] in groupedCourses" :key="courseCode">
      <div
        class="space-y-5 bg-gray-100 mb-5 rounded-lg cursor-pointer"
        @click="jumpToCoursePage(courseCode)"
      >
        <div class="pl-10 pr-10 pt-5 pb-5">
          <div
            :class="{
              'text-3xl': !windowInfo.isNarrow,
              'text-xl': windowInfo.isNarrow,
            }"
          >
            {{ courses[0].name }}
            ({{
              concatStr({
                strArr: unique(
                  courses.map((course) => {
                    return CourseApi.getFullCourseCode(course);
                  })
                ),
                sep: "/",
              })
            }})
          </div>
          <div
            class="leading-1 rounded-md mt-3"
            :class="{
              'flex space-x-2 text-lg': !windowInfo.isNarrow,
              'flex-col space-y-1 text-md': windowInfo.isNarrow,
            }"
          >
            <div class="flex space-x-2">
              <div>主讲老师：</div>
              <div>
                {{
                  concatStr({
                    strArr: unique(
                      courses
                        .filter((course) => {
                          return courseTeacherMap.has(course.courseId);
                        })
                        .map((course) => {
                          return courseTeacherMap.get(course.courseId)!!.name;
                        })
                    ),
                  })
                }}
              </div>
            </div>
            <div v-if="!windowInfo.isNarrow">|</div>
            <div class="flex space-x-2">
              <div>学分：</div>
              <div>
                {{
                  concatStr({
                    strArr: unique(
                      courses.map((course) => {
                        return course.credit.toString();
                      })
                    ),
                    sep: "/",
                  })
                }}
              </div>
            </div>
            <div v-if="!windowInfo.isNarrow">|</div>
            <div class="flex space-x-2">
              <div>开课学期：</div>
              <div>
                {{
                  concatStr({
                    strArr: unique(
                      courses.map((course) => {
                        return formatSemester(course.semester);
                      })
                    ),
                    sep: "/",
                  })
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="groupedCourses.size == 0">无搜索结果</div>
  </div>
</template>

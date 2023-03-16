<script setup lang="ts">
import { ref } from "vue";
import { NInput, NSelect } from "naive-ui";
import { TeacherApi } from "../../api/teacher";
import { CourseApi } from "../../api/course";
import { useMessage } from "naive-ui";

const message = useMessage();

const courseName = ref("");
const courseCode = ref("");
const courseTeacher = ref("");
const courseSemester = ref("");
const courseCategory = ref("");
const courseCredit = ref("");

const submitRaw = async () => {
  const name = courseName.value;
  const sepPos = courseCode.value.search("-");
  const code = courseCode.value.substring(
    0,
    sepPos == -1 ? courseCode.value.length : sepPos
  );
  const codeSeq = sepPos == -1 ? null : courseCode.value.substring(sepPos + 1);
  console.log(`|||${courseTeacher.value}|||`);
  const teacherId = (
    await TeacherApi.getTeacher({
      name: courseTeacher.value,
    })
  )?.teacherId;
  if (teacherId == null) {
    message.error("不存在该教师！");
    return;
  }
  let semester = courseSemester.value;
  if (
    semester.includes("autumn") ||
    semester.includes("fall") ||
    semester.includes("秋")
  ) {
    semester = "autumn";
  } else if (semester.includes("spring") || semester.includes("春")) {
    semester = "spring";
  }
  const credit = Number(courseCredit.value);
  const degree = 0;
  let category = courseCategory.value;
  if (category.includes("公")) {
    category = "public";
  } else if (category.includes("专")) {
    category = "specialized";
  }
  const req = {
    name,
    code,
    codeSeq,
    teacherId,
    semester,
    credit,
    degree,
    category,
  };
  console.log(req);
  const res = await CourseApi.createCourse(req);
};

const submit = () => {
  console.log("Submitting");
  submitRaw()
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log("Error!");
      console.log(err);
    });
};

const semesterOptions = [
  { value: "autumn", label: "秋季学期" },
  { value: "spring", label: "春季学期" },
];

const categoryOptions = [
  { value: "public", label: "公选课" },
  { value: "specialized", label: "专业课" },
];
</script>

<template>
  <div class="flex-col w-[70vw] mx-auto mt-10 space-y-8">
    <div class="text-4xl">新增课程</div>
    <div class="flex-col space-y-5 w-full">
      <div class="flex space-x-0 w-5/6 m-auto h-fit">
        <div class="w-[15%] ml-0 text-lg">课程名称</div>
        <div class="w-[83%] mr-0 h-full">
          <n-input v-model:value="courseName" />
        </div>
      </div>
      <div class="flex space-x-0 w-5/6 m-auto h-fit">
        <div class="w-[15%] ml-0 text-lg">课程号</div>
        <div class="w-[83%] mr-0 h-full">
          <n-input v-model:value="courseCode" />
        </div>
      </div>
      <div class="flex space-x-0 w-5/6 m-auto h-fit">
        <div class="w-[15%] ml-0 text-lg">主讲教师</div>
        <div class="w-[83%] mr-0 h-full">
          <n-input v-model:value="courseTeacher" />
        </div>
      </div>
      <div class="flex space-x-0 w-5/6 m-auto h-fit">
        <div class="w-[15%] ml-0 text-lg">开课学期</div>
        <div class="w-[83%] mr-0 h-full">
          <n-select v-model:value="courseSemester" :options="semesterOptions" />
        </div>
      </div>
      <div class="flex space-x-0 w-5/6 m-auto h-fit">
        <div class="w-[15%] ml-0 text-lg">课程类别</div>
        <div class="w-[83%] mr-0 h-full">
          <n-select v-model:value="courseCategory" :options="categoryOptions" />
        </div>
      </div>
      <div class="flex space-x-0 w-5/6 m-auto h-fit">
        <div class="w-[15%] ml-0 text-lg">学分</div>
        <div class="w-[83%] mr-0 h-full">
          <n-input v-model:value="courseCredit" />
        </div>
      </div>
      <div class="w-fit ml-auto mr-0" @click="submit">
        <n-button size="large" class="text-lg"> 提交课程 </n-button>
      </div>
    </div>
  </div>
</template>

export const teacherPageComponent = {
    data() {
        return {
            titleCentering: {
                "text-align": "center",
                "margin": "10%",
            },
        };
    },
    template: `<h2 :style="titleCentering">这是教师页面</h2>`
}
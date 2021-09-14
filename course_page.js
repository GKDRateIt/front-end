export const coursePageComponent = {
    data() {
        return {
            titleCentering: {
                "text-align": "center",
                "margin": "10%",
            },
        };
    },
    template: `<h2 :style="titleCentering">这是课程页面</h2>`
}
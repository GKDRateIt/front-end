export const entryPageComponent = {
    data() {
        return {
            titleCentering: {
                "text-align": "center",
                "margin": "10%",
            },
        };
    },
    template: `<h2 :style="titleCentering">这是主页面</h2>`
}
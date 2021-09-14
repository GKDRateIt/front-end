const headerComponent = {
    data() {
        var navBarHeight = 4;
        return {
            navLinkContainerStyles: {
                "margin-right": "1.5rem"
            },
            navLinkStyles: {
                "float": "right",
                "margin-right": "1rem",
                "margin-top": `${navBarHeight / 2 - 1}rem`,
                "cursor": "pointer",
            },
            navBarStyles: {
                height: `${navBarHeight}rem`,
                "background-color": "#f4f4f4"
            }
        }
    },
    methods: {
        redirect(dest) {
            this.$router.push(dest)
        },
    },
    template: `<header>
                    <div :style="navBarStyles">
                        <nav :style="navLinkContainerStyles">
                            <div :style="navLinkStyles">
                                    <router-link to="/courses">搜课程</router-link>
                            </div>
                            <div  :style="navLinkStyles">
                            <router-link to="/teachers">搜老师</router-link>
                            </div>
                        </nav>
                    </div>
                </header>`
};

export const header = Vue.createApp({})
    .component("common-header", headerComponent);
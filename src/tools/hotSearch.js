export function tHotSearch(inputValue) {
    return [
        "热门搜索 1",
        "热门搜索 2",
        "热门搜索 3",
    ].map((suffix) => {
        return inputValue + " " + suffix;
    });
}
import { ref } from "vue";

class SideBar {
  collapsed = false;
}

export const sideBarWidthPx = 400;

const SideBarInst = ref(new SideBar());

export function useSideBar() {
  return SideBarInst;
}

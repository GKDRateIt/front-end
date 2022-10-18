import { ref } from "vue";

class SideBar {
  collapsed = false;
}

const SideBarInst = ref(new SideBar());

export function useSideBar() {
  return SideBarInst;
}

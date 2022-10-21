import { ref } from "vue";
import { useWindowInfo } from "../../util";
class SideBar {
  collapsed = useWindowInfo().value.isNarrow;
}

export const sideBarWidthPx = 400;

const SideBarInst = ref(new SideBar());

export function useSideBar() {
  return SideBarInst;
}

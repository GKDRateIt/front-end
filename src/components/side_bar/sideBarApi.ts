import { ref } from "vue";
import { useWindowInfo } from "../../util";
class SideBarInfo {
  collapsed = useWindowInfo().value.isNarrow;
}

export const sideBarWidthPx = 400;

const SideBarInst = ref(new SideBarInfo());

export function useSideBarInfo() {
  return SideBarInst;
}

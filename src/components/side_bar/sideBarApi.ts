import { ref } from "vue";

const SideBarInst = ref({
  collapsed: false,
});

export function useSideBar() {
  return SideBarInst;
}

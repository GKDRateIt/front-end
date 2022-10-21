import { ref, computed } from "vue";

// String hash function
export function strHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}

class WindowInfo {
  width = window.innerWidth;
  height = window.innerHeight;
  scrollY = window.scrollY;

  checkIsNarrow = () => {
    return this.width < 600;
  };

  isNarrow = this.checkIsNarrow();
}

const windowInfo = ref(new WindowInfo());

export function useWindowInfo() {
  return windowInfo;
}

interface ResponsiveStyleEntry {
  wide: string;
  narrow: string;
}

interface ResponsiveStyle {
  [key: string]: ResponsiveStyleEntry | string;
}

function wrapClassStyleEntry(entry: ResponsiveStyleEntry | string): String {
  if (typeof entry === "string" || entry instanceof String) {
    return entry;
  } else {
    return windowInfo.value.isNarrow ? entry.narrow : entry.wide;
  }
}

export const wrapStyle = (clazz: ResponsiveStyle) => {
  return computed(() => {
    const answer: any = {};
    for (const key in clazz) {
      answer[key] = wrapClassStyleEntry(clazz[key]);
    }
    return answer;
  });
};

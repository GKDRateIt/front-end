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

interface ResponsiveStyleClass {
  wide: string;
  narrow: string;
}

function wrapStyleEntry(entry: ResponsiveStyleEntry | string): String {
  if (typeof entry === "string" || entry instanceof String) {
    return entry;
  } else {
    return windowInfo.value.isNarrow ? entry.narrow : entry.wide;
  }
}

export const wrapStyle = (style: ResponsiveStyle) => {
  return computed(() => {
    const answer: any = {};
    for (const key in style) {
      answer[key] = wrapStyleEntry(style[key]);
    }
    return answer;
  });
};

export const wrapStyleClass = (clazz: ResponsiveStyleClass) => {
  return computed(() => {
    return windowInfo.value.isNarrow ? clazz.narrow : clazz.wide;
  });
};

export const formatSemester = (semester: string): string => {
  if (semester === "autumn") {
    return "秋季学期";
  } else if (semester === "spring") {
    return "春季学期";
  } else if (semester === "summer") {
    return "夏季学期";
  } else {
    return "???";
  }
};

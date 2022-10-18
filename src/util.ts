import { ref } from "vue";

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
    return this.width < 1000;
  };

  isNarrow = this.checkIsNarrow();
}

const windowInfo = ref(new WindowInfo());

export function useWindowInfo() {
  return windowInfo;
}

<script>
import { computed, defineComponent, ref } from "vue";
import { NIcon, NAutoComplete, useMessage } from "naive-ui";
import { Search48Regular } from "@vicons/fluent";

export default defineComponent({
  props: {
    flexibleDefault: Boolean,
  },
  setup(props) {
    const searchBoxValRef = ref("");
    const message = useMessage();
    return {
      submitSearch() {
        var searchStr = searchBoxValRef.value ? searchBoxValRef.value : "";
        message.info(`Submitted search for ${searchStr}`);
      },
      searchVal: searchBoxValRef,
      flexible: props.flexibleDefault,
      inputPopUp: computed(() => {
        const categories = ["老师", "课程", "帮助"];
        return categories.map((category) => {
          const items = ["可能是", "还是说"];
          return {
            type: "group",
            label: category,
            key: category,
            children: items.map((possibleItem, index) => {
              var itemStr = searchBoxValRef.value ? searchBoxValRef.value : "";
              var del = ["?"].concat(categories).concat(items);
              del.forEach((subStr) => {
                itemStr = itemStr.replace(subStr, "");
              });
              itemStr = itemStr.trim();
              if (index == 1) {
                itemStr = itemStr.split("").reverse().join("");
              }
              return possibleItem + " " + itemStr + " " + category + "?";
            }),
          };
        });
      }),
    };
  },

  data() {
    return {
      searchBoxHover: !this.flexible,
    };
  },

  methods: {
    setHover(val) {
      if (this.flexible) {
        console.log(`Search box hover changed to ${val}`);
        this.searchBoxHover = val;
      }
    },

    setFlexible(val) {
      if (this.flexibleDefault) {
        console.log(`Search box change flexible to ${val}`);
        this.flexible = val;
      }
    },

    inputFoucus() {
      console.log("FOCUS!!!");
      this.setFlexible(false);
    },

    inputBlur() {
      console.log("BLUR!!!");
      this.setFlexible(true);
    },

    inputSelect() {
      console.log("Select!!!");
      this.setFlexible(true);
      this.setHover(false);
      this.submitSearch();
    },
  },

  computed: {
    searchBoxInputWidth() {
      if (this.flexible) {
        if (this.searchBoxHover) {
          return "95%";
        } else {
          return "10%";
        }
      } else {
        return "95%";
      }
    },

    searchBoxInputOpacity() {
      if (this.searchBoxHover) {
        return 1;
      } else {
        return 0;
      }
    },
  },

  components: {
    NIcon,
    NAutoComplete,
    Search48Regular,
  },
});
</script>


<template>
  <div
    id="search-box-container"
    @mouseover="setHover(true)"
    @mouseleave="setHover(false)"
  >
    <div id="search-box-icon" @click="submitSearch">
      <n-icon size="30px" color="rgb(49, 139, 88)">
        <search-48-regular />
      </n-icon>
    </div>
    <div
      id="search-box-input"
      :style="{
        width: searchBoxInputWidth,
        opacity: searchBoxInputOpacity,
      }"
    >
      <n-auto-complete
        :options="inputPopUp"
        placeholder="搜索"
        v-model:value="searchVal"
        :on-select="inputSelect"
        :clearable="true"
        :on-focus="inputFoucus"
        :on-blur="inputBlur"
      />
    </div>
  </div>
</template>

<style>
#search-box-container {
  display: flex;
  justify-content: flex-end;
}

#search-box-icon {
  padding-right: 10px;
  cursor: pointer;
}

#search-box-input {
  transition: 0.3s;
}
</style>
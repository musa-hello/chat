<template>
  <div
    style="overflow-y:auto"
    class="scroll-wrapper chat_list scrollbar"
  >
    <div v-for="item of items">
      <IconItem
        :data="item"
        :box="box"
        @on-selected="selected"
        @on-context-menu='onItemContextMenu'
        @on-deleted="deleted"
      ></IconItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from "vue-property-decorator";

import IconItem from "@/views/common/list/IconItem.vue";
import IconItemData from "@/views/common/list/IconItemData";
import IconItemBox from "@/views/common/list/IconItemBox";

@Component({
  components: {
    IconItem
  }
})
export default class IconListPane extends Vue {
  @Prop({
    type: Array,
    required: false,
    default: () => new Array<IconItemData>()
  })
  private items!: IconItemData[];

  @Prop({
    type: IconItemBox,
    required: false,
    default: () => new IconItemBox()
  })
  private box!: IconItemBox;

  @Emit("on-item-selected")
  private selected(data: IconItemData) {
    // 选中
    return data;
  }

  @Emit("on-deleted")
  private deleted(data: IconItemData) {}

  @Emit("on-item-context-menu")
  private onItemContextMenu(data: IconItemData) {
    // 选中
  }
}
</script>

<style scoped>
</style>

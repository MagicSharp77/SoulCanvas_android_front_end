<template>
  <div class="pagination-capsule">
    <div class="capsule-segment segment-left" :class="{ disabled: disabledLeft }" @click="emit('click-left')">
      &lt;
    </div>

    <div class="capsule-segment segment-right" :class="{ disabled: disabledRight }" @click="emit('click-right')">
      &gt;
    </div>
  </div>
</template>

<script setup lang="ts">
// 可以有两种状态：禁用这个不可点击 实现丝滑点击 但是父组件的click-left click-right需要配置对应的cursor 以至于可以n-1 <-> 0 相互转换
// 如果不传 默认可以点击
// *解构和vue宏
const { disabledLeft = false, disabledRight = false } = defineProps<{
  disabledLeft?: boolean
  disabledRight?: boolean
}>()

const emit = defineEmits<{
  (e: 'click-left'): void
  (e: 'click-right'): void
}>()
</script>



<style scoped>
.pagination-capsule {
  --capsule-bg-left: #474747;
  --capsule-text-left: #ffffff;
  --capsule-border-left: #474747;
  --capsule-bg-right: #e5e5ea;
  --capsule-text-right: #1c1b1f;
  --capsule-border-right: #e5e5ea;

  display: flex;
  gap: 3px;
  cursor: pointer;
  /* 禁止用户变蓝拖拽选中 */
  user-select: none;
}

.capsule-segment {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: system-ui, sans-serif;
  font-weight: 800;
  font-size: 12px;
  line-height: 1;
  transition: all 0.2s ease;
  /* 使得宽度为20 而不是20+border */
  box-sizing: border-box;
}

.capsule-segment:hover {
  opacity: 0.8;
  /* filter: brightness(1.2);
  transform: translateY(-1px); */
}

/* .capsule-segment:active {
  transform: translateY(1px);
} */

.capsule-segment.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
  filter: grayscale(1);
}

.segment-left {
  background: var(--capsule-bg-left);
  color: var(--capsule-text-left);
  border: 1px solid var(--capsule-border-left);
  border-radius: 10px 2px 2px 10px;
}

.segment-right {
  background: var(--capsule-bg-right);
  color: var(--capsule-text-right);
  border: 1px solid var(--capsule-border-right);
  border-radius: 2px 10px 10px 2px;
}
</style>

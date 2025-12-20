<template>
  <van-tabbar route active-color="#000000" :fixed="true" :border="false" inactive-color="#4D4C4D" class="tabbar">
    <template v-for="(item, index) in tabbarOptions" :key="item.link">
      <van-tabbar-item :to="item.link" @click="handleTabClick($event)">
        <span class="tabbar-name">{{ item.name }}</span>
        <template #icon="props">
          <!-- 使用vue给的插槽变量 active -->
          <img :src="props.active ? item.actIcon : item.icon" class="tabbar-icon" />
        </template>
      </van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script setup lang="ts">
// 第一期不打包 使用vue-router
import { computed } from 'vue'

const tabbarOptions = computed(() => [
  {
    name: 'Learn',
    icon: '/static/tabbar/learn-inactive.svg',
    actIcon: '/static/tabbar/learn-active.svg',
    link: '/pages/learn/index'
  },
  {
    name: 'List',
    icon: '/static/tabbar/list-inactive.svg',
    actIcon: '/static/tabbar/list-active.svg',
    link: '/pages/list/index'
  },
  {
    name: 'Profile',
    icon: '/static/tabbar/profile-inactive.svg',
    actIcon: '/static/tabbar/profile-active.svg',
    link: '/pages/profile/index'
  }
])

const handleTabClick = (item: any) => {
  console.log('Navigating to:', item.link)
  // uni.switchTab({
  //   url: item.link
  // });
}
</script>

<style lang="scss">
:deep(.van-tabbar--fixed) {
  position: fixed !important;
}

.tabbar {
  height: 64px;
  background-color: #FFFFFF;
  border-top: 2px solid #F2EFEF;

  &-name {
    font-size: 12px;
    color: #000000;
  }

  &-icon {
    height: 24px !important;
  }
}
</style>

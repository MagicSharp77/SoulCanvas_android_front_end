<template>
  <van-tabbar v-model="active" active-color="#000000" :fixed="true" :border="false" inactive-color="#4D4C4D"
    class="tabbar">
    <template v-for="(item, index) in tabbarOptions" :key="item.link">
      <van-tabbar-item @click="handleTabClick(item, index)">
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
import { computed, ref, onMounted } from 'vue'
// import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()
// import config from '@/config/index'
// import { showToast } from 'vant'

const active = ref(0)

// Get current page path to set active tab
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const route = '/' + currentPage.route

  const index = tabbarOptions.value.findIndex(item => item.link === route)
  if (index !== -1) {
    active.value = index
  }
})

const tabbarOptions = computed(() => [
  {
    name: 'Learn',
    icon: '/static/icons/learn-inactive.svg',
    actIcon: '/static/icons/learn-active.svg',
    link: '/pages/learn/index'
  },
  {
    name: 'List',
    icon: '/static/icons/list-inactive.svg',
    actIcon: '/static/icons/list-active.svg',
    link: '/pages/list/index'
  },
  {
    name: 'Profile',
    icon: '/static/icons/profile-inactive.svg',
    actIcon: '/static/icons/profile-active.svg',
    link: '/pages/profile/index'
  }
])

const handleTabClick = (item: any, index: number) => {
  console.log('Navigating to:', item.link)
  active.value = index
  uni.switchTab({
    url: item.link
  });
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

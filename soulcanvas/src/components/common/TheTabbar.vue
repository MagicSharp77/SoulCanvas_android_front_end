<template>
  <van-tabbar route active-color="#000000" :fixed="true" :border="false" inactive-color="#4D4C4D" class="tabbar">
    <template v-for="item in tabbarOptions" :key="item.link">
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
import { computed } from 'vue'
// import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()
// import config from '@/config/index'
// import { showToast } from 'vant'
const workIcon =
  'https://bucket-zxq-file-public-prod-1.oss-cn-shenzhen.aliyuncs.com/jiangsu/static/product/work.png'
const workUp =
  'https://bucket-zxq-file-public-prod-1.oss-cn-shenzhen.aliyuncs.com/jiangsu/static/product/work_up.png'
const tabbarOptions = computed(() => [
  {
    name: '推荐',
    icon: workUp,
    actIcon: workIcon,
    link: '/home'
  },
  {
    name: '工作台',
    icon: workUp,
    actIcon: workIcon,
    link: '/workbench'
  },
  {
    name: '我的',
    icon: workUp,
    actIcon: workIcon,
    link: '/my'
  }
])

const handleTabClick = (e: MouseEvent) => {
  console.log('判断是否需要登陆', e)
  // if (!userStore.getToken) {
  //   e.preventDefault()
  //   showToast('请先登录')
  //   userStore.logout()
  // }
}
</script>

<style lang="scss">
:deep(.van-tabbar--fixed) {
  position: fixed !important;
}

.tabbar {
  height: 104px;

  &-name {
    font-size: 24px;
    color: #000000;
  }

  &-icon {
    height: 48px !important;
  }
}
</style>

<template>
    <view class="page-container">
        <!-- Placeholder content -->
        <view class="header">
            <text class="header-title">My List</text>
        </view>

        <!-- Under Development Overlay -->
        <UnderDevelopment />

        <!-- Tabbar -->
        <TheTabbar />
    </view>
</template>

<script setup>
import TheTabbar from "../../components/common/TheTabbar.vue";
import UnderDevelopment from "../../components/common/UnderDevelopment.vue";
</script>

<style scoped>
.page-container {
    position: relative;
    min-height: 50vh;
    background: #FFFFFF;
    padding: 40rpx 32rpx 120rpx;
}

.header {
    margin-bottom: 24rpx;
}

.header-title {
    display: block;
    font-size: 48rpx;
    font-weight: 700;
    color: #000000;
}
</style>

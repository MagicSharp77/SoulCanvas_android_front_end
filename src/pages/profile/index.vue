<template>
    <view class="page-container">
        <!-- Header -->
        <view class="header">
            <text class="header-title">Profile</text>
        </view>

        <!-- User Info Section -->
        <view class="user-section">
            <view class="avatar-container">
                <image class="avatar" src="https://i.pravatar.cc/300?img=12" mode="aspectFill"></image>
            </view>
            <text class="user-name">Alex</text>
            <text class="user-subtitle">English Learner</text>
        </view>

        <!-- Stats Cards -->
        <view class="stats-container">
            <view class="stat-card stat-card-purple">
                <text class="stat-value">45</text>
                <text class="stat-label">Study Days</text>
            </view>
            <view class="stat-card stat-card-pink">
                <text class="stat-value">1,250</text>
                <text class="stat-label">Words Learned</text>
            </view>
        </view>

        <!-- Menu Items -->
        <view class="menu-section">
            <view class="menu-item" @click="handleMenuClick('vocabulary')">
                <view class="menu-icon-container menu-icon-purple">
                    <text class="menu-icon">📚</text>
                </view>
                <text class="menu-text">My Vocabulary Book</text>
                <image class="menu-arrow" src="/static/icons/next.svg" mode="aspectFit"></image>
            </view>

            <view class="menu-item" @click="handleMenuClick('settings')">
                <view class="menu-icon-container menu-icon-purple">
                    <text class="menu-icon">⚙️</text>
                </view>
                <text class="menu-text">Settings</text>
                <image class="menu-arrow" src="/static/icons/next.svg" mode="aspectFit"></image>
            </view>

            <view class="menu-item" @click="handleMenuClick('help')">
                <view class="menu-icon-container menu-icon-purple">
                    <text class="menu-icon">💬</text>
                </view>
                <text class="menu-text">Help & Feedback</text>
                <image class="menu-arrow" src="/static/icons/next.svg" mode="aspectFit"></image>
            </view>
        </view>

        <!-- Tabbar -->
        <TheTabbar />
    </view>
</template>

<script setup>
import TheTabbar from "../../components/common/TheTabbar.vue";

const handleMenuClick = (type) => {
    uni.showToast({
        title: `${type} clicked`,
        icon: 'none'
    });
};
</script>

<style scoped>
.page-container {
    min-height: 100vh;
    background: #F8F8F8;
    padding: 40rpx 32rpx 120rpx;
}

/* Header */
.header {
    margin-bottom: 40rpx;
}

.header-title {
    display: block;
    font-size: 48rpx;
    font-weight: 700;
    color: #000000;
}

/* User Section */
.user-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 48rpx;
}

.avatar-container {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    padding: 8rpx;
    background: linear-gradient(135deg, #00D4AA 0%, #A855F7 50%, #EC4899 100%);
    margin-bottom: 24rpx;
}

.avatar {
    width: 144rpx;
    height: 144rpx;
    border-radius: 50%;
    border: 4rpx solid #FFFFFF;
}

.user-name {
    font-size: 40rpx;
    font-weight: 700;
    color: #000000;
    margin-bottom: 8rpx;
}

.user-subtitle {
    font-size: 28rpx;
    color: #999999;
}

/* Stats Container */
.stats-container {
    display: flex;
    gap: 24rpx;
    margin-bottom: 48rpx;
}

.stat-card {
    flex: 1;
    border-radius: 24rpx;
    padding: 32rpx 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-card-purple {
    background: linear-gradient(135deg, #E8E0FF 0%, #F3F0FF 100%);
}

.stat-card-pink {
    background: linear-gradient(135deg, #FFE8F5 0%, #FFF0F8 100%);
}

.stat-value {
    font-size: 56rpx;
    font-weight: 700;
    color: #6B5DD3;
    margin-bottom: 8rpx;
}

.stat-card-pink .stat-value {
    color: #EC4899;
}

.stat-label {
    font-size: 24rpx;
    color: #666666;
    text-align: center;
}

/* Menu Section */
.menu-section {
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 16rpx 0;
    overflow: hidden;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;
    transition: background-color 0.2s;
}

.menu-item:active {
    background-color: #F8F8F8;
}

.menu-icon-container {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
}

.menu-icon-purple {
    background: #E8E0FF;
}

.menu-icon {
    font-size: 40rpx;
}

.menu-text {
    flex: 1;
    font-size: 32rpx;
    color: #000000;
}

.menu-arrow {
    width: 32rpx;
    height: 32rpx;
    opacity: 0.3;
}
</style>

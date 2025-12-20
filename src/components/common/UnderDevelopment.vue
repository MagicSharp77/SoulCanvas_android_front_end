<template>
    <view class="under-development-overlay">
        <view class="content">
            <view class="icon-container">
                <text class="icon">🚧</text>
            </view>
            <text class="title">Under Development</text>
            <text class="subtitle">This feature is coming soon!</text>
        </view>
    </view>
</template>

<script setup>
</script>

<style scoped>
.under-development-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10rpx);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.content {
    text-align: center;
    padding: 64rpx 48rpx;
}

.icon-container {
    margin-bottom: 32rpx;
    animation: bounce 2s infinite;
}

.icon {
    font-size: 120rpx;
    display: block;
}

.title {
    display: block;
    font-size: 48rpx;
    font-weight: 700;
    color: #000000;
    margin-bottom: 16rpx;
}

.subtitle {
    display: block;
    font-size: 28rpx;
    color: #666666;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20rpx);
    }
}
</style>

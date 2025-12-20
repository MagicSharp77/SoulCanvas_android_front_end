<template>
  <view class="page-container">
    <!-- Header -->
    <view class="header">
      <text class="header-title">Daily Study</text>
      <img class="header-img" src="/static/icons/next.svg" alt=""></img>
    </view>

    <!-- Word Card -->
    <view class="word-card">
      <!-- AI Generated Badge -->
      <!-- <view class="ai-badge">
        <image class="ai-icon" src="/static/icons/ai-sparkle.png" mode="aspectFit"></image>
        <text class="ai-text">AI Generated</text>
      </view> -->

      <!-- Word Image -->
      <view class="word-image-container">
        <image class="word-image" :src="currentWord.imageUrl" mode="aspectFill"></image>

        <!-- Refresh Button -->
        <view class="refresh-btn" @click="refreshWord">
          <image class="refresh-icon" src="/static/icons/ai-get-img.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- Word Content -->
      <view class="word-content">
        <!-- Word Title with Audio -->
        <view class="word-header">
          <text class="word-title">{{ currentWord.word }}</text>
          <view class="audio-btn" @click="playAudio">
            <image class="audio-icon" src="/static/icons/speaker.png" mode="aspectFit"></image>
          </view>
        </view>

        <!-- Phonetic -->
        <text class="word-phonetic"> {{ currentWord.phonetic }}</text>

        <!-- Translation -->
        <view class="translation-box">
          <text class="translation-label">中文释义</text>
          <text class="translation-text">{{ currentWord.translation }}</text>
        </view>

        <!-- Example -->
        <view class="example-section">
          <text class="example-label">Example</text>
          <text class="example-text">
            <text class="highlight-word">{{ getHighlightedExample().before }}</text>
            <text class="highlighted">{{ getHighlightedExample().word }}</text>
            <text class="highlight-word">{{ getHighlightedExample().after }}</text>
          </text>
        </view>
      </view>
    </view>

    <!-- Tabbar -->
    <TheTabbar />
  </view>
</template>

<script setup>
import TheTabbar from "../../components/common/TheTabbar.vue";
import { ref, computed, onMounted } from "vue";
import { wordCards, getRandomWord } from "../../mock/wordData.js";
import { getWordDetail, login } from "../../api/api";

// Current word data
const currentWord = ref(wordCards[0]);

// Refresh word
const refreshWord = () => {
  currentWord.value = getRandomWord();
};

// Play audio
const playAudio = () => {
  // In a real app, you would use uni.createInnerAudioContext()
  uni.showToast({
    title: '播放发音',
    icon: 'none'
  });
};

// Get highlighted example text
const getHighlightedExample = () => {
  const example = currentWord.value.example;
  const word = currentWord.value.word.toLowerCase();
  const lowerExample = example.toLowerCase();
  const index = lowerExample.indexOf(word);

  if (index === -1) {
    return { before: example, word: '', after: '' };
  }

  return {
    before: example.substring(0, index),
    word: example.substring(index, index + word.length),
    after: example.substring(index + word.length)
  };
};

onMounted(async () => {
  try {
    await login({
      userId: '20251218',
      externalId: '20251218'
    }).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.page-container {
  /* min-height: 100vh; */
  background: #FFFFFF;
  padding: 40rpx 32rpx 120rpx;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.header-title {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #000000;
  margin-bottom: 8rpx;
}

.header-img {
  width: 48rpx;
  height: 48rpx;
}

.header-subtitle {
  display: block;
  font-size: 28rpx;
  color: #999999;
}

/* Word Card */
.word-card {
  background: #FFFFFF;
  border-radius: 32rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
}

/* AI Badge */
.ai-badge {
  position: absolute;
  top: 32rpx;
  left: 32rpx;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 40rpx;
  padding: 12rpx 24rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
  backdrop-filter: blur(10rpx);
}

.ai-icon {
  width: 28rpx;
  height: 28rpx;
}

.ai-text {
  font-size: 24rpx;
  color: #666666;
}

/* Word Image */
.word-image-container {
  position: relative;
  width: 100%;
  height: 560rpx;
  background: linear-gradient(135deg, #D4E7D4 0%, #E8D4D4 100%);
}

.word-image {
  width: 100%;
  height: 560rpx;
}

/* Refresh Button */
.refresh-btn {
  position: absolute;
  bottom: 32rpx;
  right: 32rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.refresh-btn:active {
  transform: scale(0.95);
}

.refresh-icon {
  width: 96rpx;
  height: 96rpx;
}

/* Word Content */
.word-content {
  padding: 32rpx 32rpx 40rpx;
}

/* Word Header */
.word-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.word-title {
  font-size: 72rpx;
  font-weight: 700;
  color: #000000;
}

.audio-btn {
  width: 88rpx;
  height: 88rpx;
  background: #E8E0FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.audio-btn:active {
  transform: scale(0.9);
}

.audio-icon {
  width: 88rpx;
  height: 88rpx;
}

/* Phonetic */
.word-phonetic {
  display: block;
  font-size: 32rpx;
  color: #666666;
  margin-bottom: 32rpx;
  margin-left: 6rpx;
}

/* Translation Box */
.translation-box {
  background: #F3F0FF;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 32rpx;
}

.translation-label {
  display: block;
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 8rpx;
}

.translation-text {
  display: block;
  font-size: 32rpx;
  color: #000000;
  line-height: 1.6;
}

/* Example Section */
.example-section {
  padding: 24rpx;
  background: #F8F8F8;
  border-radius: 16rpx;
}

.example-label {
  display: block;
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 12rpx;
}

.example-text {
  display: block;
  font-size: 28rpx;
  color: #333333;
  line-height: 1.8;
}

.highlight-word {
  color: #333333;
}

.highlighted {
  color: #6B5DD3;
  font-weight: 600;
}
</style>

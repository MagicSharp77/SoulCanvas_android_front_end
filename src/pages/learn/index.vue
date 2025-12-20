<template>
  <view class="page-container">
    <!-- Header -->
    <view class="header">
      <text class="header-title">Daily Study</text>
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
        <image class="word-image" :src="currentWord.imageUrl || defaultWordImg" mode="aspectFill"></image>

        <!-- Refresh Button -->
        <view class="refresh-btn" @click="changeAIImage">
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
          <text class="translation-label">Definition</text>
          <text class="translation-text">{{ currentWord.definition }}</text>
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

      <view class="word-next">
        <button class="remember-btn" @click="refreshWord">has remembered!</button>
        <!-- <img class="next-img" src="/static/icons/next.svg" alt="" @click="refreshWord"></img> -->
      </view>
    </view>

    <!-- Tabbar -->
    <TheTabbar />
  </view>
</template>

<script setup>
import TheTabbar from "../../components/common/TheTabbar.vue";
import { ref, computed, onMounted } from "vue";
import {
  login,
  createPlan,
  getMyPlans,
  getReviewDue,
  makeWordTask,
  getToBeCompleted,
  getWordDetail,
  getBatchWordDetails,
  submitWordResult
} from "../../api/api";

// State
const currentWord = ref(null);
const wordQueue = ref([]); // 待学习的单词队列
const currentPlanId = ref(null);
const isLoading = ref(false);
const currentWordIndex = ref(0);
const defaultWordImg = "/static/icons/default-img.jpg"
// 默认占位数据
const defaultWord = {
  id: 0,
  word: "Loading...",
  phonetic: "",
  translation: "正在加载单词...",
  definition: "",
  example: "Please wait while we fetch your words.",
  imageUrl: defaultWordImg,
  audioUrl: ""
};

currentWord.value = defaultWord;

// 初始化学习流程
const initLearning = async () => {
  try {
    isLoading.value = true;

    // 1. 登录
    const authRes = await login({
      userId: '20251218',
      externalId: '20251218'
    });
    console.log('登录成功:', authRes);

    // 保存 token
    if (authRes.token) {
      localStorage.setItem('token', authRes.token);
    }

    // 2. 获取用户计划
    const plans = await getMyPlans();
    console.log('用户计划:', plans);

    if (!plans || plans.length <= 0) {
      const newPlan = createPlan({ tag: "cet4", dailyNewTarget: 20, dailyReviewTarget: 60 })
      console.log(newPlan)
    }
    if (plans && plans.length > 0) {

      currentPlanId.value = plans[0].id;


      // 3. 先尝试获取待复习的单词
      let reviewWords = await getReviewDue(currentPlanId.value, 20);
      console.log('待复习单词:', reviewWords);

      // 4. 如果没有待复习的，获取新词
      if (!reviewWords || reviewWords.length === 0) {
        const makeTaskRes = await makeWordTask(currentPlanId.value, 10);
        console.log('创建新词任务:', makeTaskRes);

        const newWords = await getToBeCompleted(currentPlanId.value);
        console.log('待学习新词:', newWords);
        reviewWords = newWords;
      }

      // 5. 提取单词 ID 并批量获取详情
      if (reviewWords && reviewWords.length > 0) {
        const wordIds = reviewWords.map(w => w.wordId);
        const wordDetails = await getBatchWordDetails(wordIds);
        console.log('单词详情:', wordDetails);

        wordQueue.value = wordDetails;
        currentWordIndex.value = 0;

        // 加载第一个单词
        if (wordDetails.length > 0) {
          await loadWordDetail(wordDetails[0].id);
        }
      } else {
        uni.showToast({
          title: '暂无待学习单词',
          icon: 'none'
        });
      }
    } else {
      uni.showToast({
        title: '请先创建学习计划',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('初始化学习流程失败:', error);
    uni.showToast({
      title: '加载失败，请重试',
      icon: 'none'
    });
  } finally {
    isLoading.value = false;
  }
};

// 加载单词详情
const loadWordDetail = async (wordId) => {
  try {
    const detail = await getWordDetail(wordId);
    console.log('单词详情:', detail);

    // 转换为页面需要的格式
    currentWord.value = {
      id: detail.id,
      word: detail.word,
      phonetic: detail.phonetic || '',
      translation: detail.translation,
      definition: detail.definition || '',
      example: `This is an example sentence using the word ${detail.word}.`, // 暂时使用默认例句
      imageUrl: defaultWordImg,
      audioUrl: detail.audio || ''
    };
  } catch (error) {
    console.error('加载单词详情失败:', error);
  }
};

// 刷新单词（标记为已记住并加载下一个）
const refreshWord = async () => {
  if (!currentWord.value || currentWord.value.id === 0) return;

  try {
    // 提交学习结果为 GOOD
    await submitWordResult(currentWord.value.id, 'GOOD');
    console.log('提交学习结果成功');

    // 移动到下一个单词
    currentWordIndex.value++;

    if (currentWordIndex.value < wordQueue.value.length) {
      const nextWord = wordQueue.value[currentWordIndex.value];
      await loadWordDetail(nextWord.id);
    } else {
      uni.showToast({
        title: '今日学习完成！',
        icon: 'success'
      });
      // 重新初始化，获取新的单词
      setTimeout(() => {
        initLearning();
      }, 1500);
    }
  } catch (error) {
    console.error('提交学习结果失败:', error);
    uni.showToast({
      title: '提交失败，请重试',
      icon: 'none'
    });
  }
};

const changeAIImage = () => {
  uni.showToast({
    title: `获取AI图片功能正在开发中`,
    icon: 'none'
  });
};

// Play audio
const playAudio = () => {
  if (currentWord.value && currentWord.value.audioUrl) {
    // TODO: 实现音频播放
    const innerAudioContext = uni.createInnerAudioContext();
    innerAudioContext.src = currentWord.value.audioUrl;
    innerAudioContext.play();
  } else {
    uni.showToast({
      title: '音频功能正在开发中',
      icon: 'none'
    });
  }
};

// Get highlighted example text
const getHighlightedExample = () => {
  if (!currentWord.value || !currentWord.value.example) {
    return { before: '', word: '', after: '' };
  }

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
  await initLearning();
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
  padding: 32rpx 32rpx 24rpx;
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

.word-next {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

:deep(uni-button:after) {
  border: none !important;
  /* 或者使用 border-width: 0 */
  border-width: 0 !important;
}

.remember-btn {
  background: #F3F0FF;
  color: #6B5DD3;
  font-size: 32rpx;
  font-weight: 600;
  border: none;
  border-radius: 64rpx;
  margin: 0 32rpx;
  /* padding: 24rpx 48rpx; */
  width: 100%;
  transition: opacity 0.2s;
}

.remember-btn:active {
  opacity: 0.8;
}

.next-img {
  width: 48rpx;
  height: 48rpx;
}
</style>

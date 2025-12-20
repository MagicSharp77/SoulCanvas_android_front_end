// src/api/types.ts

// 通用响应结构（如果后端有统一包装，否则根据实际情况调整）
// 根据你的文档，后端似乎直接返回数据对象，所以这里主要定义数据模型

// 登录响应
export interface AuthResponse {
  token: string;
  userId: string;
}

// 计划 (UserPlan)
export interface UserPlan {
  id: string;
  userId: string;
  tag: 'cet4' | 'cet6' | 'gre' | 'ielts' | 'toefl' | 'ky';
  dailyNewTarget: number;
  dailyReviewTarget: number;
  createdAt: string;
  updatedAt: string;
}

// 创建计划的参数
export interface CreatePlanParams {
  tag: string;
  dailyNewTarget: number;
  dailyReviewTarget: number;
}

// 单词任务项 (列表里的简略信息)
export interface WordTaskItem {
  wordId: number;
  status: 'NEW' | 'LEARNING' | 'REVIEW' | 'MASTERED';
  nextReviewAt?: string;
  createdAt?: string;
}

// 创建新词任务响应
export interface MakeTaskResponse {
  added: number;
  wordIds: number[];
  quota: number;
  remaining: number;
}

// 单词详情 (Dictionary)
export interface WordDetail {
  id: number;
  word: string;
  phonetic: string;
  definition: string;
  translation: string;
  tag: string;
  audio?: string;
}

// 提交复习结果响应
export interface ReviewResultResponse {
  skipped?: boolean;
  nextReviewAt: string;
  status?: string;
  // ...其他字段
}
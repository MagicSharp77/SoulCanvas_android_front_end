// src/api/backend.ts
import request from '../utils/request';
import type * as T from './types'; // 引入上面定义的类型

// ==================== 1. 认证 Auth ====================

/**
 * 开发者登录
 * @param userId 可选，不传自动注册新用户
 */
export const login = (data: { userId?: string; externalId?: string } = {}) => {
  return request.post<any, T.AuthResponse>('/auth/dev-login', data);
};

// ==================== 2. 计划 Plan ====================

/** 获取我的计划列表 */
export const getMyPlans = () => {
  return request.get<any, T.UserPlan[]>('/me/plans');
};

/** 创建新计划 */
export const createPlan = (data: T.CreatePlanParams) => {
  return request.post<any, T.UserPlan>('/me/plans', data);
};

/** 更新计划 (仅修改目标数) */
export const updatePlan = (planId: string, data: { dailyNewTarget?: number; dailyReviewTarget?: number }) => {
  return request.patch<any, T.UserPlan>(`/me/plans/${planId}`, data);
};

// ==================== 3. 学习流程 Study ====================

/** * 1. 获取今日待复习列表 
 * logic: 先复习，再学新词
 */
export const getReviewDue = (planId: string, limit: number = 20) => {
  return request.get<any, T.WordTaskItem[]>(`/me/plans/${planId}/reviewdue`, {
    params: { limit }
  });
};

/** * 2. 分配今日新词任务 (发牌)
 * logic: 告诉后端我要学几个新词，或者用默认配额
 */
export const makeWordTask = (planId: string, count?: number) => {
  return request.post<any, T.MakeTaskResponse>(`/me/plans/${planId}/makewordtask`, { count });
};

/** * 3. 获取待学习的新词列表 (拿到ID)
 * logic: makeWordTask 之后调用这个，获取具体的 ID 列表
 */
export const getToBeCompleted = (planId: string) => {
  return request.get<any, T.WordTaskItem[]>(`/me/plans/${planId}/tobecompleted`);
};

/** * 4. 提交学习/复习结果
 * result: GOOD | HARD | FAIL
 */
export const submitWordResult = (wordId: number, result: 'GOOD' | 'HARD' | 'FAIL') => {
  return request.patch<any, T.ReviewResultResponse>(`/me/words/${wordId}`, { result });
};

// ==================== 4. 词典 Dictionary ====================

/** 获取单词详情 (单个) */
export const getWordDetail = (stardictId: number) => {
  return request.get<any, T.WordDetail>(`/words/id/${stardictId}`);
};

/** 批量获取单词详情 (用于列表展示) */
export const getBatchWordDetails = (ids: number[]) => {
  return request.post<any, T.WordDetail[]>('/words/batch', { ids });
};

/** 搜索单词 */
export const searchWords = (query: string, tag?: string, limit: number = 20) => {
  return request.get<any, T.WordDetail[]>('/words', {
    params: { q: query, tag, limit }
  });
};

// ==================== 5. 特殊：SSE 流式请求 ====================

/**
 * 获取 AI 造句 (流式响应)
 * 注意：Axios 处理流比较麻烦，这里建议直接用 fetch
 */
export const fetchSentenceStream = async (word: string, onMessage: (chunk: string) => void) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://127.0.0.1:31850/words/makesentence?word=${word}`, {
    headers: {
      'Authorization': `Bearer ${token}` // 必须手动带 Token
    }
  });

  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    onMessage(chunk); // 回调输出给前端 UI
  }
};
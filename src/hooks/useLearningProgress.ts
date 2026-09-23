import { useCallback, useEffect, useState } from 'react';
import { completeActivity as completeProgressActivity, parseLearningProgress, recordBestQuizScore, resetLearningProgress } from '../domain/progress/progress';
import type { LearningProgress } from '../domain/progress/progress';
import { safeGetJson, safeGetItem, safeRemoveItem, safeSetItem, STORAGE_KEYS } from '../utils/storage';

function readProgress(): LearningProgress {
  const stored = safeGetJson<unknown>(STORAGE_KEYS.PROGRESS, null);
  const legacyStarsText = safeGetItem(STORAGE_KEYS.STARS);
  const legacyStars = legacyStarsText === null ? 0 : Number(legacyStarsText);
  return parseLearningProgress(stored, legacyStars);
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(readProgress);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    safeRemoveItem(STORAGE_KEYS.STARS);
  }, [progress]);

  const completeActivity = useCallback((activityId: string, earnsStar = true) => {
    setProgress((current) => completeProgressActivity(current, activityId, earnsStar));
  }, []);

  const recordQuizScore = useCallback((score: number) => {
    setProgress((current) => recordBestQuizScore(current, score));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(resetLearningProgress());
  }, []);

  return { progress, completeActivity, recordQuizScore, resetProgress };
}

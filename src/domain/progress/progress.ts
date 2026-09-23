export interface LearningProgress {
  stars: number;
  completedActivities: string[];
  rewardedActivities: string[];
  bestQuizScore: number | null;
}

export const EMPTY_PROGRESS: LearningProgress = {
  stars: 0,
  completedActivities: [],
  rewardedActivities: [],
  bestQuizScore: null,
};

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string =>
    typeof item === 'string'
    && item.length > 0
    && item.length <= 100
    && /^(place-value-|comparison-sort-|column-(addition|subtraction)-|rounding-|story-problem-|quiz-(practice-|exam-))/.test(item),
  ))].slice(0, 1000);
}

export function parseLearningProgress(value: unknown, legacyStars: unknown = 0): LearningProgress {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {
      ...EMPTY_PROGRESS,
      stars: Number.isSafeInteger(legacyStars) && (legacyStars as number) >= 0 && (legacyStars as number) <= 10000
        ? legacyStars as number
        : 0,
    };
  }

  const candidate = value as Record<string, unknown>;
  const stars = candidate.stars;
  const score = candidate.bestQuizScore;
  return {
    stars: Number.isSafeInteger(stars) && (stars as number) >= 0 && (stars as number) <= 10000 ? stars as number : 0,
    completedActivities: stringList(candidate.completedActivities),
    rewardedActivities: stringList(candidate.rewardedActivities),
    bestQuizScore: Number.isInteger(score) && (score as number) >= 0 && (score as number) <= 100 ? score as number : null,
  };
}

export function completeActivity(progress: LearningProgress, activityId: string, earnsStar = true): LearningProgress {
  if (!activityId.trim()) throw new Error('Activity ID cannot be empty.');
  const alreadyCompleted = progress.completedActivities.includes(activityId);
  const alreadyRewarded = progress.rewardedActivities.includes(activityId);
  if (alreadyCompleted && (!earnsStar || alreadyRewarded)) return progress;

  return {
    ...progress,
    stars: earnsStar && !alreadyRewarded ? progress.stars + 1 : progress.stars,
    completedActivities: alreadyCompleted
      ? progress.completedActivities
      : [...progress.completedActivities, activityId],
    rewardedActivities: earnsStar && !alreadyRewarded
      ? [...progress.rewardedActivities, activityId]
      : progress.rewardedActivities,
  };
}

export function rewardActivity(progress: LearningProgress, activityId: string): LearningProgress {
  return completeActivity(progress, activityId, true);
}

export function recordBestQuizScore(progress: LearningProgress, score: number): LearningProgress {
  if (!Number.isInteger(score) || score < 0 || score > 100) return progress;
  return {
    ...progress,
    bestQuizScore: progress.bestQuizScore === null ? score : Math.max(progress.bestQuizScore, score),
  };
}

export function resetLearningProgress(): LearningProgress {
  return { stars: 0, completedActivities: [], rewardedActivities: [], bestQuizScore: null };
}

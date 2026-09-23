import { describe, expect, it } from 'vitest';
import { completeActivity, EMPTY_PROGRESS, parseLearningProgress, recordBestQuizScore, resetLearningProgress, rewardActivity } from './progress/progress';

describe('activity rewards', () => {
  it('awards the first completion once and leaves duplicate completions unchanged', () => {
    const first = rewardActivity(EMPTY_PROGRESS, 'place-value-4782-7');
    expect(first.stars).toBe(1);
    expect(first.completedActivities).toEqual(['place-value-4782-7']);
    expect(first.rewardedActivities).toEqual(['place-value-4782-7']);
    expect(rewardActivity(first, 'place-value-4782-7')).toBe(first);
  });

  it('rewards a different activity and tracks the best quiz score', () => {
    const first = rewardActivity(EMPTY_PROGRESS, 'rounding-01');
    const second = rewardActivity(first, 'rounding-02');
    expect(second.stars).toBe(2);
    expect(recordBestQuizScore(recordBestQuizScore(second, 70), 60).bestQuizScore).toBe(70);
    expect(recordBestQuizScore(second, 85).bestQuizScore).toBe(85);
  });

  it('records an unsuccessful quiz as complete without a star, then rewards its first passing attempt', () => {
    const firstAttempt = completeActivity(EMPTY_PROGRESS, 'quiz-exam-01', false);
    expect(firstAttempt.completedActivities).toEqual(['quiz-exam-01']);
    expect(firstAttempt.rewardedActivities).toEqual([]);
    expect(firstAttempt.stars).toBe(0);

    const passed = completeActivity(firstAttempt, 'quiz-exam-01', true);
    expect(passed.completedActivities).toEqual(['quiz-exam-01']);
    expect(passed.rewardedActivities).toEqual(['quiz-exam-01']);
    expect(passed.stars).toBe(1);
  });
});

describe('persisted progress validation and reset', () => {
  it('falls back safely for invalid values and filters unknown activity identifiers', () => {
    expect(parseLearningProgress({ stars: '100', completedActivities: ['invalid'], rewardedActivities: null, bestQuizScore: 140 })).toEqual({
      stars: 0,
      completedActivities: [],
      rewardedActivities: [],
      bestQuizScore: null,
    });
    expect(parseLearningProgress(null, 6).stars).toBe(6);
    expect(parseLearningProgress(null, '6').stars).toBe(0);
  });

  it('clears stars, completions, rewards, and quiz score on reset', () => {
    const progress = rewardActivity(EMPTY_PROGRESS, 'column-subtraction-01');
    const reset = resetLearningProgress();
    expect(progress.stars).toBe(1);
    expect(reset).toEqual({ stars: 0, completedActivities: [], rewardedActivities: [], bestQuizScore: null });
  });
});

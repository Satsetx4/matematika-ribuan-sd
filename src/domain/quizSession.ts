export interface QuizSession {
  version: 1;
  viewMode: 'practice' | 'exam';
  selectedCategory: string;
  selectedDifficulty: string;
  practiceAnswers: Record<string, number>;
  revealedExplanations: Record<string, boolean>;
  examQuestionIds: string[];
  currentExamIndex: number;
  examUserAnswers: (number | null)[];
  examFinished: boolean;
  examScore: number | null;
}

const VALID_CATEGORIES = new Set(['all', 'nilai-tempat', 'banding-urut', 'hitung-bersusun', 'pembulatan', 'soal-cerita']);
const VALID_DIFFICULTIES = new Set(['all', 'mudah', 'sedang', 'tantangan']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function filterPracticeAnswers(value: unknown, validIds: ReadonlySet<string>): Record<string, number> | null {
  if (!isRecord(value)) return null;
  const entries = Object.entries(value);
  if (entries.length > validIds.size) return null;
  const result: Record<string, number> = {};
  for (const [id, answer] of entries) {
    if (!validIds.has(id) || !Number.isInteger(answer) || (answer as number) < 0 || (answer as number) > 3) return null;
    result[id] = answer as number;
  }
  return result;
}

function filterExplanationFlags(value: unknown, validIds: ReadonlySet<string>): Record<string, boolean> | null {
  if (!isRecord(value)) return null;
  const entries = Object.entries(value);
  if (entries.length > validIds.size) return null;
  const result: Record<string, boolean> = {};
  for (const [id, revealed] of entries) {
    if (!validIds.has(id) || typeof revealed !== 'boolean') return null;
    result[id] = revealed;
  }
  return result;
}

export function parseQuizSession(value: unknown, validQuestionIds: ReadonlySet<string>): QuizSession | null {
  if (!isRecord(value) || value.version !== 1) return null;
  if (value.viewMode !== 'practice' && value.viewMode !== 'exam') return null;
  if (typeof value.selectedCategory !== 'string' || !VALID_CATEGORIES.has(value.selectedCategory)) return null;
  if (typeof value.selectedDifficulty !== 'string' || !VALID_DIFFICULTIES.has(value.selectedDifficulty)) return null;
  if (!Array.isArray(value.examQuestionIds) || value.examQuestionIds.length > 10) return null;
  const questionIds = value.examQuestionIds;
  if (questionIds.some((id) => typeof id !== 'string' || !validQuestionIds.has(id)) || new Set(questionIds).size !== questionIds.length) return null;
  if (value.viewMode === 'exam' && questionIds.length !== 10) return null;
  if (!Number.isInteger(value.currentExamIndex) || (value.currentExamIndex as number) < 0 || (questionIds.length > 0 && (value.currentExamIndex as number) >= questionIds.length)) return null;
  if (!Array.isArray(value.examUserAnswers) || value.examUserAnswers.length !== questionIds.length) return null;
  if (value.examUserAnswers.some((answer) => answer !== null && (!Number.isInteger(answer) || (answer as number) < 0 || (answer as number) > 3))) return null;
  if (typeof value.examFinished !== 'boolean') return null;
  if (value.examFinished !== (Number.isInteger(value.examScore) && (value.examScore as number) >= 0 && (value.examScore as number) <= 100)) return null;

  const practiceAnswers = filterPracticeAnswers(value.practiceAnswers, validQuestionIds);
  const revealedExplanations = filterExplanationFlags(value.revealedExplanations, validQuestionIds);
  if (!practiceAnswers || !revealedExplanations) return null;

  return {
    version: 1,
    viewMode: value.viewMode,
    selectedCategory: value.selectedCategory,
    selectedDifficulty: value.selectedDifficulty,
    practiceAnswers,
    revealedExplanations,
    examQuestionIds: questionIds as string[],
    currentExamIndex: value.currentExamIndex as number,
    examUserAnswers: value.examUserAnswers as (number | null)[],
    examFinished: value.examFinished,
    examScore: value.examFinished ? value.examScore as number : null,
  };
}

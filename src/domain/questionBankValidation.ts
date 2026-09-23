import type { Question } from '../data/questionBank';

export type QuestionCategory = Question['category'];

const VALID_CATEGORIES = new Set<QuestionCategory>([
  'nilai-tempat',
  'banding-urut',
  'hitung-bersusun',
  'pembulatan',
  'soal-cerita',
]);

export function validateQuestionBank(questions: readonly Question[]): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  questions.forEach((question, index) => {
    const label = `Question at index ${index}`;
    if (!question.id.trim()) errors.push(`${label} has an empty ID.`);
    else if (seenIds.has(question.id)) errors.push(`Duplicate question ID: ${question.id}.`);
    seenIds.add(question.id);

    if (typeof question.question !== 'string' || !question.question.trim()) errors.push(`${label} has an empty question.`);
    if (!VALID_CATEGORIES.has(question.category)) errors.push(`${label} has an invalid category.`);
    if (!Array.isArray(question.options) || question.options.length < 2 || question.options.some((option) => typeof option !== 'string' || !option.trim())) {
      errors.push(`${label} must have at least two non-empty options.`);
    }
    if (!Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
      errors.push(`${label} has a correct answer outside its options.`);
    }
  });

  return errors;
}

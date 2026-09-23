import { describe, expect, it } from 'vitest';
import { QUESTION_BANK } from '../data/questionBank';
import { validateQuestionBank } from './questionBankValidation';

describe('question bank integrity', () => {
  it('accepts the full bank with unique IDs, in-range answers, and complete choices', () => {
    expect(QUESTION_BANK).toHaveLength(32);
    expect(validateQuestionBank(QUESTION_BANK)).toEqual([]);
  });

  it('detects duplicate IDs, missing text, and invalid answer indexes', () => {
    const invalid = [
      { ...QUESTION_BANK[0], question: '', correctAnswer: 8 },
      { ...QUESTION_BANK[0], question: 'Duplikat' },
    ];
    const errors = validateQuestionBank(invalid);
    expect(errors.some((error) => error.includes('Duplicate question ID'))).toBe(true);
    expect(errors.some((error) => error.includes('empty question'))).toBe(true);
    expect(errors.some((error) => error.includes('correct answer outside'))).toBe(true);
  });
});

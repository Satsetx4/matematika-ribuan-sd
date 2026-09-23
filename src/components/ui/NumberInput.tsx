import { useState } from 'react';
import { validateBoundedIntegerInput } from '../../domain/math/numericInput';

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onCommit: (value: number) => void;
  className?: string;
  labelClassName?: string;
  hint?: string;
}

export function NumberInput({
  id,
  label,
  value,
  min,
  max,
  onCommit,
  className,
  labelClassName,
  hint,
}: NumberInputProps) {
  const [draft, setDraft] = useState(String(value));
  const [error, setError] = useState('');
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const commit = () => {
    const result = validateBoundedIntegerInput(draft, min, max);
    if (!result.valid) {
      setError(result.message);
      return;
    }
    setDraft(String(result.value));
    setError('');
    onCommit(result.value);
  };

  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClassName ?? 'sr-only'}>{label}</label>
      <input
        id={id}
        aria-label={label}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
          setError('');
        }}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commit();
            event.currentTarget.blur();
          }
        }}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${hintId} ${errorId}` : hintId}
        className={`${className ?? ''} ${error ? 'border-rose-500 focus:ring-rose-500' : ''}`.trim()}
      />
      <p id={hintId} className="sr-only">{hint ?? `Angka bulat dari ${min} sampai ${max}.`}</p>
      {error && <p id={errorId} role="alert" className="mt-1 text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
}

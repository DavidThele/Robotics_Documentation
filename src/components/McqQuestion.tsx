// McqQuestion.tsx
import React from 'react';
import { colors, typography, layout } from '../styles/styles.ts';

export default function McqQuestion({
  index,
  question,
  selected,
  submitted,
  onSelect,
  onSubmit,
  onReset
}: {
  index: number;
  question: any;
  selected: string | null;
  submitted: boolean;
  onSelect: (choice: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}) {
  const isCorrect = submitted && selected === question.correctAnswer;

  return (
    <div style={{ ...layout.card, padding: '1rem' }}>
      <div style={{ ...typography.h3, color: colors.secondary, marginBottom: '0.5rem' }}>
        Q{index + 1}. {question.prompt}
      </div>

      <div style={layout.flexColGap('0.5rem')}>
        {question.choices.map((choice: string, cIndex: number) => {
          const checked = selected === choice;

          let borderColor = colors.cardBorder;
          if (submitted) {
            if (choice === question.correctAnswer) borderColor = colors.success;
            else if (checked && choice !== question.correctAnswer) borderColor = colors.error;
          }

          return (
            <label
              key={cIndex}
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius: '0.5rem',
                padding: '0.5rem',
                cursor: submitted ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <input
                type="radio"
                name={`q${index}`}
                value={choice}
                checked={checked}
                disabled={submitted} // disable radio buttons after submit
                onChange={() => onSelect(choice)}
              />
              <span style={{ whiteSpace: 'pre-line', color: colors.text }}>{choice}</span>
            </label>
          );
        })}
      </div>

      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={onSubmit}
          disabled={submitted || selected === null}
          style={{
            backgroundColor: colors.primary,
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: selected && !submitted ? 'pointer' : 'not-allowed'
          }}
        >
          Submit
        </button>

        <button
          onClick={onReset}
          style={{
            backgroundColor: colors.error,
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      {submitted && (
        <div style={{ marginTop: '0.75rem', color: isCorrect ? colors.success : colors.error }}>
          {isCorrect ? 'Correct!' : 'Incorrect.'}
        </div>
      )}
    </div>
  );
}

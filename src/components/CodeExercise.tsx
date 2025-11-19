import { colors, typography, layout } from '../styles/styles.ts';
import React, { useState } from 'react';

export default function CodeExercise({
  index,
  exercise
}: {
  index: number;
  exercise: any;
}) {

  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div style={{ ...layout.card, padding: '1rem' }}>
      <div
        style={{
          ...typography.h3,
          color: colors.secondary,
          marginBottom: '0.5rem'
        }}
      >
        Coding Task {index + 1}
      </div>

      <p style={{ ...typography.p, color: colors.text, marginBottom: '1rem' }}>
        {exercise.prompt}
      </p>

      {exercise.example && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ color: colors.primary, marginBottom: '0.5rem' }}>
            <h2 style={{ ...typography.h2, color: colors.primary }}>{'Example'}</h2>
            
          </div>
          <pre
            style={{
              backgroundColor: '#24272d',
              color: colors.text,
              padding: '0.75rem',
              borderRadius: '0.375rem',
              whiteSpace: 'pre-wrap'
            }}
          >
            {exercise.example}
          </pre>
        </div>
      )}

      {exercise.answer && (
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            style={{
              backgroundColor: colors.tertiary,
              color: 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              border: 'none',
              marginBottom: '0.5rem'
            }}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>

          {showAnswer && (
            <div>
              <pre
                style={{
                  backgroundColor: '#24272d',
                  color: colors.text,
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  whiteSpace: 'pre-wrap',
                  marginBottom: '0.5rem'
                }}
              >
                {exercise.answer}
              </pre>

              <div style={{ color: colors.primary }}>
                Answers may vary; this is just one example of a correct solution.
              </div>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          backgroundColor: colors.hintBg,
          padding: '0.75rem',
          borderRadius: '0.375rem',
          color: colors.text,
          marginTop: '1rem'
        }}
      >
        Reminder:  
        Create and test your solution inside your local clone of the github repo that you called
        <strong> "Robotics Practice Clone"</strong>.  
        Do not push this code to any team repository, and do not write code that you intend to actually go on the robot here, This is merely for practice. Feel free to send your answers to David Thele (dthele@thacher.org or 805-317-1896) to check.
      </div>
    </div>
  );
}

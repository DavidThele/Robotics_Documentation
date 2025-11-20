import { colors, typography, layout } from '../styles/styles.ts';
import { ExternalLink } from 'lucide-react';
import McqQuestion from './McqQuestion';
import CodeExercise from './CodeExercise';
import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";

function shuffle(arr: string[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function HomeworkTemplate({ data }: { data: any }) {

  const [mcqData, setMcqData] = useState(
    data.mcq?.map((q: any) => ({
      ...q,
      choices: shuffle(q.choices)
    })) || []
  );

  const [mcqSelections, setMcqSelections] = useState<(string | null)[]>(
    mcqData.map(() => null)
  );

  const [mcqSubmitted, setMcqSubmitted] = useState<boolean[]>(
    mcqData.map(() => false)
  );

  React.useEffect(() => {
    if (!data.mcq) {
      setMcqData([]);
      setMcqSelections([]);
      setMcqSubmitted([]);
      return;
    }

    const newMcqData = data.mcq.map((q: any) => ({
      ...q,
      choices: shuffle(q.choices)
    }));

    setMcqData(newMcqData);
    setMcqSelections(newMcqData.map(() => null));
    setMcqSubmitted(newMcqData.map(() => false));
  }, [data.id]);

  const handleSelect = (index: number, choice: string) => {
    const newSelections = [...mcqSelections];
    newSelections[index] = choice;
    setMcqSelections(newSelections);
  };

  const handleSubmit = (index: number) => {
    const newSubmitted = [...mcqSubmitted];
    newSubmitted[index] = true;
    setMcqSubmitted(newSubmitted);
  };

  const handleReset = (index: number) => {
    const newSelections = [...mcqSelections];
    const newSubmitted = [...mcqSubmitted];
    newSelections[index] = null;
    newSubmitted[index] = false;

    setMcqSelections(newSelections);
    setMcqSubmitted(newSubmitted);

    setMcqData(prev =>
      prev.map((q, i) =>
        i === index
          ? { ...q, choices: shuffle(q.choices) }
          : q
      )
    );
  };

  const handleResetAll = () => {
    setMcqSelections(mcqData.map(() => null));
    setMcqSubmitted(mcqData.map(() => false));

    setMcqData(prev =>
      prev.map(q => ({
        ...q,
        choices: shuffle(q.choices)
      }))
    );
  };

  const getDifficultyStyle = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy':
        return { backgroundColor: colors.badgeEasyBg, color: colors.badgeEasyText, padding: '0.25rem 0.75rem', borderRadius: '9999px' };
      case 'Medium':
        return { backgroundColor: colors.badgeMediumBg, color: colors.badgeMediumText, padding: '0.25rem 0.75rem', borderRadius: '9999px' };
      case 'Hard':
        return { backgroundColor: colors.badgeHardBg, color: colors.badgeHardText, padding: '0.25rem 0.75rem', borderRadius: '9999px' };
      default:
        return { backgroundColor: 'rgba(128,128,141,0.1)', color: colors.text, padding: '0.25rem 0.75rem', borderRadius: '9999px' };
    }
  };

  if (data.type === 'folder') {
    return (
      <div style={{ color: colors.text }}>
        <h2 style={{ ...typography.h2, color: colors.secondary }}>{data.name}</h2>
        <p>Select a homework assignment from the sidebar to view its contents.</p>
      </div>
    );
  }

  if (data.isLanding) {
    return (
      <div style={layout.flexColGap('1.5rem')}>
        <h1 style={{ ...typography.h1, color: colors.primary }}>{data.name}</h1>
        {data.content && (
          <ReactMarkdown
            components={{
              h1: ({...props}) => (
                <h1 style={{ ...typography.h1, color: colors.primary }} {...props} />
              ),
              h2: ({...props}) => (
                <h2 style={{ ...typography.h2, color: colors.secondary }} {...props} />
              ),
              p: ({...props}) => (
                <p style={{ ...typography.p, color: colors.text }} {...props} />
              ),
              ul: ({...props}) => (
                <ul
                  style={{
                    listStyleType: 'disc',
                    paddingLeft: '1.5rem',
                    marginBottom: '1rem',
                  }}
                  {...props}
                />
              ),
              ol: ({...props}) => (
                <ol
                  style={{
                    listStyleType: 'decimal',
                    paddingLeft: '1.5rem',
                    marginBottom: '1rem',
                  }}
                  {...props}
                />
              ),
              li: ({...props}) => (
                <li
                  style={{
                    ...typography.p,
                    color: colors.text,
                    marginBottom: '0.3rem',
                  }}
                  {...props}
                />
              ),
              a: ({ ...props }) => (
              <a
                style={{
                  color: colors.tertiary,   
                  textDecoration: 'underline',
                }}
                {...props}
              />
            ),
            }}
          >
            {data.content}
          </ReactMarkdown>
        )}

      </div>
    );
  }

  return (
    <div style={layout.flexColGap('1.5rem')}>
      <div style={layout.flexRowGap('1rem')}>
        <h1 style={{ ...typography.h1, color: colors.primary }}>{data.name}</h1>
        {data.difficulty && <span style={getDifficultyStyle(data.difficulty)}>{data.difficulty}</span>}
      </div>

      {data.description && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Description</h2>
          <p style={{ ...typography.p, color: colors.text, marginTop: '0.5rem' }}>
            {data.description + ' Please ensure you have read the entirety of the Documentation Overview, the Lesson below, and the Related Documentation below before continuing.'}
          </p>
        </div>
      )}

      {data.objectives?.length > 0 && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Learning Objectives</h2>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.objectives.map((obj: string, i: number) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', color: colors.text }}>
                <span style={{ color: colors.secondary }}>•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.lesson?.length > 0 && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary, marginBottom: '0.5rem'}}>Lesson</h2>
          <p style={{ ...typography.p, color: colors.text}}>{data.lesson}</p>
          
        </div>
      )}

      {data.docReferences?.length > 0 && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Related Documentation</h2>
          <div style={layout.flexColGap('0.5rem')}>
            {data.docReferences.map((doc: any, i: number) => (
              <a
                key={i}
                href={`/documentation/${doc}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.tertiary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <code>{"• " + doc}</code>
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      )}

      {mcqData.length > 0 && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Multiple-Choice Questions</h2>

          <button
            onClick={handleResetAll}
            style={{
              marginBottom: '1rem',
              backgroundColor: colors.tertiary,
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Reset All
          </button>

          <div style={layout.flexColGap('1rem')}>
            {mcqData.map((q: any, i: number) => (
              <McqQuestion
                key={i}
                index={i}
                question={q}
                selected={mcqSelections[i]}
                submitted={mcqSubmitted[i]}
                onSelect={(choice: string) => handleSelect(i, choice)}
                onSubmit={() => handleSubmit(i)}
                onReset={() => handleReset(i)}
              />
            ))}
          </div>
        </div>
      )}

      {data.codeExercises?.length > 0 && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Coding Assignments</h2>
          <div style={layout.flexColGap('1.5rem')}>
            {data.codeExercises.map((ex: any, i: number) => (
              <CodeExercise key={i} exercise={ex} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

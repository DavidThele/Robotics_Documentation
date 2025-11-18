import { colors, typography, layout } from '../styles/styles.ts';
import { ExternalLink } from 'lucide-react';

export function HomeworkTemplate({ data }: { data: any }) {
  const getDifficultyStyle = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy': return { backgroundColor: colors.badgeEasyBg, color: colors.badgeEasyText, padding: '0.25rem 0.75rem', borderRadius: '9999px' };
      case 'Medium': return { backgroundColor: colors.badgeMediumBg, color: colors.badgeMediumText, padding: '0.25rem 0.75rem', borderRadius: '9999px' };
      case 'Hard': return { backgroundColor: colors.badgeHardBg, color: colors.badgeHardText, padding: '0.25rem 0.75rem', borderRadius: '9999px' };
      default: return { backgroundColor: 'rgba(128,128,141,0.1)', color: colors.text, padding: '0.25rem 0.75rem', borderRadius: '9999px' };
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
        {data.content && <p style={{ ...typography.p, color: colors.text }}>{data.content}</p>}
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
          <p style={{ ...typography.p, color: colors.text, marginTop: '0.5rem' }}>{data.description}</p>
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

      {data.docReferences?.length > 0 && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Related Documentation</h2>
          <div style={layout.flexColGap('0.5rem')}>
            {data.docReferences.map((ref: any, i: number) => (
              <a
                key={i}
                href="#"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.625rem', border: `1px solid ${colors.cardBorder}`, backgroundColor: colors.cardBg, color: colors.secondary, textDecoration: 'none' }}
                onClick={(e) => { e.preventDefault(); console.log('Navigate to:', ref.docId); }}
              >
                <ExternalLink size={16} />
                <div style={{ flex: 1 }}>
                  <div>{ref.title}</div>
                  {ref.section && <div style={{ fontSize: '0.875rem', color: colors.text }}>Section: {ref.section}</div>}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {data.tasks?.length > 0 && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Tasks</h2>
          <div style={layout.flexColGap('0.75rem')}>
            {data.tasks.map((task: string, i: number) => (
              <div key={i} style={{ ...layout.card, display: 'flex', gap: '0.75rem' }}>
                <span style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', backgroundColor: colors.secondary, color: colors.cardBg }}>{i + 1}</span>
                <p style={{ ...typography.p, color: colors.text }}>{task}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.hints?.length > 0 && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Hints</h2>
          <div style={layout.flexColGap('0.5rem')}>
            {data.hints.map((hint: string, i: number) => (
              <div key={i} style={{ backgroundColor: colors.hintBg, padding: '0.75rem', borderRadius: '0.375rem', color: colors.text }}>
                💡 {hint}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.content && <p style={{ ...typography.p, color: colors.text }}>{data.content}</p>}
    </div>
  );
}

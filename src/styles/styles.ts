// styles.ts
export const colors = {
  primary: '#d17277',     
  secondary: '#74ade9',   
  tertiary: '#1f7fe0',
  quaternary: '#a793d3',
  success: '#66e485ff',
  error: '#d53636ff',
  text: '#80848d',
  cardBg: '#1e2126',
  cardBorder: '#3a3d45',
  badgeEasyBg: 'rgba(116, 173, 233, 0.1)',
  badgeEasyText: '#74ade9',
  badgeMediumBg: 'rgba(209, 114, 119, 0.1)',
  badgeMediumText: '#d17277',
  badgeHardBg: 'rgba(209, 114, 119, 0.1)',
  badgeHardText: '#d17277',
  
  hintBg: '#1e2126',
};

export const typography = {
  h1: { fontSize: '2rem', fontWeight: 500, lineHeight: 1.5 },
  h2: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.5 },
  h3: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.5 },
  h4: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.5 },
  p: { fontSize: '1rem', lineHeight: 1.5 },
};

export const layout = {
  card: { backgroundColor: colors.cardBg, padding: '1rem', borderRadius: '0.625rem', border: `1px solid ${colors.cardBorder}` },
  flexColGap: (gap: string) => ({ display: 'flex', flexDirection: 'column', gap }),
  flexRowGap: (gap: string) => ({ display: 'flex', flexDirection: 'row', gap, alignItems: 'center' }),
};

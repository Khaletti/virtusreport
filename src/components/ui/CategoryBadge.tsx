type Category = 'football' | 'basketball' | 'mma';

const styles: Record<Category, { bg: string; color: string; label: string }> = {
  football:   { bg: '#0D2A3F', color: '#5BA5D9', label: 'Football'   },
  basketball: { bg: '#3D2600', color: '#E89B3A', label: 'Basketball' },
  mma:        { bg: '#2A0A0A', color: '#C96060', label: 'MMA'        },
};

export function CategoryBadge({
  category,
  customLabel,
}: {
  category: string;
  customLabel?: string;
}) {
  const s = styles[category as Category] ?? { bg: '#1E1E1E', color: '#888', label: category };

  return (
    <span style={{
      display:       'inline-block',
      background:    s.bg,
      color:         s.color,
      fontFamily:    'var(--vr-font-ui)',
      fontSize:      '0.6rem',
      fontWeight:    500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding:       '2px 8px',
      borderRadius:  '20px',
    }}>
      {customLabel ?? s.label}
    </span>
  );
}

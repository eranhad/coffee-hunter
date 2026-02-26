'use client';

interface PriceTagProps {
    value: number; // 1–5
    size?: 'sm' | 'md';
}

export function PriceTag({ value, size = 'md' }: PriceTagProps) {
    const fontSize = size === 'sm' ? '13px' : '16px';

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, minWidth: '80px' }}>מחיר</span>
            <span style={{ fontSize, fontWeight: 700, letterSpacing: '1px' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <span
                        key={i}
                        style={{ color: i <= value ? 'var(--primary)' : 'var(--star-empty)', transition: 'color 0.2s' }}
                    >
                        ₪
                    </span>
                ))}
            </span>
        </div>
    );
}

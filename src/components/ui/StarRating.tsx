'use client';

interface StarRatingProps {
    value: number;     // 1–5
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    label?: string;
}

export function StarRating({ value, size = 'md', showValue = true, label }: StarRatingProps) {
    const sizes = { sm: '14px', md: '18px', lg: '22px' };
    const px = sizes[size];

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', direction: 'rtl' }}>
            {label && (
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, minWidth: '80px' }}>
                    {label}
                </span>
            )}
            <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        width={px}
                        height={px}
                        viewBox="0 0 24 24"
                        fill={star <= value ? 'var(--star-filled)' : 'var(--star-empty)'}
                        style={{ flexShrink: 0 }}
                    >
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                ))}
            </div>
            {showValue && (
                <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 700 }}>
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    );
}

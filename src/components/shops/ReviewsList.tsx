'use client';

import { Review } from '@/types';

interface ReviewsListProps {
    reviews: Review[];
}

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'היום';
    if (diffDays === 1) return 'אתמול';
    if (diffDays < 7) return `לפני ${diffDays} ימים`;
    if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? 'לפני שבוע' : `לפני ${weeks} שבועות`;
    }
    if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return months === 1 ? 'לפני חודש' : `לפני ${months} חודשים`;
    }
    return new Date(dateStr).toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function ReviewsList({ reviews }: ReviewsListProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviews.map((review) => (
                <div
                    key={review.id}
                    style={{
                        padding: '16px',
                        background: '#f9fafb',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                color: 'var(--text-muted)',
                            }}
                        >
                            👤
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{review.author}</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{review.date}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: '14px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                            fontStyle: 'italic',
                        }}
                    >
                        "{review.text}"
                    </div>
                </div>
            ))}
        </div>
    );
}

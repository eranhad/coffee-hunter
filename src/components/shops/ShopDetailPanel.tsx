'use client';

import { CoffeeShop } from '@/types';
import { StarRating } from '@/components/ui/StarRating';
import { PriceTag } from '@/components/ui/PriceTag';
import { ReviewsList } from '@/components/shops/ReviewsList';

interface ShopDetailPanelProps {
    shop: CoffeeShop | null;
    onClose: () => void;
}

const SIGNATURE_ORDER = 'הפוך גדול חזק, על בסיס מים, חלב דל';

export function ShopDetailPanel({ shop, onClose }: ShopDetailPanelProps) {
    if (!shop) return null;

    return (
        <div
            style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}
            className="animate-fade-in"
        >
            {/* Back to results */}
            <button
                onClick={onClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    fontFamily: 'Heebo, sans-serif',
                    direction: 'rtl',
                }}
            >
                <span style={{ fontSize: '18px' }}>‹</span>
                Back to results
            </button>

            {/* Shop header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '24px 20px',
                }}
            >
                <div
                    style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: '#e5e7eb',
                        backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=144&h=144&fit=crop')`,
                        backgroundSize: 'cover',
                        flexShrink: 0,
                        border: '1px solid var(--border)',
                    }}
                />
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h2
                            style={{
                                fontSize: '24px',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                lineHeight: 1.1,
                                margin: 0,
                            }}
                        >
                            {shop.name}
                        </h2>
                        {shop.overall >= 4 && (
                            <span
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    border: '1.5px solid var(--primary)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    fontSize: '14px',
                                    fontWeight: 900,
                                    flexShrink: 0,
                                }}
                            >
                                ✓
                            </span>
                        )}
                    </div>
                    <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: 0 }}>
                        📍 {shop.address.includes(',') ? shop.address.split(',')[1]?.trim() : shop.neighborhood}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Custom Order Ranking section */}
                <div>
                    <div
                        style={{
                            fontSize: '12px',
                            fontWeight: 800,
                            color: 'var(--primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '8px',
                        }}
                    >
                        CUSTOM ORDER RANKING
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                        {SIGNATURE_ORDER}
                    </div>
                </div>

                {/* Score card (Coffee Hunter Style) */}
                <div
                    style={{
                        background: 'white',
                        borderRadius: '16px',
                        border: '1px solid var(--border-light)',
                        padding: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        position: 'relative',
                    }}
                >
                    {/* Overall score header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                        <div>
                            <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                                {shop.overall.toFixed(1)}
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                                OVERALL SCORE
                            </div>
                        </div>
                        <div
                            style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                background: '#d1fae5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                color: '#065f46',
                            }}
                        >
                            ☕
                        </div>
                    </div>

                    {/* Individual ratings */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <StarRating value={shop.price} label="Price / Value" size="md" />
                        <StarRating value={shop.taste} label="Taste Profile" size="md" />
                        <StarRating value={shop.strength} label="Espresso Strength" size="md" />
                    </div>
                </div>

                {/* Community Reviews */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <h3
                            style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                margin: 0,
                            }}
                        >
                            ביקורות הקהילה
                        </h3>
                    </div>
                    <ReviewsList reviews={shop.reviews} />
                </div>
            </div>
        </div>
    );
}

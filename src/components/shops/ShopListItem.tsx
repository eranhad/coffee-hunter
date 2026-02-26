'use client';

import { CoffeeShop } from '@/types';

interface ShopListItemProps {
    shop: CoffeeShop;
    isSelected: boolean;
    onClick: () => void;
}

export function ShopListItem({ shop, isSelected, onClick }: ShopListItemProps) {
    const tags: string[] = [];
    if (shop.taste >= 5) tags.push('Specialty');
    if (shop.strength >= 5) tags.push('Extra Strong');
    if (shop.price <= 2) tags.push('Budget Friendly');
    if (shop.price >= 4) tags.push('Premium');

    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
                padding: '16px 20px',
                background: isSelected ? '#f0fdf4' : 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--border-light)',
                cursor: 'pointer',
                textAlign: 'right',
                direction: 'rtl',
                fontFamily: 'Heebo, sans-serif',
                transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.background = '#f9fafb';
            }}
            onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.background = 'transparent';
            }}
        >
            {/* Thumbnail (BrewFinder Style) */}
            <div
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#e5e7eb',
                    backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop')`, // Placeholder
                    backgroundSize: 'cover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid var(--border)',
                }}
            />

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span
                        style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            lineHeight: 1.2,
                        }}
                    >
                        {shop.name}
                    </span>
                    {shop.overall >= 4 && (
                        <span
                            style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: 900,
                                flexShrink: 0,
                            }}
                        >
                            ✓
                        </span>
                    )}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {shop.address.includes(',') ? shop.address.split(',')[0] : shop.neighborhood}
                </div>
                {tags.length > 0 && (
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 400 }}>
                        {tags.join(', ')}
                    </div>
                )}
            </div>
        </button>
    );
}

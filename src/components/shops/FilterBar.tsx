'use client';

interface FilterBarProps {
    selectedRating: number | null;
    onSelectRating: (rating: number | null) => void;
    totalShops: number;
    filteredCount: number;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    showVerifiedOnly: boolean;
    onToggleVerified: () => void;
}

export function FilterBar({
    selectedRating,
    onSelectRating,
    totalShops,
    filteredCount,
    searchQuery,
    onSearchChange,
    showVerifiedOnly,
    onToggleVerified,
}: FilterBarProps) {
    const activeFilterCount = (selectedRating !== null ? 1 : 0) + (showVerifiedOnly ? 1 : 0);

    return (
        <div style={{ borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            {/* Top row: results count + toggles */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                }}
            >
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {filteredCount} תוצאות
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Verified toggle */}
                    <button
                        onClick={onToggleVerified}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: 'var(--text-primary)',
                            fontWeight: 500,
                            fontFamily: 'Heebo, sans-serif',
                            padding: '4px 0',
                        }}
                    >
                        Show verified
                        <div
                            style={{
                                width: '40px',
                                height: '22px',
                                borderRadius: '11px',
                                background: showVerifiedOnly ? 'var(--primary)' : '#d1d5db',
                                position: 'relative',
                                transition: 'background 0.2s',
                            }}
                        >
                            <div
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    position: 'absolute',
                                    top: '2px',
                                    right: showVerifiedOnly ? '2px' : '20px',
                                    transition: 'right 0.2s',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                }}
                            />
                        </div>
                    </button>

                    {/* Filters button */}
                    <button
                        onClick={() => onSelectRating(selectedRating !== null ? null : 4)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'white',
                            border: `1px solid var(--border)`,
                            borderRadius: '8px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            fontFamily: 'Heebo, sans-serif',
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                            <line x1="11" y1="18" x2="13" y2="18" />
                        </svg>
                        Filters
                        {activeFilterCount > 0 && (
                            <span
                                style={{
                                    background: 'var(--text-primary)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                }}
                            >
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Rating filter pills (shown when filter is active) */}
            {selectedRating !== null && (
                <div
                    style={{
                        display: 'flex',
                        gap: '6px',
                        padding: '0 20px 12px',
                        flexWrap: 'wrap',
                    }}
                    className="animate-slide-down"
                >
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => onSelectRating(selectedRating === rating ? null : rating)}
                            style={{
                                padding: '4px 12px',
                                borderRadius: '16px',
                                border: '1px solid',
                                borderColor: selectedRating === rating ? 'var(--primary)' : 'var(--border)',
                                background: selectedRating === rating ? 'var(--primary)' : 'white',
                                color: selectedRating === rating ? 'white' : 'var(--text-secondary)',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                fontFamily: 'Heebo, sans-serif',
                            }}
                        >
                            ★ {rating}+
                        </button>
                    ))}
                </div>
            )}

            {/* Search bar */}
            <div style={{ padding: '0 20px 14px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'var(--bg-light)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="חפש לפי עיר או שם בית קפה..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            flex: 1,
                            border: 'none',
                            background: 'none',
                            outline: 'none',
                            fontSize: '13px',
                            fontFamily: 'Heebo, sans-serif',
                            color: 'var(--text-primary)',
                            direction: 'rtl',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

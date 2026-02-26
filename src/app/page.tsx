'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { coffeeShops } from '@/lib/data';
import { CoffeeShop } from '@/types';
import { ShopDetailPanel } from '@/components/shops/ShopDetailPanel';
import { FilterBar } from '@/components/shops/FilterBar';
import { ShopListItem } from '@/components/shops/ShopListItem';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });

export default function HomePage() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredShops = useMemo<CoffeeShop[]>(() => {
    let result = coffeeShops;

    // Filter by rating
    if (filterRating !== null) {
      result = result.filter((s) => s.overall >= filterRating);
    }

    // Filter by verified (overall >= 4)
    if (showVerifiedOnly) {
      result = result.filter((s) => s.overall >= 4);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.neighborhood.toLowerCase().includes(q)
      );
    }

    return result;
  }, [filterRating, showVerifiedOnly, searchQuery]);

  const selectedShop = useMemo<CoffeeShop | null>(() => {
    if (!selectedShopId) return null;
    return coffeeShops.find((s) => s.id === selectedShopId) ?? null;
  }, [selectedShopId]);

  const handleSelectShop = (shopId: string) => {
    setSelectedShopId(shopId);
  };

  const handleClosePanel = () => {
    setSelectedShopId(null);
  };

  const handleFilterRating = (rating: number | null) => {
    setFilterRating(rating);
    if (rating !== null && selectedShop && selectedShop.overall < rating) {
      setSelectedShopId(null);
    }
  };

  const handleToggleVerified = () => {
    setShowVerifiedOnly((prev) => !prev);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--bg-white)',
        direction: 'rtl',
        fontFamily: 'Heebo, sans-serif',
      }}
    >
      {/* ── Top Header ── */}
      <header
        style={{
          height: '64px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: 'white',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>☕</div>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>BrewFinder</span>
          </div>
          <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: 600 }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Marketplace</a>
            <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '2px solid var(--primary)', paddingBottom: '20px' }}>Coffee Shops</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>My Favorites</a>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📥</span> Inbox <span style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>3</span>
          </button>
          <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            My account ☰
          </button>
        </div>
      </header>

      {/* ── Secondary Banner ── */}
      <div
        style={{
          height: '40px',
          background: 'var(--primary-dark)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: 600,
          gap: '8px',
          zIndex: 90,
        }}
      >
        <span style={{ color: '#fbbf24' }}>★</span> BrewFinder Pro &bull; Access secret menus, barista tips, and more from $4.99/month <span style={{ fontSize: '10px' }}>›</span>
      </div>

      {/* ── Main Content Area ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar (right in RTL) */}
        <aside
          style={{
            width: '440px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            borderLeft: '1px solid var(--border)',
            flexShrink: 0,
            zIndex: 10,
            boxShadow: '4px 0 12px rgba(0,0,0,0.02)',
          }}
          className="sidebar"
        >
          {selectedShop ? (
            <ShopDetailPanel shop={selectedShop} onClose={handleClosePanel} />
          ) : (
            <>
              <FilterBar
                selectedRating={filterRating}
                onSelectRating={handleFilterRating}
                totalShops={coffeeShops.length}
                filteredCount={filteredShops.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                showVerifiedOnly={showVerifiedOnly}
                onToggleVerified={handleToggleVerified}
              />
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredShops.length === 0 ? (
                  <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '40px', marginBottom: '16px' }}>☕</div>
                    <div style={{ fontSize: '15px', fontWeight: 600 }}>לא נמצאו תוצאות</div>
                  </div>
                ) : (
                  filteredShops.map((shop) => (
                    <ShopListItem
                      key={shop.id}
                      shop={shop}
                      isSelected={shop.id === selectedShopId}
                      onClick={() => handleSelectShop(shop.id)}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </aside>

        {/* Map (left in RTL) */}
        <div style={{ flex: 1, position: 'relative', height: '100%' }}>
          <MapView
            shops={filteredShops}
            selectedShopId={selectedShopId}
            onSelectShop={handleSelectShop}
          />
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          height: '40px',
          borderTop: '1px solid var(--border)',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          fontSize: '12px',
          color: 'var(--text-muted)',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>&copy; 2026 BrewFinder</span>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span>English (US)</span>
          <span style={{ cursor: 'pointer' }}>Resources ▾</span>
        </div>
      </footer>

      <style>{`
                @media (max-width: 768px) {
                    .sidebar {
                        position: fixed !important;
                        top: 0 !important;
                        right: 0 !important;
                        bottom: 0 !important;
                        width: 100% !important;
                        z-index: 100 !important;
                    }
                }
            `}</style>
    </div>
  );
}

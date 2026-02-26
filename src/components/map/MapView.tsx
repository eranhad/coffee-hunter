'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import { CoffeeShop } from '@/types';

interface MapViewProps {
    shops: CoffeeShop[];
    selectedShopId: string | null;
    onSelectShop: (shopId: string) => void;
}

const TEL_AVIV_CENTER: [number, number] = [32.0853, 34.7818];
const DEFAULT_ZOOM = 14;

function createMarkerIcon(shop: CoffeeShop, isSelected: boolean) {
    const primary = '#065f46';
    const size = isSelected ? 48 : 40;

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 10}" viewBox="0 0 48 58">
      <path d="M24 56 C24 56, 4 34, 4 20 C4 9, 12.95 0, 24 0 C35.05 0, 44 9, 44 20 C44 34, 24 56, 24 56Z"
        fill="${primary}" stroke="white" stroke-width="2"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
      <circle cx="24" cy="20" r="14" fill="white" opacity="0.1" />
      <text x="24" y="22" text-anchor="middle" font-size="20" fill="white" dominant-baseline="central">☕</text>
    </svg>
  `;

    return { svg, size };
}

export default function MapView({ shops, selectedShopId, onSelectShop }: MapViewProps) {
    const mapRef = useRef<LeafletMap | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<Map<string, any>>(new Map());
    const isInitializing = useRef(false);

    const initMap = useCallback(async () => {
        if (!mapContainerRef.current || mapRef.current || isInitializing.current) return;

        // Final guard: check if Leaflet has already attached to this container
        // Leaflet adds a '_leaflet_id' property to elements it manages
        if ((mapContainerRef.current as any)._leaflet_id) {
            return;
        }

        isInitializing.current = true;

        try {
            const L = (await import('leaflet')).default;

            // Re-check after async import
            if (!mapContainerRef.current || mapRef.current || (mapContainerRef.current as any)._leaflet_id) {
                return;
            }

            const map = L.map(mapContainerRef.current, {
                center: TEL_AVIV_CENTER,
                zoom: DEFAULT_ZOOM,
                zoomControl: true,
                scrollWheelZoom: true,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);

            mapRef.current = map;
        } catch (error) {
            console.error('Failed to initialize map:', error);
        } finally {
            isInitializing.current = false;
        }
    }, []);

    const updateMarkers = useCallback(async () => {
        if (!mapRef.current) return;
        const L = (await import('leaflet')).default;

        // Remove all existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current.clear();

        shops.forEach((shop) => {
            const isSelected = shop.id === selectedShopId;
            const { svg, size } = createMarkerIcon(shop, isSelected);

            const icon = L.divIcon({
                html: svg,
                className: 'coffee-marker',
                iconSize: [size, size + 12],
                iconAnchor: [size / 2, size + 10],
                popupAnchor: [0, -(size + 5)],
            });

            const marker = L.marker([shop.lat, shop.lng], { icon, zIndexOffset: isSelected ? 1000 : 0 })
                .addTo(mapRef.current!)
                .bindPopup(
                    `<div style="direction:rtl;font-family:Heebo,sans-serif;min-width:140px">
                        <strong style="font-size:14px;color:#1a1a2e">${shop.name}</strong>
                        <div style="font-size:12px;color:#9ca3af;margin-top:4px">${shop.neighborhood}</div>
                        <div style="font-size:13px;color:#16a34a;margin-top:6px;font-weight:700">★ ${shop.overall}/5</div>
                    </div>`,
                    { maxWidth: 200, closeButton: false }
                )
                .on('click', () => {
                    onSelectShop(shop.id);
                });

            markersRef.current.set(shop.id, marker);
        });
    }, [shops, selectedShopId, onSelectShop]);

    useEffect(() => {
        initMap().then(updateMarkers);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            updateMarkers();
        }
    }, [shops, selectedShopId, updateMarkers]);

    // Pan to selected shop
    useEffect(() => {
        if (selectedShopId && mapRef.current) {
            const shop = shops.find((s) => s.id === selectedShopId);
            if (shop) {
                mapRef.current.panTo([shop.lat, shop.lng], { animate: true, duration: 0.5 });
            }
        }
    }, [selectedShopId, shops]);

    return (
        <div
            ref={mapContainerRef}
            style={{ width: '100%', height: '100%', background: '#f0f0f0' }}
        />
    );
}

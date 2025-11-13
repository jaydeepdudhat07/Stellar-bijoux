'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface Showroom {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  latitude: number;
  longitude: number;
}

interface ShowroomMapProps {
  showrooms: Showroom[];
  selectedIndex: number | null;
}

// Component to handle map view updates
function MapViewUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5, // Smooth animation duration in seconds
      easeLinearity: 0.25, // Easing for smoother transition
    });
  }, [center, zoom, map]);
  
  return null;
}

export default function ShowroomMap({ showrooms, selectedIndex }: ShowroomMapProps) {
  const [coordinates, setCoordinates] = useState<Map<number, [number, number]>>(new Map());
  const [loading, setLoading] = useState(true);

  // Geocode addresses to get coordinates
  useEffect(() => {
    const geocodeAddresses = async () => {
      const newCoordinates = new Map<number, [number, number]>();
      
      for (let i = 0; i < showrooms.length; i++) {
        const showroom = showrooms[i];
        
        // Use provided coordinates (now required)
        if (showroom.latitude && showroom.longitude) {
          newCoordinates.set(i, [showroom.latitude, showroom.longitude]);
        }
      }
      
      setCoordinates(newCoordinates);
      setLoading(false);
    };

    if (showrooms.length > 0) {
      setLoading(true);
      geocodeAddresses();
    } else {
      setLoading(false);
    }
  }, [showrooms]);

  // Get center point for map
  const getMapCenter = (): [number, number] => {
    if (selectedIndex !== null && coordinates.has(selectedIndex)) {
      return coordinates.get(selectedIndex)!;
    }
    // Default to Surat, India when no showroom is selected
    return [21.1702, 72.8311]; // Surat, Gujarat, India coordinates
  };

  // Get all coordinates for bounds
  const getAllCoordinates = (): [number, number][] => {
    return Array.from(coordinates.values());
  };

  if (typeof window === 'undefined') {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map locations...</p>
        </div>
      </div>
    );
  }

  if (coordinates.size === 0) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Unable to load map. Please check the addresses.</p>
      </div>
    );
  }

  const center = getMapCenter();
  const allCoords = getAllCoordinates();

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={coordinates.size === 1 ? 13 : 2}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        scrollWheelZoom={true}
        key={`${selectedIndex}-${center[0]}-${center[1]}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {showrooms.map((showroom, index) => {
          const coord = coordinates.get(index);
          if (!coord) return null;
          
          const isSelected = selectedIndex === index;
          
          // Custom icon for selected marker (different color - darker gold/red)
          const customIcon = isSelected
            ? L.divIcon({
                className: 'custom-marker-selected',
                html: `<div style="
                  background-color: #B8941F;
                  width: 36px;
                  height: 36px;
                  border-radius: 50% 50% 50% 0;
                  transform: rotate(-45deg);
                  border: 4px solid #fff;
                  box-shadow: 0 4px 12px rgba(184, 148, 31, 0.6);
                  position: relative;
                "><div style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(45deg);
                  width: 12px;
                  height: 12px;
                  background-color: #fff;
                  border-radius: 50%;
                "></div></div>`,
                iconSize: [36, 36],
                iconAnchor: [18, 36],
              })
            : L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                  background-color: #d4af37;
                  width: 24px;
                  height: 24px;
                  border-radius: 50% 50% 50% 0;
                  transform: rotate(-45deg);
                  border: 2px solid white;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                "></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 24],
              });
          
          return (
            <Marker
              key={index}
              position={coord}
              icon={customIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-gray-900 mb-2">{showroom.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">{showroom.address}</p>
                  <p className="text-sm text-gray-700 mb-2">
                    {showroom.city}, {showroom.country}
                  </p>
                  {showroom.phone && (
                    <p className="text-sm text-gray-700">📞 {showroom.phone}</p>
                  )}
                  {showroom.email && (
                    <p className="text-sm text-gray-700">✉️ {showroom.email}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        <MapViewUpdater 
          center={center} 
          zoom={
            selectedIndex !== null 
              ? 16  // Zoom in more when a showroom is selected
              : 12  // Default zoom for Surat view when no showroom is selected
          } 
        />
      </MapContainer>
    </div>
  );
}


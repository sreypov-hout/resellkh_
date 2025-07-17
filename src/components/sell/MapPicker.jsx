// ====== src/components/sell/MapPicker.jsx ======
'use client';

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// IMPORT LEAFLET ITSELF TO OVERRIDE DEFAULTS
import L from 'leaflet';
// This import is crucial for default icon images in Leaflet
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

// FIX FOR LEAFLET DEFAULT ICON PATHS
// This needs to be done once, before any Leaflet map is rendered.
// It tells Leaflet where to find its default marker images.
delete L.Icon.Default.prototype._getIconUrl; // Prevents webpack from trying to bundle them incorrectly
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/marker-icon-2x.png', // Relative path from public folder
  iconUrl: 'leaflet/marker-icon.png',         // Relative path from public folder
  shadowUrl: 'leaflet/marker-shadow.png',     // Relative path from public folder
});


// A helper component to refresh layout (prevents map tile issues)
function MapResizeFixer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100); // wait for container to render
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [map]);

  return null;
}

function LocationMarker({ onSelect, initialPosition }) {
  const [position, setPosition] = useState(initialPosition || null);
  const map = useMap(); // Get map instance

  useEffect(() => {
    // If initialPosition is provided and valid, set marker and center map
    if (initialPosition && initialPosition.lat != null && initialPosition.lng != null) {
      setPosition(initialPosition);
      map.setView(initialPosition, map.getZoom()); // Center map on initial position
    }
  }, [initialPosition, map]); // Dependencies on initialPosition and map instance

  useMapEvents({
    click(e) {
      setPosition(e.latlng); // Update marker position
      onSelect(e.latlng); // Send selected lat/lng to parent
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapPicker({ onLocationSelect, initialCoords }) {
  // Use initialCoords for MapContainer center
  const center = initialCoords ? [initialCoords.lat, initialCoords.lng] : [11.5564, 104.9282];

  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full z-[30]"
        whenCreated={map => { /* console.log("Map created:", map); */ }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelect={onLocationSelect} initialPosition={initialCoords} />
        <MapResizeFixer />
      </MapContainer>
    </div>
  );
}
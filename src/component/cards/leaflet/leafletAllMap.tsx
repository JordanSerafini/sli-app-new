import React, {  useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
  center: { lat: number; lng: number };
  markers: { lat: number; lng: number }[];
  radius: number; 
  zoom?: number;
}

const leafletAllMap: React.FC<Props> = ({ center, markers, radius, zoom }) => {
  
  const FilteredMarkers = () => {
    const map = useMap();

    useEffect(() => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      markers.forEach((marker) => {
        const distance = map.distance(center, marker);
        if (distance <= radius * 1000) {
          L.marker([marker.lat, marker.lng]).addTo(map);
        }
      });
    }, [map]);
    
    return null;
  };

  return (
    <div className='h-full w-full'>
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FilteredMarkers />
    </MapContainer>
    </div>
  );
};

export default leafletAllMap;

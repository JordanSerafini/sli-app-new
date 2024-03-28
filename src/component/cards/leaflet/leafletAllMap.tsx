import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerLogo from "../../../assets/markerLogo.png";

interface Props {
  center: { lat: number; lng: number };
  markers: { lat: number; lng: number }[];
  radius: number;
  zoom?: number;
}

const LeafletAllMap: React.FC<Props> = ({ center, markers, radius, zoom }) => {
  const FilteredMarkers = () => {
    const map = useMap();

    useEffect(() => {

      
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      map.setView(center, zoom || 15);

      markers.forEach((marker) => {
        const distance = map.distance(center, marker);
        if (distance <= radius * 1000) {
          L.marker([marker.lat, marker.lng], {
            icon: L.icon({
              iconUrl: markerLogo,
              iconSize: [28, 35],
              iconAnchor: [12, 41],
              shadowAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          
          }).addTo(map);
        }
      });
    }, [map, center, markers, radius]);

    return null;
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FilteredMarkers />
      </MapContainer>
    </div>
  );
};

export default LeafletAllMap;

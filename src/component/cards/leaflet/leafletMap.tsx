import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  lon: string | null;
  lat: string | null;
  coordsAvailable: boolean;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ lon, lat, coordsAvailable }) => {
    //console.log("lon:", lon);
    //console.log("lat:", lat);
    //console.log("coordsAvailable:", coordsAvailable);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (coordsAvailable && lon && lat) {
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);

      if (!mapRef.current && mapContainerRef.current) {
        mapRef.current = L.map(mapContainerRef.current).setView([latNum, lonNum], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);

        L.marker([latNum, lonNum]).addTo(mapRef.current);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lon, lat, coordsAvailable]);

  return (
    <div className='h-full w-full rounded-lg'>
      {coordsAvailable ? (
        <div className="rounded-2xl" ref={mapContainerRef} style={{ height: '100%', width: '100%' }}></div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          Adresse non trouvée.
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
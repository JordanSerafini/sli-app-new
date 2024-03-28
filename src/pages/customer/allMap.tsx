import { useContext, useEffect, useState } from "react";

import dataContext from "../../context/context/dataContext";
import LeafletAllMap from "../../component/cards/leaflet/leafletAllMap";
import { fetchCustomer } from "../../function/function";

interface markers {
  id: number;
  name: string | null | undefined;
  lat: number;
  lng: number;
}

function AllMap() {
  const { customerList, setCustomerList } = useContext(dataContext);
  const [markers, setMarkers] = useState<markers[]>([]);
  const [center, setCenter] = useState({ lat: 45.9000002, lng: 6.11667 });
  const [radius, setRadius] = useState(0.1);
  const [zoom, setZoom] = useState(17);


  console.log(radius);

  useEffect(() => {
    if (customerList.length === 0) {
      fetchCustomer(setCustomerList);
    }
  }, [setCustomerList, customerList.length]);

  useEffect(() => {
    const newMarkers = customerList.map((customer) => ({
      id: customer.id ? parseInt(customer.id) : 0,
      name: customer.name,
      lat: customer.lat,
      lng: customer.lon,
    }));

    setMarkers(newMarkers);
  }, [customerList]);

  return (
    <div className="h-screen w-screen flex flex-col justify-start gap-4">
      <div>
        <LeafletAllMap
          center={center}
          markers={markers}
          radius={radius}
          zoom={zoom}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-center w-9.5/10 bg-white">
          <div className="zoom-control">
            <label htmlFor="zoom-range">Rayon recherche: {radius} km </label>
            <input
              id="zoom-range"
              type="range"
              min="0.05"
              max="10"
              step="0.5"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMap;

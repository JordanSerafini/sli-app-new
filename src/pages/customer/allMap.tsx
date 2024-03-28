import { useContext, useEffect, useState } from "react";
import dataContext from "../../context/context/dataContext";
import LeafletAllMap from "../../component/cards/leaflet/leafletAllMap";
import { fetchCustomer } from "../../function/function";

interface Marker {
  id: number;
  name: string | null | undefined;
  lat: number;
  lng: number;
}

function AllMap() {
  const { customerList, setCustomerList } = useContext(dataContext);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [center, setCenter] = useState({ lat: 45.9000002, lng: 6.11667 });
  const [radius, setRadius] = useState(0.3);
  const [zoom, setZoom] = useState(15);
  const [address, setAddress] = useState("Annecy");


  useEffect(() => {
    if (customerList.length === 0) {
      fetchCustomer(setCustomerList);
    }
  }, [setCustomerList, customerList.length]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (isNaN(radius)) {
      setRadius(0.1);
    }
  }, [radius]);

  useEffect(() => {
    const newMarkers = customerList.map((customer) => ({
      id: customer.id ? parseInt(customer.id) : 0,
      name: customer.name,
      lat: customer.lat,
      lng: customer.lon,
    }));

    setMarkers(newMarkers);
  }, [customerList]);

  const handleAddress = () => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const newCenter = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          };
          setCenter(newCenter);
        }
      });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-start gap-4">
      <LeafletAllMap
        center={center}
        markers={markers}
        radius={radius}
        zoom={zoom}
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center justify-center w-9.5/10 bg-white">
          <div>
            <input
              id="address-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-1 border-secondary rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="button" onClick={handleAddress}>
              Valider
            </button>
          </div>
          <div className="flex flex-row justify-evenly w-full items-center">
            <label htmlFor="radius-input">Rayon recherche :</label>
            <div className="flex gap-1 items-center">
              <input
                id="radius-input"
                type="number"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value))}
                className="border-1 border-secondary rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary focus:"
              />
              km
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default AllMap;

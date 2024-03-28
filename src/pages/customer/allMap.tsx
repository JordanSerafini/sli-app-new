import {  useContext, useEffect, useState } from "react";
import dataContext from "../../context/context/dataContext";
import LeafletAllMap from "../../component/cards/leaflet/leafletAllMap";
import { fetchCustomer } from "../../function/function";

import ButtonFull from "../../component/button/buttonFull";
import CustomerNavbar from "../../component/nav/customerNavBar";
import { Customer } from "../../types/customer";

interface Marker {
  id: number;
  name: string;
  address: string;
  tel: string;
  lat: number;
  lng: number;
}

function AllMap() {
  const { customerList, setCustomerList } = useContext(dataContext);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [center, setCenter] = useState({ lat: 45.9000002, lng: 6.11667 });
  const [radius, setRadius] = useState(0.3);
  const [address, setAddress] = useState("Annecy");

  const zoom = 16;

  // ---------------------------------------------------------------------------------- Premier fetch a l'initialisation de la page pour récupérer la liste des clients
  useEffect(() => {
    if (customerList.length === 0) {
      fetchCustomer(setCustomerList);
    }
  }, [setCustomerList, customerList.length]);

  // ---------------------------------------------------------------------------------- Récupération de la position de l'utilisateur pour centrer la carte //? OPTIONNEL
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  //----------------------------------------------------------------------------------  Vérification de la validité du rayon //? si le rayon est invalide, on le remet à 0.1
  useEffect(() => {
    if (isNaN(radius)) {
      setRadius(0.1);
    }
  }, [radius]);

  // Construction de l'adresse pour les markers
  const buildAddress = (customer: Customer) => {
    return `${customer.maindeliveryaddress_address1} ${customer.maindeliveryaddress_zipcode} ${customer.maindeliveryaddress_city}`;
  };
  // ---------------------------------------------------------------------------------- Mise à jour des markers à chaque changement de la liste des clients
useEffect(() => {
    const newMarkers = customerList.map((customer) => ({
        id: customer.id ? parseInt(customer.id) : 0,
        name: customer.name ?? "",
        address: buildAddress(customer),
        tel: customer.maindeliverycontact_cellphone ?? customer.maindeliverycontact_phone ?? "",
        lat: customer.lat,
        lng: customer.lon,
    }));

    setMarkers(newMarkers);
}, [customerList]);

  // ---------------------------------------------------------------------------------- Gestion de la recherche d'adresse, envoie a l'api et récupération des coordonnées
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
    <div className="h-screen w-screen flex flex-col justify-start gap-4 pb-14">
      <LeafletAllMap
        center={center}
        markers={markers}
        radius={radius}
        zoom={zoom}
      />
      <div className="flex flex-col items-center gap-2">
        {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className="flex flex-row w-10/10 justify-evenly">
          <input
            id="address-input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-7/10 text-center text-primary rounded-full border-1 border-secondary p-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <ButtonFull
            onClick={handleAddress}
            title="Valider"
            css="w-2/10 rounded-sm"
          />
        </div>
                {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        <div className="flex flex-col gap-2 items-center justify-center w-9.5/10 bg-white">
          <div className="flex flex-row justify-evenly w-10/10 items-center p-2">
            <label htmlFor="radius-input" className="text-sm w-/10">
              Rayon de recherche :
            </label>
            <div className="flex gap-1 items-center w-/10">
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
      < CustomerNavbar setShowModal={function (): void {
              throw new Error("Function not implemented.");
          } } showModal={false} />
    </div>
  );
}

export default AllMap;

import { Customer } from "../../types/customer";
import axios from "axios";
import url from "../../utils/axios";
import { useState } from "react";

import mapLogo from "../../assets/mapLogo.png";
import mailLogo from "../../assets/mailLogo.png";
import LeafletMap from "./leaflet/leafletMap";

function CustomerDetail({ customer }: { customer: Customer }) {
  const [showMap, setShowMap] = useState(false);
  const [coordsAvailable, setCoordsAvailable] = useState(true);

  //console.log(customer);

  const handleMapClick = async () => {
    if (!customer.lon || !customer.lat) {
      const coordsFound = await geocodeAddressAndSave(customer, address);
      setCoordsAvailable(coordsFound || false);
    } else {
      setCoordsAvailable(true);
    }
    setShowMap(!showMap);
  };

  const buildAddress = () => {
    const parts = [
      customer.maininvoicingaddress_address1,
      customer.maininvoicingaddress_address2,
      customer.maininvoicingaddress_address3,
      customer.maininvoicingaddress_zipcode,
      customer.maininvoicingaddress_city,
      customer.maininvoicingaddress_state,
    ];
    return parts.filter((part) => part).join(" ");
  };

  const name = `${
    customer.maininvoicingcontact_name ? customer.maininvoicingcontact_name : ""
  } ${
    customer.maininvoicingcontact_firstname
      ? customer.maininvoicingcontact_firstname
      : ""
  }`.trim();

  const address = buildAddress();

  async function geocodeAddressAndSave(customer: Customer, address: string) {
    if (!customer.lon  || !customer.lat || customer.lon === null || customer.lat === null) {
      try {
        // Tentative de récupération des coordonnées géographiques à partir de l'adresse
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            format: "json",
            q: address,
          },
        });
        console.log(response.data);
  
        // Vérifie si la réponse contient des données utiles et mettez à jour les coordonnées du client
        if (response.data && response.data.length > 0) {
          try {
            const lat = parseFloat(response.data[0].lat);
            const lon = parseFloat(response.data[0].lon);
            
            await axios.post(`${url.main}/insertCoordinate`, {
              longitude: lon,
              latitude: lat,
              id: customer.id,
            });
            return true; // Retourne true lorsque la mise à jour a réussi
          } catch (innerError) {
            console.error("Erreur lors de l'enregistrement des coordonnées", innerError);
            return false;
          }
        } else {
          console.error("Adresse non trouvée");
          return false;
        }
      } catch (error) {
        // Gestion des erreurs liées à la récupération des coordonnées géographiques
        console.error("Erreur lors du géocodage de l'adresse", error);
        return false;
      }
    } else {
      console.log("Les coordonnées sont déjà présentes");
      return true;
    }
  }
  

  return (
    <div className="bg-white h-9.5/10 w-full p-2 rounded-2xl flex flex-col gap-4">
      {showMap ? (
        <>
          <LeafletMap
            lon={customer.lon}
            lat={customer.lat}
            coordsAvailable={coordsAvailable}
          />

          <img
            src={mapLogo}
            className="h-8 w-8"
            alt=""
            onClick={handleMapClick}
          />
        </>
      ) : (
        <>
          {/* Détails du client */}
          <div className="flex flex-row gap-4 justify-between ">
            <div>{name}</div>
            <div>{customer.name}</div>
          </div>

          {/* Email */}

          {customer.maininvoicingcontact_email && (
            <div className="flex flex-row items-center gap-1">
              <img src={mailLogo} alt="Email" className="h-8" />
              <a
                href={`mailto:${customer.maininvoicingcontact_email}`}
                className="text-primary"
              >
                {customer.maininvoicingcontact_email}
              </a>
            </div>
          )}
          {address && <div>{address}</div>}

          <img
            src={mapLogo}
            className="h-8 w-8"
            alt=""
            onClick={handleMapClick}
          />
        </>
      )}
    </div>
  );
}

export default CustomerDetail;

import { Customer } from "../../types/customer";
import axios from "axios";
import url from "../../utils/axios";
import { useState } from "react";

import mapLogo from "../../assets/mapLogo.png";
import mailLogo from "../../assets/mailLogo.png";
import telLogo from "../../assets/telLogo.png";
import LeafletMap from "./leaflet/leafletMap";

type SetShowMapType = React.Dispatch<React.SetStateAction<boolean>>;


function CustomerDetail({ customer, showMap, setShowMap }: { customer: Customer, showMap: boolean, setShowMap: SetShowMapType }) {
  const [coordsAvailable, setCoordsAvailable] = useState(true);

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
    if (
      !customer.lon ||
      !customer.lat ||
      customer.lon === null ||
      customer.lat === null
    ) {
      try {
        // Tentative de récupération des coordonnées géographiques à partir de l'adresse
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              format: "json",
              q: address,
            },
          }
        );
        //console.log(customer.id);

        // Vérifie si la réponse contient des données utiles et mettez à jour les coordonnées du client
        if (response.data && response.data.length > 0) {
          try {
            const lat = parseFloat(response.data[0].lat);
            const lon = parseFloat(response.data[0].lon);

            await axios.post(`${url.main}/insertCoordinate`, {
              lon: lon,
              lat: lat,
              id: customer.id,
            });

            return true;
          } catch (innerError) {
            console.error(
              "Erreur lors de l'enregistrement des coordonnées",
              innerError
            );
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

  let commercialName = "";
  switch (customer.colleagueid) {
    case "PR": {
      commercialName = "Pascal Rey";
      break;
    }

    default: {
      commercialName = "Inconnu";
      break;
    }
  }

  console.log(customer);

  return (
    <div className="bg-white h-9.5/10 w-full p-2 rounded-2xl flex flex-col gap-4 justify-between">
      {showMap ? (
        <>
          <LeafletMap
            lon={customer.lon}
            lat={customer.lat}
            coordsAvailable={coordsAvailable}
          />

          <img
            src={mapLogo}
            className="h-8 w-8 self-end"
            alt=""
            onClick={handleMapClick}
          />
        </>
      ) : (
        <>
          {/* Détails du client 
          <div className="flex flex-row gap-4 justify-between ">
            <div>{name}</div>
            <div>{customer.name}</div>
          </div>
          */}
          {/*  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          <div className="border-2 border-secondary p-2 flex flex-col gap-6 h-8/10 w-9/10 self-center">
            <h3 className="text-center bold text-secondary tracking-widest border-b-2 p-2 border-secondary w-9/10 self-center">
              Contact: {name}
            </h3>
            {/* Email */}
            <div className="flex flex-row w-full justify-between">
              {/* Téléphone */}

              {customer.maindeliverycontact_cellphone && (
                <div className="flex flex-row items-center gap-2">
                  <img src={telLogo} alt="Téléphone" className="h-6" />
                  <a
                    href={`tel:${customer.maindeliverycontact_cellphone}`}
                    className="text-primary"
                  >
                    {customer.maindeliverycontact_cellphone}
                  </a>
                </div>
              )}
              {customer.maininvoicingcontact_phone && (
                <div className="flex flex-row items-center gap-2">
                  <img src={telLogo} alt="Téléphone" className="h-6" />
                  <a
                    href={`tel:${customer.maininvoicingcontact_phone}`}
                    className="text-primary"
                  >
                    {customer.maininvoicingcontact_phone}
                  </a>
                </div>
              )}
            </div>
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

            {customer.notesclear && (
              <div className="flex flex-row gap-4 h-full">
                <h4 className="">Infos:</h4>
                <div className="text-xs overflow-auto max-h-10/10">
                  {customer.notesclear}
                </div>
              </div>
            )}

            {address && 
            <div className="self-center pb-4 libre-baskerville-regular-italic">
              {address}
            </div>}
          </div>
          <div className="flex flex-row gap-2 w-5/10 justify-between self-center h-1/10">
            <div className="flex flex-row gap-2">
              <h4>
                {customer.currentamount
                  ? customer.currentamount < 0
                    ? "Débit :"
                    : "Crédit :"
                  : "Solde nul"}
              </h4>
              <p
                className={
                  customer.currentamount
                    ? customer.currentamount < 0
                      ? "text-red-500"
                      : "text-green-500"
                    : ""
                }
              >
                {customer.currentamount}
              </p>
            </div>
            <div className="flex flex-row gap-1">
              <h4>Commercial :</h4>
              <p>{commercialName}</p>
            </div>
          </div>
          <div className="h-1/10  self-end">
          <img
            src={mapLogo}
            className="h-8 w-8"
            alt=""
            onClick={handleMapClick}
          />
        </div>
        </>
      )}
    </div>
  );
}

export default CustomerDetail;

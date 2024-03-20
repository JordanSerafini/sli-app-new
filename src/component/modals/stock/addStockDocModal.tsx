import { useEffect, useState, useContext, SetStateAction } from "react";
import { fetchDepot, fetchItems } from "../../../function/function";
import closeLogo from "../../../assets/closeLogo.png";
import { Storehouse } from "../../../types/stockDoc";
import Button from "../../button/buttonFull";
import dataContext from "../../../context/context/dataContext";
import { Item } from "../../../types/item";

interface DevisLineItem {
  id: string;
  caption: string;
  quantity: string;
  price: string;
}

function AddStockDocModal({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) {
  const [depotAvailable, setDepotAvailable] = useState<Storehouse[]>([]);
  const { itemList, setItemList } = useContext(dataContext);
  const [itemToAdd, setItemToAdd] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");

  const [formData, setFormData] = useState({
    storehouseid: "",
    reference: "",
    documenttype: "",
    notesclear: "",
    devisLine: [] as DevisLineItem[],
  });

  const handleChangeForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedItemId(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const depotData = await fetchDepot();
        if (depotData && depotData.rows) {
          setDepotAvailable(depotData.rows);
        }
      } catch (error) {
        console.error("Error fetching depot: ", error);
      }
    };
    fetchData();

    fetchItems(setItemList);
  }, [setItemList]);

  const handleItemList = () => {
    const selectedItem = itemList.find((item) => item.id === selectedItemId);

    if (selectedItem) {
      setItemToAdd([...itemToAdd, selectedItem]);
      const quantityInput = prompt("Veuillez entrer la quantité :") || "";

      const quantity = parseFloat(quantityInput);
      if (!isNaN(quantity)) {
        const price = (selectedItem.salepricevatincluded * quantity).toString();

        const newDevisLine = {
          id: selectedItem.id,
          caption: selectedItem.caption,
          quantity: quantityInput,
          price: price,
        };

        setFormData((prevState) => ({
          ...prevState,
          devisLine: [...prevState.devisLine, newDevisLine],
        }));
      } else {
        console.error("Veuillez saisir une quantité valide.");
      }
    } else {
      console.error("L'élément sélectionné n'a pas été trouvé dans la liste.");
    }
  };

  const submitClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/addStockDoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Document de stock ajouté avec succès");
        setShowModal(false);
      } else {
        throw new Error("Une erreur s'est produite lors de l'ajout du document de stock");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du document de stock:", error);
      alert("Une erreur s'est produite lors de l'ajout du document de stock");
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 w-full h-screen">
      <div className=" border-2 border-secondary h-9/10 mb-16  rounded-2xl z-50 flex flex-col gap-2 text-gray-600 relative bg-white w-9.5/10 sm:w-4/5 overflow-hidden  ">
        {/* ------------------------------------ Titre Entete + closeLogo------------------- */}
        <div className="bg-grayblue rounded-t-xl h-1/10 text-center text-white items-center justify-center flex ">
          Formulaire ajout document de stock
        </div>

        <div className="absolute top-1 right-2">
          <button onClick={handleCloseModal}>
            <img src={closeLogo} alt="Close" className="h-4 m-" />
          </button>
        </div>

        {/* ------------------------------------ Formulaire ------------------- */}
        <form
          className="flex flex-col gap-6 w-10/10 h-full overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 w-full items-center h-4/10 p-2 ">
            <label className="text-center gap-2 flex flex-row  pt-2 items-center">
              Reference:
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChangeForm}
                className="border-1 border-secondary rounded-md p-1 w-8/10 self-center focus:border-primary focus:outline-none"
              />
            </label>
            <div className="w-full flex flex-row justify-between gap-6">
              <label className="flex gap-2">
                <select
                  name="documenttype"
                  value={formData.documenttype}
                  onChange={handleChangeForm}
                  className="w-full border-1 border-secondary rounded-md  focus:border-primary focus:outline-none"
                >
                  <option value="">Catégorie :</option>
                  <option value="bon_entree">Bon Entrée</option>
                  <option value="bon_livraison">Bon Livraison</option>
                  <option value="bon_sortie">Bon Sortie</option>
                  <option value="ordre_transfert">Ordre de Transfert</option>
                  <option value="bon_transfert">Bon Transfert</option>
                </select>
              </label>
              <label className="flex gap-2">
                <select
                  name="storehouseid"
                  value={formData.storehouseid}
                  onChange={handleChangeForm}
                  className="w-full border-1 border-secondary rounded-md  focus:border-primary focus:outline-none"
                >
                  <option value="">Dépôt :</option>
                  {depotAvailable.map((depot) => (
                    <option key={depot.id} value={depot.id}>
                      {depot.caption}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col justify-center items-center w-full">
              Notes:
              <textarea
                name="notesclear"
                value={formData.notesclear}
                onChange={handleChangeForm}
                className="border-1 border-secondary h-20 w-full rounded-xl p-2 focus:border-primary focus:outline-none"
              ></textarea>
            </label>
          </div>
          {/* ------------------------------------ sélectionner item à ajouter ------------------- */}
          <div className="overflow-hidden h-full flex flex-col justify-between">
            {/* ------------------------------------ Tableau item a ajouter ------------------- */}

            <div className="border-1 border-secondary p-2 overflow-auto h-6/10 w-9.5/10 self-center">
              <div className="">
                {formData.devisLine.length > 0 &&
                  formData.devisLine.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-2 overflow-auto justify-between p-2 border-b-1 border-secondary"
                    >
                      <p className="text-xs max-w-6/10">{item.caption}</p>
                      <p className="text-xs">{item.quantity}</p>
                      <p className="text-xs">{item.price}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* ------------------------------------ Select et addbtn ------------------- */}
            <div className="w-full flex flex-row justify-evenly ">
              <select
                name="selectedItem"
                onChange={handleChange}
                className="w-8/10 border-1 p-1 bg-secondary text-w rounded-md focus:border-primary focus:outline-none"
                value={selectedItemId}
              >
                {itemList.map((item, index) => (
                  <option key={index} value={item.id} className="bg-white">
                    {item.caption}
                  </option>
                ))}
              </select>
              <button onClick={handleItemList} className="w-8 h-full bg-primary text-white rounded-full">+</button>
            </div>
            {/* ------------------------------------ SubmitBtn ------------------- */}
            <Button title="Soumettre" onClick={submitClick} css="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStockDocModal;

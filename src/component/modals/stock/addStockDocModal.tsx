import { useEffect, useState, useContext } from "react";
import { fetchDepot, fetchItems } from "../../../function/function";
import closeLogo from "../../../assets/closeLogo.png";
import { Storehouse } from "../../../types/stockDoc";
import Button from "../../button/buttonFull";
import dataContext from "../../../context/context/dataContext";
import { Item } from "../../../types/item";

function AddStockDocModal({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    storehouseid: "",
    reference: "",
    documenttype: "",
    notesclear: "",
    selectedItem: "", // Ajout de la propriété selectedItem
  });

  const [depotAvailable, setDepotAvailable] = useState<Storehouse[]>([]);
  const { itemList, setItemList } = useContext(dataContext);
  const [itemToAdd, setItemToAdd] = useState<Item[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
    const selectedItem = itemList.find((item) => item.id === formData.selectedItem);
    if (selectedItem) {
      setItemToAdd([...itemToAdd, selectedItem]);
    }
  };

  const submitClick = () => {
    console.log("submit");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 w-full">
      <div className="border-2 border-secondary h-9/10 mb-16 bg-white rounded-2xl z-50 flex flex-col p-2 gap- text-gray-600 relative w-11/12 sm:w-4/5">
        <div className="absolute top-2 right-2">
          <button onClick={handleCloseModal}>
            <img src={closeLogo} alt="Close" className="h-4 m-" />
          </button>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label>
              Type de document:
              <select
                name="documenttype"
                value={formData.documenttype}
                onChange={handleChange}
              >
                <option value="">Selectionner un type</option>
                <option value="bon_entree">Bon Entrée</option>
                <option value="bon_livraison">Bon Livraison</option>
                <option value="inventaire">Inventaire</option>
                <option value="bon_sortie">Bon Sortie</option>
                <option value="ordre_transfert">Ordre de Transfert</option>
                <option value="bon_transfert">Bon Transfert</option>
              </select>
            </label>
            <label>
              Dépôt:
              <select
                name="storehouseid"
                value={formData.storehouseid}
                onChange={handleChange}
              >
                <option value="">Sélectionner un dépôt</option>
                {depotAvailable.map((depot) => (
                  <option key={depot.id} value={depot.id}>
                    {depot.caption}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Reference:
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
              />
            </label>
            <label>
              Notes:
              <textarea
                name="notesclear"
                value={formData.notesclear}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
          {/* ------------ sélectionner item à ajouter ------- */}
          <div className="border-1 border-primary min-h-5/10">
            <ul>
              {itemToAdd.map((item, index) => (
                <li key={index}>{item.caption}</li>
              ))}
            </ul>
            </div>
            <h2>Ajouter un article</h2>
            {/* Affichage du select avec les éléments de itemList */}
            <select
              name="selectedItem"
              value={formData.selectedItem}
              onChange={handleChange}
            >
              {itemList.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.caption}
                </option>
              ))}
            </select>
            <button onClick={handleItemList}>ADD</button>
            <Button title="Soumettre" onClick={submitClick} css="w-full" />
        </form>
      </div>
    </div>
  );
}

export default AddStockDocModal;

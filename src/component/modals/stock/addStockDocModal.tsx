import { useEffect, useState, useContext } from "react";
import { fetchDepot, fetchItems } from "../../../function/function";
import closeLogo from "../../../assets/closeLogo.png";
import {  Storehouse } from "../../../types/stockDoc";
import Button from "../../button/buttonFull";
import dataContext from "../../../context/context/dataContext";
import { Item } from "../../../types/item";

function AddStockDocModal({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) {
  const [depotAvailable, setDepotAvailable] = useState<Storehouse[]>([]);
  const { itemList, setItemList } = useContext(dataContext);
  const [itemToAdd, setItemToAdd] = useState<Item[]>([]);


  const [formData, setFormData] = useState({
    storehouseid: "",
    reference: "",
    documenttype: "",
    notesclear: "",
    devisLine: [
      {
        id: "",
        caption: "",
        quantity: "",
      },
    ],
  });

 
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };


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
    const selectedItem = itemList.find(
      (item) => item.id === formData.devisLine
    );
    if (selectedItem) {
      setItemToAdd([...itemToAdd, selectedItem]);
    }
  };

  const submitClick = () => {
    console.log("submit");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 w-full h-screen">
      <div className=" border-2 border-secondary h-9/10 mb-16  rounded-2xl z-50 flex flex-col gap- text-gray-600 relative bg-white w-9.5/10 sm:w-4/5 overflow-hidden ">
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
          className="p-2 flex flex-col gap-6 w-10/10 h-full overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 w-full items-center h-4/10 ">
            <label className="text-center gap-2 flex flex-row  pt-2 items-center">
              Reference:
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="border-1 border-secondary rounded-md p-1 w-8/10 self-center focus:border-primary focus:outline-none"
              />
            </label>
            <div className="w-full flex flex-row justify-between gap-6">
              <label className="flex gap-2">
                <select
                  name="documenttype"
                  value={formData.documenttype}
                  onChange={handleChange}
                  className="w-full border-1 border-secondary rounded-md  focus:border-primary focus:outline-none"
                >
                  <option value="">Catégorie :</option>
                  <option value="bon_entree">Bon Entrée</option>
                  <option value="bon_livraison">Bon Livraison</option>
                  <option value="inventaire">Inventaire</option>
                  <option value="bon_sortie">Bon Sortie</option>
                  <option value="ordre_transfert">Ordre de Transfert</option>
                  <option value="bon_transfert">Bon Transfert</option>
                </select>
              </label>
              <label className="flex gap-2">
                <select
                  name="storehouseid"
                  value={formData.storehouseid}
                  onChange={handleChange}
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
                onChange={handleChange}
                className="border-1 border-secondary h-20 w-full rounded-xl p-2 focus:border-primary focus:outline-none"
              ></textarea>
            </label>
          </div>
          {/* ------------------------------------ sélectionner item à ajouter ------------------- */}
          <div className="overflow-hidden h-full flex flex-col gap-4">
            {/* ------------------------------------ Tableau item a ajouter ------------------- */}

            <div className="border-1 border-secondary p-2 overflow-auto h-6/10  ">
              <div className="">
                {itemToAdd.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-2 overflow-auto justify-between p-2 border-b-1 border-secondary "
                  >
                    <p className="text-xs max-w-6/10">{item.caption}</p>
                    <p className="text-xs">quantité</p>
                    <p className="text-xs">{item.salepricevatincluded}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* ------------------------------------ Select et addbtn ------------------- */}
            <div className="">
              <select
                name="selectedItem"
                value={formData.devisLine}
                onChange={handleChange}
                className=""
              >
                {itemList.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.caption}
                  </option>
                ))}
              </select>
              <button onClick={handleItemList}>ADD</button>
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

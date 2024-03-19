import { useEffect, useState } from "react";
import { fetchDepot } from "../../../function/function";
import closeLogo from "../../../assets/closeLogo.png";
import { Storehouse } from "../../../types/stockDoc";
import Button from "../../button/buttonFull";

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
  });

  const [depotAvailable, setDepotAvailable] = useState<Storehouse[]>([]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const depotData = await fetchDepot();
        if (depotData && depotData.rows) {
          // Si depotData.rows existe, vous pouvez l'utiliser pour définir depotAvailable
          setDepotAvailable(depotData.rows);
        }
      } catch (error) {
        console.error("Error fetching depot: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 w-full">
                {/* -------------------------------------------------------------FORM DIV ------------------------------------------------------------- */}

      <div className="border-2 border-secondary h-9/10 mb-16 bg-white rounded-2xl z-50 flex flex-col p-2 gap- text-gray-600 relative w-11/12 sm:w-4/5">
        <div className="absolute top-2 right-2">
          <button onClick={handleCloseModal}>
            <img src={closeLogo} alt="Close" className="h-4 m-" />
          </button>
        </div>
        {/* ------------------------------------------------------------- Partie Stock Document ------------------------------------------------------------- */}
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
                {/* Utilisez map pour créer des options à partir de depotAvailable */}
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
        {/* ------------------------------------------------------------- Partie Document Line------------------------------------------------------------- */}
                    <div className="border-1 border-primary min-h-5/10">

                    </div>
            <Button
              title="Soumettre"
              onClick={handleSubmit}
              css="w-full"
            />
         
        </form>
      </div>
    </div>
  );
}

export default AddStockDocModal;

import { useState } from "react";
import closeLogo from "../../assets/closeLogo.png";
import InputPerso from "../labels/input";

function AddItemModal({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    nom: "",
    famille: "",
    fournisseur: "",
    prix: "",
    depot: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Envoyer les données à l'API ou effectuer d'autres actions ici
    console.log(formData);
    // Réinitialiser le formulaire
    setFormData({
      nom: "",
      famille: "",
      fournisseur: "",
      prix: "",
      depot: "",
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="border-2 border-primary w-8.5/10 h-9.5/10 fixed bg-white rounded-2xl z-50 flex flex-col items-center">
      <div className="self-end m-2">
        <button onClick={closeModal} className="">
          <img src={closeLogo} alt="" className="h-4" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="h-full w-full flex flex-col gap-2 items-center"
      >
        <label>
          Nom:
          <InputPerso
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
        </label>
        <label>
          Famille:
          <select
            name="famille"
            value={formData.famille}
            onChange={handleSelectChange}
          >
            <option value="">Sélectionnez une famille...</option>
            <option value="famille1">Famille 1</option>
            <option value="famille2">Famille 2</option>
            <option value="famille3">Famille 3</option>
          </select>
        </label>
        <label>
          Fournisseur:
          <select
            name="fournisseur"
            value={formData.fournisseur}
            onChange={handleSelectChange}
          >
            <option value="">Sélectionnez une fournisseur...</option>
            <option value="fournisseur1">fournisseur 1</option>
            <option value="fournisseur2">fournisseur 2</option>
            <option value="fournisseur3">fournisseur 3</option>
          </select>
        </label>
        <label>
          Prix:
          <InputPerso
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
          />
        </label>
        <label>
          Dépôt:
          <InputPerso
            type="text"
            name="depot"
            value={formData.depot}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Ajouter l'article</button>
      </form>
    </div>
  );
}

export default AddItemModal;

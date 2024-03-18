import { useState } from "react";
import closeLogo from "../../assets/closeLogo.png";
import InputPerso from "../labels/input";

import ButtonFull from "../../component/button/buttonFull";

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
    description: "",
    note: "",
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
    console.log(formData);
    // Réinitialiser le formulaire
    setFormData({
      nom: "",
      famille: "",
      fournisseur: "",
      prix: "",
      depot: "",
      description: "",
      note: "",
    });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="border-2 border-secondary w-8.5/10 h-9.5/10 fixed bg-white rounded-2xl z-50 flex flex-col p-2">
      {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <div className="self-end m-2">
        <button onClick={closeModal} className="">
          <img src={closeLogo} alt="" className="h-4" />
        </button>
      </div>
      {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <form
        onSubmit={handleSubmit}
        className="h-full w-full flex flex-col items-center gap-6"
      >
        <label className="w-10/10 flex flex-row items-center gap-2">
          Nom:
          <InputPerso
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
        </label>
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        <label className="w-full flex flex-row justify-between items-center">
          <h4 className="">Famille:</h4>
          <select
            name="famille"
            value={formData.famille}
            onChange={handleSelectChange}
            className="w-6/10 border-2 rounded-2xl focus:border-primary p-1 "
          >
            <option value="">Choisir une famille</option>
            <option value="famille1">Famille 1</option>
            <option value="famille2">Famille 2</option>
            <option value="famille3">Famille 3</option>
          </select>
        </label>
        <label className="w-full flex flex-row justify-between items-center">
          <h4>Fournisseur:</h4>
          <select
            name="fournisseur"
            value={formData.fournisseur}
            onChange={handleSelectChange}
            className="w-6/10 border-2 rounded-2xl focus:border-primary p-1 "
          >
            <option value="">Choisir un fournisseur</option>
            <option value="fournisseur1">fournisseur 1</option>
            <option value="fournisseur2">fournisseur 2</option>
            <option value="fournisseur3">fournisseur 3</option>
          </select>
        </label>
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        <div className="flex flex-row gap-4">
          <label className="flex gap-2 items-center">
            Prix:
            <InputPerso
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
            />
          </label>
          <label className="flex gap-2 items-center">
            Dépôt:
            <InputPerso
              type="text"
              name="depot"
              value={formData.depot}
              onChange={handleChange}
            />
          </label>
        </div>
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        {/* Champ de texte pour la description */}
        <label className="w-10/10 flex flex-col gap-2 ">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChangeTextArea}
            className="border-2 focus:border-primary p-1 "
          ></textarea>
        </label>
        <label className="w-10/10 flex flex-col gap-2 ">
          Note:
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChangeTextArea}
            className="border-2 focus:border-primary p-1 "
          ></textarea>
        </label>
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        <ButtonFull
          title="Ajouter l'article"
          onClick={(e: React.FormEvent) => handleSubmit(e)}
        ></ButtonFull>
      </form>
    </div>
  );
}

export default AddItemModal;

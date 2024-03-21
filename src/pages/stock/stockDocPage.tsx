import { useContext, useEffect, useState } from "react";
import {  StockDocumentLine } from "../../types/stockDoc";
import { fetchStockDoc, fetchStockDocDetails } from "../../function/function";


import AddBEModal from "../../component/modals/stock/addStockDocModal";
import StockNavbar from "../../component/nav/stockNavBar";
import dataContext from "../../context/context/dataContext";

function StockDocPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [documentsLines, setDocumentsLines] = useState<StockDocumentLine[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const { stockDocs, setStockDocs } = useContext(dataContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchStockDoc();
        if (setStockDocs) {
          setStockDocs(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, [setStockDocs]);
  
  const handleClick = async () => {
    setShowDetails(!showDetails);
  };

  const handleDetails = async (id: string, prefix: string) => {
    setTitle("");
    setDocumentsLines([]);
    setShowDetails(!showDetails);
    const data = await fetchStockDocDetails(id);
    setDocumentsLines(data);
    switch (prefix) {
      case "BE":
        setTitle("Bon d'entrée");
        break;
      case "BS":
        setTitle("Bon de sortie");
        break;
      case "INV":
        setTitle("Inventaire");
        break;
      case "OT":
        setTitle("Ordre de transfert");
        break;
      case "BT":
        setTitle("Bon de transfert");
        break;
      default:
        setTitle("Document");
    }
  };

  const getTextColor = (prefix: string) => {
    switch (prefix) {
      case "BE":
        return "text-green-500";
      case "BS":
        return "text-yellow-500";
      case "INV":
        return "text-blue-400";
      case "OT":
        return "text-orange-500";
      case "BT":
        return "text-orange-900";

      default:
        return "text-gray-500";
    }
  };

  const getColor = (title: string) => {
    switch (title) {
      case "Bon d'entrée":
        return "bg-green-600";
      case "Inventaire":
        return "bg-blue-400";
      case "Bon de sortie":
        return "bg-orange-500";
      case "Ordre de transfert":
        return "bg-orange-500";
      case "Bon de transfert":
        return "bg-orange-900";

      default:
        return "bg-gray-500";
    }
  };

  const getLineColor = (title: string) => {
    switch (title) {
      case "Bon d'entrée":
        return "border-greenPerso";
      case "Inventaire":
        return "border-bluePerso";
      case "Bon de sortie":
        return "orangePerso";
      case "Ordre de transfert":
        return "orangePerso";

      default:
        return "greenPerso";
    }
  };

  return (
    <div className="w-9/10 overflow-hidden h-screen rounded-t-3xl pb-14 mt-1 flex flex-col bg-white">
      {showModal && <AddBEModal setShowModal={setShowModal} />}

      {showDetails ? (
        <div className="flex flex-col h-full gap-4 items-center">
          {/* Partie Détail */}
          <h2
            className={`${getColor(
              title
            )} text-white text-center text-lg tracking-widest bold border-b-2 p-2 flex flex-row items-center justify-center w-full`}
          >
            {title}
          </h2>
          <div className="flex flex-col gap-1 h-screen text-grayblue">
          <table cellPadding={2} className="table-fixed w-full">
  <thead>
    <tr>
      <th className="w-1/2">Article</th>
      <th className="w-1/2">Quantité</th>
    </tr>
  </thead>
  <tbody style={{ maxHeight: "500px", overflowY: "auto" }}>
    {documentsLines.map((line, index) => (
      <tr key={index}>
        <td className={`text-xs p-4 border-b ${getLineColor(title)}`}>
          {line.descriptionclear}
        </td>
        <td className="text-center bold">{line.quantity}</td>
      </tr>
    ))}
  </tbody>
</table>

          </div>
          <p onClick={handleClick} className="border-2 border-red-400">
            swap
          </p>
        </div>
      ) : (
        <div className="h-screen border-4  overflow-hidden ">
  <table className="w-full">
    {/* ------------------------------------ Partie Liste ------------------------------------ */}
    <thead>
      <tr className={`border-b-2 text-secondary border-secondary`}>
        <th className="p-2">Type</th>
        <th>Numéro de document</th>
        <th>Date du document</th>
        <th>Articles</th>
      </tr>
    </thead>
  </table>
  <div style={{ maxHeight: 'calc(92vh - 50px)', overflowY: 'auto' }} className="mb-6">
    <table className="w-full">
      <tbody className="">
      {stockDocs && stockDocs.length > 0 ? (
  <div style={{ maxHeight: 'calc(92vh - 50px)', overflowY: 'auto' }} className="mb-6">
    <table className="w-full">
      <tbody className="">
        {stockDocs.map((doc) => (
          <tr key={doc.id} className="border-b-1 border-secondary flex flex-row justify-between p-1">
            <td className={`${getTextColor(doc.numberprefix)} p-2`}>
              {doc.numberprefix}
            </td>
            {doc.numbersuffix ? (
              <td className="text-xs sm:text-base">{doc.numbersuffix}</td>
            ) : (
              <td className="text-xs sm:text-base">N/A</td>
            )}
            <td className="text-xs sm:text-base">
              {new Date(doc.documentdate).toLocaleDateString()}
            </td>
            <td
              className="text-primary text-xs sm:text-base"
              onClick={() => handleDetails(doc.id, doc.numberprefix)}
            >
              voir
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <tr>
  <td colSpan={4}>Aucune donnée à afficher</td>
</tr>

)}


      </tbody>
    </table>
  </div>
</div>

      )}
      <StockNavbar setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
}

export default StockDocPage;

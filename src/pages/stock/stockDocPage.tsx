import { useEffect, useState } from "react";
import { StockDocument, StockDocumentLine } from "../../types/stockDoc";
import { fetchStockDoc, fetchStockDocDetails } from "../../function/function";

import AddBEModal from "../../component/modals/stock/addStockDocModal";
import StockNavbar from "../../component/nav/stockNavBar";

function StockDocPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [stockDocs, setStockDocs] = useState<StockDocument[]>([]);
  const [documentsLines, setDocumentsLines] = useState<StockDocumentLine[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchStockDoc();
        setStockDocs(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [title, setTitle] = useState("");

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
          { /* ------------------------------------------------ Partie Detail ------------------------------------------ */}
          <h2 className={`${getColor(title)} text-white text-center text-lg tracking-widest bold border-b-2 p-2 flex flex-row items-center justify-center w-full`}>
            {title}
          </h2>
          <div className="flex flex-col gap-1 h-screen overflow-auto text-grayblue ">
            <table cellPadding={2}>
              <thead className="">
                  <tr className="bold">
                    <th>Article</th>
                    <th>Quantité</th>
                  </tr>
              </thead>
              <tbody className="w-full h-full">
                {documentsLines.map((line, index) => (
                  <tr key={index} className="">
                    <td className={`text-xs border-b-1 p-4 ${getLineColor(title)}`}>
                      {line.descriptionclear}
                    </td>

                      <td className="bold text-center">{line.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p onClick={handleClick} className="border-2 border-red-400 ">
            swap
          </p>
        </div>
      ) : (
        <table>
          { /* ------------------------------------------------ Partie Liste ------------------------------------------ */}
          <thead>
            <tr className={`border-b-2  text-secondary border-secondary `}>
              <th className="p-2">Type</th>
              <th>Numéro de document</th>
              <th>Date du document</th>
              <th>Articles</th>
            </tr>
          </thead>
          <tbody>
            {stockDocs.map((doc) => (
              <tr key={doc.id} className="text-center  border-b-1 border-secondary p-1">
                <td className={`${getTextColor(doc.numberprefix)} p-2`}>
                  {doc.numberprefix}
                </td>
                {doc.numbersuffix? ( <td className="text-xs sm:text-base">{doc.numbersuffix}</td>): ( <td className="text-xs sm:text-base">N/A</td>)}
                <td className="text-xs sm:text-base">{new Date(doc.documentdate).toLocaleDateString()}</td>
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
      )}
      <StockNavbar setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
}

export default StockDocPage;

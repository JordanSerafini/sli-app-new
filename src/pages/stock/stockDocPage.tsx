import { useEffect, useState } from "react";
import { StockDocument, StockDocumentLine } from "../../types/stockDoc";
import { fetchStockDoc, fetchStockDocDetails } from "../../function/function";

import AddBEModal from "../../component/modals/stock/addBEModal";
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
      case "INV":
        setTitle("Inventaire");
        break;
      case "BS":
        setTitle("Bon de sortie");
        break;
      case "OT":
        setTitle("Ordre de transfert");
        break;
      default:
        setTitle("Document");
    }
  };

  const getTextColor = (prefix: string) => {
    switch (prefix) {
      case "BE":
        return "text-green-500";
      case "INV":
        return "text-blue-400";
      case "BS":
        return "text-yellow-500";
      case "OT":
        return "text-orange-500";

      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-screen overflow-auto h-screen pb-14">
      {showModal && <AddBEModal setShowModal={setShowModal} />}

      {showDetails ? (
        <div className="flex flex-col h-full gap-4 ">
          <h2 className="text-white text-center text-lg tracking-widest bold border-b-2 bg-secondary p-4 flex flex-row items-center justify-center">
            {title}
          </h2>
          <div className="flex flex-col gap-1 w-screen h-screen overflow-auto">
            <table cellPadding={2}>
              <thead className="">
                {title != "Inventaire" && (
                  <tr>
                    <th>Article</th>
                    <th>Quantité</th>
                  </tr>
                )}
              </thead>
              <tbody className="">
                {documentsLines.map((line) => (
                  <tr key={line.id}>
                    <td className="text-xs border-b-1 p-2 border-secondary w-8/10">
                      {line.descriptionclear}
                    </td>

                    {parseInt(line.quantity) != 0 && (
                      <td className="bold text-center">{line.quantity}</td>
                    )}
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
          <thead>
            <tr className="border-b-2 border-secondary text-secondary">
              <th>Type</th>
              <th>Numéro de document</th>
              <th>Date du document</th>
              <th>Articles</th>
            </tr>
          </thead>
          <tbody>
            {stockDocs.map((doc) => (
              <tr key={doc.id}>
                <td className={`${getTextColor(doc.numberprefix)}`}>
                  {doc.numberprefix}
                </td>
                <td>{doc.numbersuffix}</td>
                <td>{new Date(doc.documentdate).toLocaleDateString()}</td>
                <td
                  className="text-primary"
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

import { useEffect, useState } from "react";
import { StockDocument, StockDocumentLine } from "../../types/stockDoc";
import { fetchStockDoc, fetchStockDocDetails } from "../../function/function";

function StockDocPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [stockDocs, setStockDocs] = useState<StockDocument[]>([]);
  const [documentsLines, setDocumentsLines] = useState<StockDocumentLine[]>([]);
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

  const handleClick = async () => {
    setShowDetails(!showDetails);
  };

  const handleDetails = async (id: string) => {
    setDocumentsLines([]);
    setShowDetails(!showDetails);
    const data = await fetchStockDocDetails(id);
    setDocumentsLines(data);
  };


  return (
    <div className="w-screen overflow-auto h-screen">
      {showDetails ? (
        <>
          <p onClick={handleClick}>test</p>
          <div className="flex flex-col gap-1">
          {documentsLines.map((line) => (
            <div key={line.id} className="p-2">
                <div className="flex flex-row justify-between">
                <p className="text-xs border-b-2 border-secondary max-w-8/10">{line.descriptionclear}</p>
                <p>quant</p>
                </div>
          </div>
          ))}
          </div>
        </>
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
                <td>{doc.numberprefix}</td>
                <td>{doc.numbersuffix}</td>
                <td>{new Date(doc.documentdate).toLocaleDateString()}</td>
                <td
                  className="text-primary"
                  onClick={() => handleDetails(doc.id)}
                >
                  voir
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StockDocPage;

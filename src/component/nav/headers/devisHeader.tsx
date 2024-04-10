import Icon from "../../svg/Icon";

function DevisHeader() {
  return (
    <div className="fixed top-0 left-0 w-screen flex items-center justify-between h-16 bg-white z-10 p-2 shadow-md">
        < Icon type="Close" theme="black" className="w-6 h-6" />
        Ajout devis
        < Icon type="Menu" theme="black" className="w-6 h-6" />
    </div>
  );
}

export default DevisHeader;

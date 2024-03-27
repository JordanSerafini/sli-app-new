import { useNavigate } from "react-router-dom";

import DecoBtn from "../component/button/decoBtn";
import BottomNavbar from "../component/nav/bottomNavBar";

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user as string);

  const goToPage = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-start mb-16 gap-4">
      {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}
      <div className="h-1/10 w-7/10 flex flex-row justify-center items-center bg-white border-2 border-secondary mt-2 rounded-lg">
        <h2>
          Bienvenue {userData?.nom} {userData?.prenom}
        </h2>
      </div>

      {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}
      <div className="flex flex-row flex-wrap h-8/10 w-full justify-evenly py-4 gap-2 overflow-auto bg-white">
        <div className="sm:w-4.5/10 w-9/10 bg-red-500 h-4/10 flex flex-row flex-wrap items-center justify-center">
          <div
            className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center libre-baskerville-regular text-white tracking-widest cursor-pointer"
            onClick={() => goToPage("item")}
          >
            Page article
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            Créer article
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            3
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            4
          </div>
        </div>
        {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}

        <div className="sm:w-4.5/10 w-9/10 bg-blue-500 h-4/10 flex flex-row flex-wrap items-center justify-center">
          <div
            className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center libre-baskerville-regular text-white tracking-widest cursor-pointer"
            onClick={() => goToPage("customer")}
          >
            Page Client
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            Créer article
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            3
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            4
          </div>
        </div>
        {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}

        <div className="sm:w-4.5/10 w-9/10 bg-green-500 h-4/10 flex flex-row flex-wrap items-center justify-center">
          <div
            className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center libre-baskerville-regular text-white tracking-widest cursor-pointer"
            onClick={() => goToPage("item")}
          >
            Page article
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            Créer article
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            3
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            4
          </div>
        </div>
        {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}

        <div className="sm:w-4.5/10 w-9/10 bg-yellow-500 h-4/10 flex flex-row flex-wrap items-center justify-center">
          <div
            className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center libre-baskerville-regular text-white tracking-widest cursor-pointer"
            onClick={() => goToPage("item")}
          >
            Page article
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            Créer article
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            3
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            4
          </div>
        </div>
        {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}
      </div>

      {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}

      <div className="flex flex-col">
        <DecoBtn />
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Home;

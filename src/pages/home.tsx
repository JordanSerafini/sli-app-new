import { useNavigate } from "react-router-dom";

import DecoBtn from "../component/button/decoBtn";

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user as string);

  const goToPage = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-start gap-4">
      {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}
      <div className="h-1/10 w-7/10 flex flex-row justify-center items-center bg-white border-2 border-secondary mt-2 rounded-lg">
        <h2>
          Bienvenue {userData?.nom} {userData?.prenom}
        </h2>
      </div>

      <div className="flex flex-row flex-wrap h-8/10 w-9.5/10 rounded-2xl justify-evenly items-center py-4 gap-2 overflow-auto bg-white ">
      {/*---------------------------------------------------------- Articles -----------------------------------------------------------------------*/}
        <div className="sm:w-4.5/10 w-9/10 bg-red-500 h-4/10 flex flex-row flex-wrap items-center justify-center libre-baskerville-regular text-white tracking-widest cursor-pointer
">
          <div
            className="hover:scale-130 hover:border-0 w-5/10 h-5/10 border-1 border-white flex items-center justify-center  "
            onClick={() => goToPage("item")}
          >
            Page article
          </div>
          <div className="hover:scale-130 hover:border-0 w-5/10 h-5/10 border-1 border-white flex items-center justify-center ">
            Créer article
          </div>
          <div className="hover:scale-130 hover:border-0 w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            3
          </div>
          <div className="hover:scale-130 hover:border-0 w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            4
          </div>
        </div>
        {/*---------------------------------------------------------Clients ----------------------------------------------------------------------------*/}

        <div className="sm:w-4.5/10 w-9/10 bg-blue-600 h-4/10 flex flex-row flex-wrap items-center justify-center libre-baskerville-regular text-white tracking-widest cursor-pointer">
          <div
            className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center "
            onClick={() => goToPage("customer")}
          >
            Page Client
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            2
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            3
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            4
          </div>
        </div>
        {/*------------------------------------------------------ Stock ---------------------------------------------------------------------------*/}

        <div className="sm:w-4.5/10 w-9/10 bg-green-600 h-4/10 flex flex-row flex-wrap items-center justify-center libre-baskerville-regular text-white tracking-widest cursor-pointer
">
          <div
            className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center "
            onClick={() => goToPage("stock")}
          >
            Page Stock
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            2
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            3
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            4
          </div>
        </div>
        {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}

        <div className="sm:w-4.5/10 w-9/10 bg-yellow-600 h-4/10 flex flex-row flex-wrap items-center justify-center libre-baskerville-regular text-white tracking-widest cursor-pointer
">
          <div
            className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center "
            onClick={() => goToPage("item")}
          >
            Favoris
          </div>
          <div className="w-5/10 h-5/10 border-1 border-white flex items-center justify-center">
            2
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

      <div className="flex flex-col ">
        <DecoBtn css="fixed top-5  z-50 bg-white rounded-full border-1 border-secondary flex flex flex-row justify-center sm:right-5 right-1 sm:h-11 sm:w-11 w-10 h-10" />
      </div>

    </div>
  );
}

export default Home;

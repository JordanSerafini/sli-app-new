//import { useNavigate } from "react-router-dom";

import BottomNavbar from "../component/nav/bottomNavBar";
//import Icon from "../component/svg/Icon";

function Home() {
 // const navigate = useNavigate();
 // const user = localStorage.getItem("user");
  //const userData = JSON.parse(user as string);

 // const goToPage = (path: string) => {
 //   navigate(path);
//  };

  return (
    <div className="w-screen h-screen bg-">
      <BottomNavbar />
    </div>
  );
}

export default Home;

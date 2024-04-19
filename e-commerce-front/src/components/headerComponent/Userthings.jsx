import Panier from "../PanierComponent/Panier";
import GererCompte from "./GererCompte";
import NotificationComponent from "../notification/NotificationCOmponent";
function Userthings() {
    return (
      <>
        <div className="w-[100%] justify-between flex items-center flex-row px-6">

          <div className="px-2">
            <NotificationComponent/>
          </div>
          
          <div className="px-2">
            <Panier />
          </div>
          
          <div className="">
            <GererCompte />
          </div>

        </div>
      </>
    );
}
export default Userthings
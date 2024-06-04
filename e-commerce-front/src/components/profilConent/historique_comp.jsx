import React from "react";
import Achat_detail from "./achat_detail";
import Historique_section from "./historique section";
import { achat_histo, achat_detail } from "../../Hooks/AchatApi";
import { useState, useEffect, useContext } from "react";
import { HistoriqueContext } from "../../Hooks/HistoriqueContext";
function Historique_comp() {
  const [selectedDetails, setSelecteDetails] = useState([]);
  const { historiques, setHistoriques } = useContext(HistoriqueContext)
  useEffect(() => {
    async function gethistorique() {
      const historesponse = await achat_histo();
      console.log(historesponse);
      if (historesponse.res) {
        console.log(historesponse.response);
        console.log("historiques non set", historesponse.response.data.results);
        setHistoriques(historesponse.response.data.results);
        console.log("historique", historiques);
      } else {
        console.log(historesponse.err);
      }
    }
    gethistorique();
  }, []);
  const getDetails = async(id) => {
    const historesponse = await achat_detail(id);
      console.log("liste product1", historesponse);
      if (historesponse.res) {
        console.log("liste product", historesponse.response.data.orders);
     
     
      } else {
        console.log(historesponse.err);
      }
    setSelecteDetails(historesponse.response.data.orders);
    console.log("detail",selectedDetails)
    
  };
 

  return (
    <div class="flex flex-row jutify justify-around">
      <div className="w-[100%]">
        <Historique_section
          historiques={historiques}
          onDetailsClick={getDetails}
          details={selectedDetails}
        />
      </div>

      <div className="w-[45%] ml-[10%] h-[100%] border-l-2 px-12 mt-10">
        <Achat_detail details={selectedDetails} />
      </div>
    </div>
  );
}

export default Historique_comp;

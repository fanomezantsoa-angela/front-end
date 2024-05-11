import React from 'react'
import Achat_detail from './achat_detail';
import Historique_section from './historique section';
import { achat_histo } from '../../Hooks/AchatApi';
import { useState, useEffect } from 'react';

function Historique_comp() {

    const [selectedOrders, setSelectedOrders] = useState([]);
  const [historique, setHistorique]= useState([])
  useEffect(() => {
      async function gethistorique (){
        const historesponse= await achat_histo()
     	console.log(historesponse)
     	if(historesponse.res){
       		console.log(historesponse.response)
			console.log("historiques non set",historesponse.response.data.results)
       		setHistorique(historesponse.response.data.results)
			console.log("historique", historique)
     	}
     	else{
       		console.log(historesponse.err)
     	}
  }
  gethistorique()
}, []);
const getDetails = (orders) => {
    setSelectedOrders(orders);
	console.log(orders)
  };

  return (
    <div class="flex flex-row jutify justify-around">
  
        <div className="w-[100%]">
        <Historique_section historiques={historique} onDetailsClick={getDetails}/>

        </div>
 
        <div className="w-[45%] ml-[10%] h-[100%] border-l-2 px-12 mt-10">
            <Achat_detail  orders={selectedOrders}/>

        </div>
		
    </div>
 	
  )
}

export default Historique_comp;
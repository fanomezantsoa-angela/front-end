import React from 'react'
import Achat_detail from './achat_detail';
import Historique_section from './historique section';
function Historique_comp() {
  return (
    <div class="flex flex-row jutify justify-around">

        <div className="w-[60%]">
        <Historique_section/>

        </div>

        <div className="w-[45%] ml-[10%] h-[100%] border-l-2 px-12 mt-10">
            <Achat_detail/>

        </div>
    </div>
  )
}

export default Historique_comp;
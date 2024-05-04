import React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function Form_payement() {
  return (
    <div class="mt-[-25%] ml-[5%]">
 <from>
 <p class='text-[15px] text-center  text-[black] font-extrabold mr-[65%]'>Comment voulez-vous regler le paimenet ?</p>
    <div className=" flex space-x-4  flex-row items-center gap-x-3    mt-[2%]" >
        
    
                  <div class="	w-[10%] rounded-[20px] pt-[1%] pb-[1%] border-solid border-[2px] flex border-[#0061A8] text-center ">
                  <input
                    id="push-Visa"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 ml-[5%]"
                  />
                  <label htmlFor="push-everything" className=" text-[15px]  text-[black] font-extrabold ml-[10%] mt-[-2%] ">
                   Visa
                  </label>
                  </div>
                  <div class="	w-[10%] rounded-[20px] pt-[1%] pb-[1%] border-solid border-[2px] flex border-[#0061A8]  ">
                  
                  <input
                    id="push masterCard"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 ml-[5%]"
                  />
                  <label htmlFor="push-email" className=" text-[15px]  text-[black] font-extrabold ml-[10%] mt-[-2%] ">
                    MasterCard
                  </label>
                  </div>
                  <div class="w-[10%]	 rounded-[20px] pt-[1%] pb-[1%] border-solid border-[2px] flex border-[#0061A8]  ">

                  <input
                    id="pus PayPal"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 ml-[5%]"
                  />
                  <label htmlFor="push-nothing" className=" text-[15px]  text-[black] font-extrabold ml-[10%] mt-[-2%] ">
                    PayPal
                  </label>
                  </div>

    </div>
   <div>
     <input type='text' placeholder='Nom et prenom' isRequired={true}></input>
   

     
    <input type='text' placeholder='Numero de carte' isRequired={true}></input>


    <p>veuillez remplir les information requise pour la livraison</p>    
    <div class="w-[40%] flex flex-row justify-around" >
 
   
    <Select placeholder="Ville " class="w-[50%]" >
  <Option>...</Option>
</Select>
<Select placeholder="Ville" >
  <Option>...</Option>
</Select>
<Select placeholder="Ville" >
  <Option>...</Option>
</Select>
    </div >
    
    </div>
   
 </from>



    </div>
  )
}

export default Form_payement
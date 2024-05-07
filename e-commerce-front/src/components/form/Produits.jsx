import { Inputhandler } from "../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { postProduct, type_product } from "../Hooks/API";
import { useState, useEffect } from "react";
import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
function Produits() {
    
    const [name, setName, namechange] = Inputhandler("");
    const [description, setDescription, descriptionchange] = Inputhandler("");
    const [price, setPrice, pricechange] = Inputhandler("");
    const [expiration_date, setExpiration_date, expirationchange] = Inputhandler("");
    const [type, setType, typechange] = Inputhandler("");
    const [typeOptions, setTypeOptions] = useState([]);
    
    const formData = {
        name: name,
        description: description,
        price: price,
        expiration_date: expiration_date,
        type: type

    }
    const resetform = () => {
        setExpiration_date('')
        setDescription('')
        setName('')
        setPrice('')
        setType('');
    }
    useEffect(() => {
      async function fetchTypeList() {
        try {
            const types = await type_product();
            
          setTypeOptions(types.results);
        } catch (error) {
          console.error("Error fetching type list:", error);
        }
      }
      fetchTypeList();
    }, []);
    const submit = async (e) => {
        e.preventDefault()
        try{
          const responseData = await postProduct(formData);
        // Handle response data as needed
            console.log('Response:', responseData);
            
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
        }
        resetform()
    }
    return (
      <div className="Produits-container">
        <Formulaire classname="Produits-form">
          <Forminput
            typeinput="text"
            nomlabel="Name"
            value={name}
            inputchange={namechange}
          />
          <Forminput
            typeinput="text"
            nomlabel="description"
            value={description}
            inputchange={descriptionchange}
          />
          <Forminput
            typeinput="number"
            nomlabel="Price"
            value={price}
            inputchange={pricechange}
          />
          <Forminput
            typeinput="date"
            nomlabel="Date d'éxpiration"
            value={expiration_date}
            inputchange={expirationchange}
          />
      
          <select value={type} onChange={typechange}>
            {typeOptions.map((typeOption, index) => (
              <option key={index} value={typeOption.id}>
                {typeOption.designation}
              </option>
            ))}
          </select> <br />
          <Button
            action="Ajouter Produit"
            buttonhandle={submit}
            classname="ajout-produit"
          />
        </Formulaire>
      </div>
    );
}
export default Produits;